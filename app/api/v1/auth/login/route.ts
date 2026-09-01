import { z } from "zod";
import { errorResponse, json, readJson } from "@backend/api/http";
import { setSessionCookie } from "@backend/auth/session";
import { store } from "@backend/db/store";
import { signInWithPassword } from "@backend/firebase/auth-rest";
import { isFirebaseClientConfigured } from "@backend/firebase/config";
import { TimeoutError, withTimeout } from "@backend/utils/timeout";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await readJson(request));
    let firebaseOk = false;
    let firebaseId: string | undefined;

    if (isFirebaseClientConfigured()) {
      try {
        const signedIn = await withTimeout(signInWithPassword(body.email, body.password), 2500);
        firebaseOk = true;
        firebaseId = typeof signedIn.localId === "string" ? signedIn.localId : undefined;
      } catch (error) {
        if (!(error instanceof TimeoutError)) throw error;
      }
    }

    let user = await store.findUserByEmail(body.email);
    if (!user && firebaseOk) {
      user = await store.createUser({
        id: firebaseId,
        email: body.email,
        password: body.password,
        full_name: body.email.split("@")[0] || body.email,
        role: "customer",
      });
    }
    if (!user) {
      return json({ error: "Invalid email or password. · البريد أو كلمة المرور غير صحيحة." }, 401);
    }
    if (!firebaseOk && user.password_hash !== body.password) {
      return json({ error: "Invalid email or password. · البريد أو كلمة المرور غير صحيحة." }, 401);
    }

    await setSessionCookie(user.id);
    return json({
      user: store.publicUser(user),
      session: {
        access_token: user.id,
        expires_at: new Date(Date.now() + 7 * 86400000).toISOString(),
      },
    });
  } catch (error) {
    return errorResponse(error, 400);
  }
}

