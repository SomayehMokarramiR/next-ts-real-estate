"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { login, register, getMe, logout, verifyEmail } from "@/services/auth";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: register,
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: verifyEmail,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["me"],
      });

      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}
