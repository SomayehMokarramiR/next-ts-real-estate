"use client";

import Link from "next/link";
import { CalendarCheck, Heart, UserRound } from "lucide-react";

import { useMe } from "@/hooks/useAuth";

export default function AccountPage() {
  const { data } = useMe();

  const user = data?.user;

  const fullName =
    [user?.name, user?.lastName].filter(Boolean).join(" ") || "کاربر";

  return (
    <div dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          داشبورد
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          سلام {fullName}، به پنل کاربری خوش آمدید.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/account/profile"
          className="
            rounded-2xl
            bg-white
            p-5
            shadow-sm
            border
            border-gray-100
            transition
            hover:-translate-y-0.5
            hover:shadow-md
            dark:border-[#353535]
            dark:bg-[#272727]
          "
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary500/10 text-primary500">
              <UserRound className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm text-gray-400">حساب کاربری</p>

              <p className="mt-1 font-bold text-gray-900 dark:text-white">
                پروفایل من
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/account/reservations"
          className="
            rounded-2xl
            bg-white
            p-5
            shadow-sm
            border
            border-gray-100
            transition
            hover:-translate-y-0.5
            hover:shadow-md
            dark:border-[#353535]
            dark:bg-[#272727]
          "
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary500/10 text-primary500">
              <CalendarCheck className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm text-gray-400">رزروها</p>

              <p className="mt-1 font-bold text-gray-900 dark:text-white">
                رزروهای من
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/account/favorites"
          className="
            rounded-2xl
            bg-white
            p-5
            shadow-sm
            border
            border-gray-100
            transition
            hover:-translate-y-0.5
            hover:shadow-md
            dark:border-[#353535]
            dark:bg-[#272727]
          "
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary500/10 text-primary500">
              <Heart className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm text-gray-400">ذخیره‌شده‌ها</p>

              <p className="mt-1 font-bold text-gray-900 dark:text-white">
                علاقه‌مندی‌ها
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
