import { errorResponse, json } from "@backend/api/http";
import { store } from "@backend/db/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return json(await store.listStatuses());
  } catch (error) {
    return errorResponse(error);
  }
}
