import { useMutation, useQueryClient } from "@tanstack/react-query";

// ===============================
// TYPES
// ===============================

export interface CreateNotificationPayload {
  userId: string;

  title: string;

  message: string;

  // اعلان‌های دستی پنل ادمین
  // رزرو از سیستم رزرو ساخته می‌شود
  type: "message" | "offer" | "system";
}

interface CreateNotificationResponse {
  success: boolean;

  message?: string;

  notification?: unknown;
}

// ===============================
// CREATE API
// ===============================

async function createAdminNotification(payload: CreateNotificationPayload) {
  const response = await fetch("/api/admin/notifications", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: JSON.stringify(payload),
  });

  const data: CreateNotificationResponse = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "خطا در ایجاد اعلان");
  }

  return data.notification;
}

// ===============================
// HOOK
// ===============================

export function useAdminCreateNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdminNotification,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-notifications"],
      });
    },
  });
}
