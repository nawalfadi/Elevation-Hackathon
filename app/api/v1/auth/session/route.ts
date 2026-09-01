import { errorResponse, json } from "@backend/api/http";
import { getSession } from "@backend/auth/session";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();
    return json(session ?? { user: null, session: null });
  } catch (error) {
    return errorResponse(error);
  }
}
