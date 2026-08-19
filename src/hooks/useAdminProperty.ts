import { useQuery } from "@tanstack/react-query";
import { getAdminProperty } from "../services/adminPropertyService";
import type { AdminPropertyDetail } from "../services/adminPropertyService";

export function useAdminProperty(id?: string) {
  return useQuery<AdminPropertyDetail>({
    queryKey: ["admin-property", id],

    queryFn: async () => {
      if (!id) {
        throw new Error("شناسه ملک ارسال نشده است");
      }

      return getAdminProperty(id);
    },

    enabled: Boolean(id),

    retry: false,
  });
}
