"use client";

import { Moon, Sun, UserRound } from "lucide-react";

import { useMe } from "@/hooks/useAuth";
import { useTheme } from "@/app/context/ThemeContext";

export default function AdminHeader() {
  const { data } = useMe();

  const { dark, toggleTheme } = useTheme();

  const user = data?.user;

  const fullName =
    [user?.name, user?.lastName].filter(Boolean).join(" ") || "مدیر سیستم";

  return (
    <header
      dir="rtl"
      className="
      h-20
      flex
      items-center
      justify-between
      px-6
      bg-background
      border-b
      border-border
      "
    >
      {/* Welcome */}

      <div
        className="
        text-right
        "
      >
        <p
          className="
          text-sm
          text-primary500
          font-bold
          "
        >
          خوش آمدید
        </p>

        <h1
          className="
          mt-1
          font-bold
          text-foreground
          "
        >
          {fullName}
        </h1>
      </div>

      {/* Actions */}

      <div
        className="
        flex
        items-center
        gap-3
        "
      >
        {/* Theme */}

        <button
          type="button"
          onClick={toggleTheme}
          className="
          flex
          items-center
          justify-center
          w-10
          h-10
          rounded-full
          bg-primary500
          text-white
          "
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Admin Avatar */}

        <div
          className="
          w-10
          h-10
          rounded-full
          bg-primary500
          text-white
          flex
          items-center
          justify-center
          "
        >
          <UserRound size={20} />
        </div>
      </div>
    </header>
  );
}
