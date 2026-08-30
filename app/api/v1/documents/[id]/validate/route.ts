import { errorResponse, json } from "@backend/api/http";
import { requireUser } from "@backend/auth/session";
import { store } from "@backend/db/store";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireUser();
    const { id } = await params;
    await store.markDocumentPending(id);
    const result = await store.finalizeValidation(id);
    return json({
      document: result.document,
      status: result.document.validation_status,
      issues: result.issues,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
