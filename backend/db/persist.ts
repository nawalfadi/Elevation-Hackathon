import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { collectionNames, collections } from "@backend/firebase/collections";
import { isFirebaseConfigured } from "@backend/firebase/config";
import { getAdminFirestore } from "@backend/firebase/admin";
import { createSeed } from "./seed";
import type { DatabaseTables } from "@backend/types";
import { TimeoutError, withTimeout } from "@backend/utils/timeout";

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_PATH = path.join(DATA_DIR, "store.json");
const FIRESTORE_BUDGET_MS = 2500;

export function usesFirebase() {
  return isFirebaseConfigured();
}

function fileLoad(): DatabaseTables | null {
  if (!existsSync(STORE_PATH)) return null;
  return JSON.parse(readFileSync(STORE_PATH, "utf8")) as DatabaseTables;
}

function fileSave(db: DatabaseTables) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(STORE_PATH, JSON.stringify(db), "utf8");
}

async function firestoreLoad(): Promise<DatabaseTables | null> {
  const firestore = getAdminFirestore();
  if (!firestore) return null;

  const tables = {} as DatabaseTables;
  await Promise.all(
    (Object.keys(collections) as Array<keyof DatabaseTables>).map(async (name) => {
      const snap = await firestore.collection(collections[name]).get();
      (tables as unknown as Record<string, unknown[]>)[name] = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }),
  );

  if (!tables.application_types?.length) return null;
  return tables;
}

async function firestoreSave(db: DatabaseTables) {
  const firestore = getAdminFirestore();
  if (!firestore) return;

  const rows = (Object.keys(collections) as Array<keyof DatabaseTables>).flatMap((name) =>
    db[name].map((row) => ({ name, row })),
  );

  for (let i = 0; i < rows.length; i += 400) {
    const batch = firestore.batch();
    for (const item of rows.slice(i, i + 400)) {
      const id = "id" in item.row ? String(item.row.id) : undefined;
      if (!id) continue;
      batch.set(firestore.collection(collections[item.name]).doc(id), item.row);
    }
    await batch.commit();
  }
}

export async function loadDatabase(): Promise<DatabaseTables> {
  const local = fileLoad();
  if (local) return local;

  if (usesFirebase()) {
    try {
      const remote = await withTimeout(firestoreLoad(), FIRESTORE_BUDGET_MS);
      if (remote) {
        fileSave(remote);
        return remote;
      }
    } catch (error) {
      if (!(error instanceof TimeoutError)) {
        console.error("Firestore load failed", error);
      }
    }
  }

  const seed = createSeed();
  fileSave(seed);
  if (usesFirebase()) {
    const snapshot = structuredClone(seed);
    void enqueueFirestore(snapshot);
  }
  return seed;
}

let pendingFirestore: DatabaseTables | null = null;
let flushingFirestore = false;

async function enqueueFirestore(db: DatabaseTables) {
  pendingFirestore = db;
  if (flushingFirestore) return;
  flushingFirestore = true;
  while (pendingFirestore) {
    const snapshot = pendingFirestore;
    pendingFirestore = null;
    try {
      await firestoreSave(snapshot);
    } catch (error) {
      console.error("Firestore persist failed", error);
    }
  }
  flushingFirestore = false;
}

export async function saveDatabase(db: DatabaseTables) {
  fileSave(db);
  if (!usesFirebase()) return;
  void enqueueFirestore(structuredClone(db));
}

export { collectionNames };
