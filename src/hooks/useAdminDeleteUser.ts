import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteAdminUser } from "@/services/adminUserService";

export function useAdminDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteAdminUser(userId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "admin-users",
      });
    },
  });
}
