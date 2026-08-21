"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getAdminSettings,
  updateAdminSettings,
  type UpdateAdminSettingsPayload,
} from "@/services/adminSettingsService";

export const ADMIN_SETTINGS_QUERY_KEY = ["admin-settings"] as const;

// =====================================
// GET SETTINGS
// =====================================

export function useAdminSettings() {
  return useQuery({
    queryKey: ADMIN_SETTINGS_QUERY_KEY,
    queryFn: getAdminSettings,
  });
}

// =====================================
// UPDATE SETTINGS
// =====================================

export function useUpdateAdminSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateAdminSettingsPayload) =>
      updateAdminSettings(payload),

    onSuccess: (data) => {
      queryClient.setQueryData(ADMIN_SETTINGS_QUERY_KEY, data);
    },
  });
}
