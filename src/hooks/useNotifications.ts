"use client";

import { useQuery } from "@tanstack/react-query";

export interface Notification {
  _id: string;

  title: string;

  message: string;

  type: "reservation" | "message" | "offer" | "system";

  isRead: boolean;

  createdAt: string;
}

export interface NotificationsResponse {
  success: boolean;

  notifications: Notification[];

  unreadCount: number;
}

async function getNotifications(): Promise<NotificationsResponse> {
  const res = await fetch("/api/notifications", {
    method: "GET",

    credentials: "include",

    cache: "no-store",

    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "خطا در دریافت اعلان‌ها");
  }

  return data;
}

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],

    queryFn: getNotifications,

    // اعلان باید همیشه تازه باشد
    staleTime: 0,

    // وقتی صفحه فعال شد دوباره چک کند
    refetchOnWindowFocus: true,

    // هر 30 ثانیه چک کند
    refetchInterval: 30000,
  });
}
