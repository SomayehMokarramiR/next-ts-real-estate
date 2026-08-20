import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateNotificationPayload {
  id: string;
  isRead: boolean;
}

async function updateNotification({ id, isRead }: UpdateNotificationPayload) {
  const res = await fetch(`/api/admin/notifications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      isRead,
    }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "خطا در تغییر وضعیت اعلان");
  }

  return data.notification;
}

export function useAdminUpdateNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotification,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-notifications"],
      });
    },
  });
}
