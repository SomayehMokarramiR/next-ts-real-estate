"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { LogOut } from "lucide-react";

import Swal from "sweetalert2";

import { adminMenu } from "./AdminMenu";
import { useLogout } from "@/hooks/useAuth";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();

      await Swal.fire({
        icon: "success",
        title: "خروج موفق",
        text: "با موفقیت از حساب خارج شدید",
        confirmButtonText: "باشه",
      });

      router.replace("/login");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "خطا",
        text: "خروج از حساب انجام نشد",
        confirmButtonText: "باشه",
      });
    }
  };

  return (
    <aside
      className="
      w-64
      min-h-screen
      bg-white
      dark:bg-[#353535]
      border-l
      border-border
      p-5
      hidden
      md:block
      "
    >
      <div className="mb-8">
        <h2 className="text-xl font-bold text-primary500">پنل مدیریت</h2>

        <p className="text-xs text-gray-500 mt-1">سیستم مدیریت املاک</p>
      </div>

      <nav className="space-y-2">
        {adminMenu.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
              flex
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              transition
              ${
                active
                  ? "bg-primary500 text-white"
                  : "text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#444]"
              }
              `}
            >
              <Icon size={20} />

              <span className="text-sm font-bold">{item.title}</span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="
          mt-8
          w-full
          flex
          items-center
          gap-3
          rounded-xl
          px-4
          py-3
          text-red-500
          hover:bg-red-50
          dark:hover:bg-red-950/20
          transition
          disabled:opacity-50
          "
        >
          <LogOut size={20} />

          <span className="text-sm font-bold">
            {logoutMutation.isPending ? "در حال خروج..." : "خروج"}
          </span>
        </button>
      </nav>
    </aside>
  );
}
