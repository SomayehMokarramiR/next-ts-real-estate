"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { login, register, getMe, logout } from "@/services/auth";

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

    onSuccess: (data) => {
      // ذخیره اطلاعات کاربر در cache
      queryClient.setQueryData(["me"], {
        success: true,
        user: data.user,
      });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: register,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      // حذف اطلاعات کاربر
      queryClient.removeQueries({
        queryKey: ["me"],
      });
    },
  });
}
