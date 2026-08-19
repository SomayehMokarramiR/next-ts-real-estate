"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteAdminProperty } from "@/services/adminPropertyService";

export function useAdminDeleteProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      console.log("DELETE ADMIN PROPERTY:", id);

      return deleteAdminProperty(id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-properties"],
      });
    },

    onError: (error) => {
      console.error("DELETE ADMIN PROPERTY ERROR:", error);
    },
  });
}
