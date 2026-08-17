"use client";

import { useQuery } from "@tanstack/react-query";

export interface AdminStats {
  usersCount: number;
  propertiesCount: number;
  reservationsCount: number;
  revenue: number;
}

export interface AdminStatsResponse {
  success: boolean;
  stats: AdminStats;
}

async function getAdminStats(): Promise<AdminStatsResponse> {
  const res = await fetch("/api/admin/stats", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "خطا در دریافت آمار پنل مدیریت");
  }

  return data;
}

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,

    retry: false,

    staleTime: 1000 * 60,

    refetchOnWindowFocus: false,
  });
}
