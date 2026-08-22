import { headers } from "next/headers";

import AdminGuard from "../AdminGuard";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import { requireAdminPage } from "../adminAuth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  // صفحه لاگین ادمین بدون چک ادمین باز شود
  if (pathname === "/admin/login") {
    return children;
  }

  await requireAdminPage();

  return (
    <AdminGuard>
      <div
        dir="rtl"
        className="
          min-h-screen
          flex
          bg-background
        "
      >
        <AdminSidebar />

        <div
          className="
            flex-1
            flex
            flex-col
          "
        >
          <AdminHeader />

          <main
            className="
              flex-1
              p-4
              md:p-6
            "
          >
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
