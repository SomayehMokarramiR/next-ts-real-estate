"use client";

import { Bell, UserRound } from "lucide-react";
import { useMe } from "@/hooks/useAuth";

export default function AccountHeader() {
  const { data } = useMe();

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
        border-gray-100
        bg-white
        px-4
        dark:border-[#353535]
        dark:bg-[#272727]
        sm:px-6
        lg:px-8
      "
    >
      {/* اطلاعات کاربر */}
      <div>
        <p className="text-xs text-gray-400">خوش آمدید</p>

        <h1 className="mt-1 text-base font-bold text-gray-900 dark:text-white">
          {fullName}
        </h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
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
            border
            border-gray-200
            text-gray-500
            transition
            hover:border-primary500
            hover:text-primary500
            dark:border-[#444]
            dark:text-gray-300
          "
        >
          <Bell className="h-5 w-5" />
        </button>

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-primary500/10
            text-primary500
          "
        >
          <UserRound className="h-5 w-5" />
        </div>
      </div>
    </header>
  );
}
