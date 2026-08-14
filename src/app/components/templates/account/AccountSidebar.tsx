"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  UserRound,
  CalendarCheck,
  Heart,
  Settings,
  LogOut,
} from "lucide-react";

import { useLogout } from "@/hooks/useAuth";

const menuItems = [
  {
    label: "داشبورد",
    href: "/account",
    icon: LayoutDashboard,
  },
  {
    label: "پروفایل من",
    href: "/account/profile",
    icon: UserRound,
  },
  {
    label: "رزروهای من",
    href: "/account/reservations",
    icon: CalendarCheck,
  },
  {
    label: "علاقه‌مندی‌ها",
    href: "/account/favorites",
    icon: Heart,
  },
  {
    label: "تنظیمات",
    href: "/account/settings",
    icon: Settings,
  },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <aside
      className="
        hidden
        h-full
        w-64
        shrink-0
        flex-col
        border-l
        border-gray-100
        bg-white
        dark:border-[#353535]
        dark:bg-[#272727]
        lg:flex
      "
    >
      {/* Logo / Title */}
      <div className="shrink-0 border-b border-gray-100 px-5 py-6 dark:border-[#353535]">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          پنل کاربری
        </h2>

        <p className="mt-1 text-xs text-gray-400">مدیریت حساب کاربری</p>
      </div>

      {/* Menu */}
      <nav className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/account"
                ? pathname === "/account"
                : pathname.startsWith(item.href);

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
                  text-sm
                  transition-all
                  ${
                    isActive
                      ? "bg-primary500 text-white shadow-sm"
                      : "text-gray-500 hover:bg-primary500/10 hover:text-primary500 dark:text-gray-300"
                  }
                `}
              >
                <Icon className="h-5 w-5 shrink-0" />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="shrink-0 border-t border-gray-100 p-4 dark:border-[#353535]">
        <button
          type="button"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-sm
            text-red-500
            transition
            hover:bg-red-50
            disabled:opacity-50
            dark:hover:bg-red-950/20
          "
        >
          <LogOut className="h-5 w-5 shrink-0" />

          <span>
            {logoutMutation.isPending ? "در حال خروج..." : "خروج از حساب"}
          </span>
        </button>
      </div>
    </aside>
  );
}
