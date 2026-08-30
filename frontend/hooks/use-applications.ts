"use client";

import { api } from "@frontend/api/client";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UpsertAnswerInput } from "@backend/types";
import { useEffect, useState } from "react";

export function useApplicationTypes() {
  return useQuery({ queryKey: ["application-types"], queryFn: api.applicationTypes });
}

export function useStatuses() {
  return useQuery({ queryKey: ["statuses"], queryFn: api.statuses });
}

export function useQuestions(applicationTypeId?: string, answers?: Record<string, unknown>) {
  const [debouncedAnswers, setDebouncedAnswers] = useState(answers);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedAnswers(answers), 250);
    return () => window.clearTimeout(timer);
  }, [answers]);

  return useQuery({
    queryKey: ["questions", applicationTypeId, debouncedAnswers],
    queryFn: () => api.questions(applicationTypeId, debouncedAnswers),
    enabled: Boolean(applicationTypeId),
    placeholderData: keepPreviousData,
  });
}

export function useMyApplications() {
  return useQuery({ queryKey: ["applications", "mine"], queryFn: api.myApplications });
}

export function useApplication(id?: string) {
  return useQuery({
    queryKey: ["applications", id],
    queryFn: () => api.getApplication(id!),
    enabled: Boolean(id),
  });
}

export function useCreateApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createApplication,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}

export function useSaveAnswers(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (answers: UpsertAnswerInput[]) => api.saveAnswers(id, answers),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["applications", id] });
      void queryClient.invalidateQueries({ queryKey: ["checklist", id] });
    },
  });
}

export function useChecklist(id?: string) {
  return useQuery({
    queryKey: ["checklist", id],
    queryFn: () => api.checklist(id!),
    enabled: Boolean(id),
  });
}

export function useSubmitApplication(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.submitApplication(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}
