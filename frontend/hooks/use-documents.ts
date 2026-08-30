"use client";

import { api } from "@frontend/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUploadDocument(applicationId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ documentTypeId, file }: { documentTypeId: string; file: File }) =>
      api.uploadDocument(applicationId, documentTypeId, file),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["applications", applicationId] });
      void queryClient.invalidateQueries({ queryKey: ["checklist", applicationId] });
    },
  });
}

export function useValidateDocument(applicationId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (documentId: string) => api.validateDocument(documentId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["applications", applicationId] });
      void queryClient.invalidateQueries({ queryKey: ["checklist", applicationId] });
    },
  });
}
