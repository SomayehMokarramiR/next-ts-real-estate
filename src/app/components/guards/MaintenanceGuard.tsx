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

        // خود صفحه تعمیر آزاد است
        if (pathname === "/maintenance") {
          setChecking(false);
          return;
        }

        // دریافت تنظیمات
        const settingsRes = await fetch("/api/admin/settings", {
          cache: "no-store",
        });

        const settingsData = await settingsRes.json();

        const maintenance =
          settingsData?.settings?.system?.maintenanceMode ?? false;

        if (!maintenance) {
          setChecking(false);
          return;
        }

        // اگر ادمین است باید اجازه بدهیم
        if (pathname.startsWith("/admin")) {
          const meRes = await fetch("/api/auth/me", {
            cache: "no-store",
          });

          const meData = await meRes.json();

          const isAdmin = meData?.success && meData?.user?.role === "admin";

          if (isAdmin) {
            setChecking(false);
            return;
          }

          // ادمین نیست یا لاگین نیست
          router.replace("/login");
          return;
        }

        // همه صفحات دیگر
        router.replace("/maintenance");
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
