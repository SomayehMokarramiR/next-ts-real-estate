import { useMutation, useQueryClient } from "@tanstack/react-query";

// ===============================
// DELETE API
// ===============================

async function deleteAdminNotification(id: string) {
  const response = await fetch(`/api/admin/notifications/${id}`, {
    method: "DELETE",

    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "خطا در حذف اعلان");
  }

  return data;
}

// ===============================
// HOOK
// ===============================

export function useAdminDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdminNotification,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-notifications"],
      });
    },
  });
}
