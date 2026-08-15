"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getSettings,
  updateSettings,
  type UserSettings,
} from "@/services/settingsService";

// =========================
// Get Settings
// =========================

export function useSettings() {
  return useQuery({
    queryKey: ["user-settings"],

    queryFn: getSettings,

    staleTime: 1000 * 60 * 5,
  });
}

// =========================
// Update Settings
// =========================

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: Partial<UserSettings>) => updateSettings(settings),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-settings"],
      });
    },
  });
}
