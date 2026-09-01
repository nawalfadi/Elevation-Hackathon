import { json } from "@backend/api/http";

export const dynamic = "force-dynamic";

export async function GET() {
  return json({ ok: true, runtime: "netlify" });
}
