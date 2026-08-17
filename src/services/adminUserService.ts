import { apiRequest } from "@/app/lib/apiRequest";

// ==========================================
// DELETE USER
// ==========================================

export async function deleteAdminUser(userId: string) {
  return apiRequest(`/api/admin/users/${userId}`, {
    method: "DELETE",
  });
}

// ==========================================
// UPDATE USER
// ==========================================

export async function updateAdminUser(
  userId: string,
  data: {
    name?: string;
    lastName?: string;
    phoneNumber?: string;
    role?: "user" | "admin";
  },
) {
  return apiRequest(`/api/admin/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
