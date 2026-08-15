"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

async function readNotification(id: string) {
  const res = await fetch(`/api/notifications/${id}`, {
    method: "PATCH",

    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "خطا در خواندن اعلان");
  }

  return data;
}

export function useReadNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readNotification,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
        exact: true,
      });

      // فوری دوباره دریافت کن
      queryClient.refetchQueries({
        queryKey: ["notifications"],
        exact: true,
      });
    },
  });
}
