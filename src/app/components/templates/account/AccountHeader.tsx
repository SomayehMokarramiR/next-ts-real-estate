"use client";

import { Bell, Moon, Sun, UserRound } from "lucide-react";

import { useMe } from "@/hooks/useAuth";
import { useTheme } from "../../../context/ThemeContext";

export default function AccountHeader() {
  const { data } = useMe();

  const { dark, toggleTheme } = useTheme();

  const user = data?.user;

  const fullName =
    [user?.name, user?.lastName].filter(Boolean).join(" ") || "کاربر";

  return (
    <header
      className="
        h-20
        shrink-0
        flex
        items-center
        justify-between
        border-b
        border-border
        bg-background
        px-4
        sm:px-6
        lg:px-8
      "
      dir="rtl"
    >
      {/* User Info */}
      <div>
        <p className="text-sm text-primary500 font-bold">خوش آمدید</p>

        <h1 className="mt-1 text-base font-bold text-foreground">{fullName}</h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="
    flex
    h-10
    w-10
    shrink-0
    items-center
    justify-center
    rounded-full
    bg-primary500
    text-white
    transition
    hover:bg-primary600
  "
          aria-label="تغییر تم"
        >
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        {/* Notification */}
        <button
          type="button"
          className="
    flex
    h-10
    w-10
    shrink-0
    items-center
    justify-center
    rounded-full
    bg-primary500
    text-white
    transition
    hover:bg-primary600
  "
          aria-label="اعلان‌ها"
        >
          <Bell className="h-5 w-5" />
        </button>

        {/* Avatar */}
        <div
          className="
    flex
    h-10
    w-10
    shrink-0
    items-center
    justify-center
    rounded-full
    bg-primary500
    text-white
  "
        >
          <UserRound className="h-5 w-5" />
        </div>
      </div>
    </header>
  );
}
