"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAdminProperty } from "@/services/adminPropertyService";
import type { CreateAdminPropertyPayload } from "@/services/adminPropertyService";

export function useAdminCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAdminPropertyPayload) => {
      console.log("CREATE ADMIN PROPERTY PAYLOAD:", data);

      return createAdminProperty(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-properties"],
      });
    },

    onError: (error) => {
      console.error("CREATE ADMIN PROPERTY ERROR:", error);
    },
  });
}
