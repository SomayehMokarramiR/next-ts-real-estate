"use client";

import Link from "next/link";
import { CalendarCheck, Heart, UserRound } from "lucide-react";

import { useMe } from "@/hooks/useAuth";

export default function AccountPage() {
  const { data } = useMe();

  const user = data?.user;

  const fullName =
    [user?.name, user?.lastName].filter(Boolean).join(" ") || "کاربر";

  const cardClass = `
    rounded-2xl
    bg-background
    p-5
    shadow-sm
    border
    border-border
    transition
    hover:-translate-y-0.5
    hover:shadow-md
  `;

  return (
    <div dir="rtl" className="text-foreground">
      {/* Header */}

      <div className="mb-6">
        <h1
          className="
        text-2xl
        font-bold
        text-foreground
        "
        >
          داشبورد
        </h1>

        <p
          className="
        mt-1
        text-sm
        text-muted-foreground
        "
        >
          سلام {fullName}، به پنل کاربری خوش آمدید.
        </p>
      </div>

      {/* Cards */}

      <div
        className="
      grid
      grid-cols-1
      gap-4
      sm:grid-cols-2
      lg:grid-cols-3
      "
      >
        <Link
          href="/account/profile"
          className="
        rounded-2xl
        border
        border-border
        bg-background
        p-5
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:shadow-md
        "
        >
          <div className="flex items-center gap-4">
            <div
              className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-primary500/10
            text-primary500
            "
            >
              <UserRound className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">حساب کاربری</p>

              <p
                className="
              mt-1
              font-bold
              text-foreground
              "
              >
                پروفایل من
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/account/reservations"
          className="
        rounded-2xl
        border
        border-border
        bg-background
        p-5
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:shadow-md
        "
        >
          <div className="flex items-center gap-4">
            <div
              className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-primary500/10
            text-primary500
            "
            >
              <CalendarCheck className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">رزروها</p>

              <p
                className="
              mt-1
              font-bold
              text-foreground
              "
              >
                رزروهای من
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/account/favorites"
          className="
        rounded-2xl
        border
        border-border
        bg-background
        p-5
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:shadow-md
        "
        >
          <div className="flex items-center gap-4">
            <div
              className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-primary500/10
            text-primary500
            "
            >
              <Heart className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">ذخیره‌شده‌ها</p>

              <p
                className="
              mt-1
              font-bold
              text-foreground
              "
              >
                علاقه‌مندی‌ها
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
