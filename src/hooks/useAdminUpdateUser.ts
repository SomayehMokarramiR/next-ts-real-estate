import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateAdminUser } from "@/services/adminUserService";

type UpdateUserPayload = {
  id: string;

  data: {
    name?: string;

    lastName?: string;

    phoneNumber?: string;

    role?: "user" | "admin";
  };
};

export function useAdminUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateUserPayload) => updateAdminUser(id, data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "admin-users",
      });
    },
  });
}
