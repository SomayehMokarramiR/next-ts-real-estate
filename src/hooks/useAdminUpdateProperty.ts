"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateAdminProperty } from "@/services/adminPropertyService";
import type { UpdateAdminPropertyPayload } from "@/services/adminPropertyService";

export function useAdminUpdateProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateAdminPropertyPayload;
    }) => {
      console.log("UPDATE ADMIN PROPERTY PAYLOAD:", {
        id,
        data,
      });

      return updateAdminProperty(id, data);
    },

    onSuccess: (updatedProperty, variables) => {
      // =========================
      // UPDATE PROPERTY DETAIL CACHE
      // =========================

      queryClient.setQueryData(
        ["admin-property", variables.id],
        updatedProperty,
      );

      // =========================
      // REFRESH ADMIN PROPERTIES LIST
      // =========================

      queryClient.invalidateQueries({
        queryKey: ["admin-properties"],
      });
    },

    onError: (error) => {
      console.error(
        "UPDATE ADMIN PROPERTY ERROR:",
        error instanceof Error ? error.message : error,
      );
    },
  });
}
