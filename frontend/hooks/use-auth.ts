"use client";

import { api } from "@frontend/api/client";
import { markSecurityPromptPending } from "@frontend/components/ui/security-notice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: api.session,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: api.login,
    onSuccess: (session) => {
      markSecurityPromptPending();
      queryClient.setQueryData(["session"], session);
      router.push(session.user.role === "customer" ? "/app" : "/admin");
    },
  });
}

export function useSignup() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: api.signup,
    onSuccess: (session) => {
      markSecurityPromptPending();
      queryClient.setQueryData(["session"], session);
      router.push("/app");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: api.logout,
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
    },
  });
}
