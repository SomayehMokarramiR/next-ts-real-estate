"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MaintenanceGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkMaintenance() {
      try {
        console.log("MAINTENANCE GUARD PATH:", pathname);

        // صفحه تعمیر همیشه آزاد است
        if (pathname === "/maintenance") {
          setChecking(false);
          return;
        }

        // ورود ادمین همیشه آزاد است
        if (pathname === "/admin/login") {
          setChecking(false);
          return;
        }

        // مسیرهای پنل ادمین
        // امنیت توسط AdminLayout و requireAdminPage انجام می‌شود
        if (pathname.startsWith("/admin")) {
          setChecking(false);
          return;
        }

        // گرفتن وضعیت تعمیرات
        const response = await fetch("/api/system/status", {
          cache: "no-store",
        });

        const data = await response.json();

        const maintenance = data?.maintenanceMode ?? false;

        if (maintenance) {
          router.replace("/maintenance");
          return;
        }
      } catch (error) {
        console.error("Maintenance check error:", error);
      } finally {
        setChecking(false);
      }
    }

    checkMaintenance();
  }, [pathname, router]);

  if (checking) {
    return null;
  }

  return children;
}
