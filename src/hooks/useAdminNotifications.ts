import { useQuery } from "@tanstack/react-query";

// ===============================
// TYPES
// ===============================

export interface AdminNotification {
  _id: string;

  userId: {
    _id: string;
    name: string;
    lastName: string;
    phoneNumber: string;
  } | null;

  title: string;

  message: string;

  type: "reservation" | "message" | "offer" | "system";

  isRead: boolean;

  createdAt: string;

  updatedAt: string;
}

interface NotificationsResponse {
  success: boolean;

  notifications: AdminNotification[];
}

// ===============================
// FETCH
// ===============================

async function getAdminNotifications(): Promise<AdminNotification[]> {
  const res = await fetch("/api/admin/notifications", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const data: NotificationsResponse = await res.json();

  if (!res.ok || !data.success) {
    throw new Error("خطا در دریافت اعلان‌ها");
  }

  return data.notifications;
}

// ===============================
// HOOK
// ===============================

export function useAdminNotifications() {
  return useQuery({
    queryKey: ["admin-notifications"],

    queryFn: getAdminNotifications,

    staleTime: 1000 * 60,

    refetchOnWindowFocus: false,
  });
}
