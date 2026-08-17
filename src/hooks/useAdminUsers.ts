import { useQuery } from "@tanstack/react-query";

export type AdminUser = {
  _id: string;

  name: string;

  lastName?: string;

  email: string;

  phoneNumber?: string;

  role: "user" | "admin";

  createdAt: string;

  updatedAt: string;

  // تعداد رزروهای کاربر
  reservationsCount?: number;
};

type AdminUsersResponse = {
  success: boolean;

  users: AdminUser[];

  total: number;

  totalPages: number;

  currentPage: number;

  limit: number;
};

type Params = {
  page?: number;

  limit?: number;

  search?: string;
};

async function fetchAdminUsers(params: Params): Promise<AdminUsersResponse> {
  const query = new URLSearchParams();

  if (params.page) {
    query.append("page", String(params.page));
  }

  if (params.limit) {
    query.append("limit", String(params.limit));
  }

  if (params.search) {
    query.append("search", params.search);
  }

  const res = await fetch(`/api/admin/users?${query.toString()}`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "خطا در دریافت کاربران");
  }

  return data;
}

export function useAdminUsers(params: Params = {}) {
  return useQuery({
    queryKey: ["admin-users", params],

    queryFn: () => fetchAdminUsers(params),
  });
}
