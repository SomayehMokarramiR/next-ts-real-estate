import AdminGuard from "./AdminGuard";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
