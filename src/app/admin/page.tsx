"use client";

import {
  Building2,
  CalendarCheck,
  Users,
  Wallet,
  RefreshCw,
} from "lucide-react";

import { useAdminStats } from "@/hooks/useAdminStats";

export default function AdminPage() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useAdminStats();

  const stats = data?.stats;

  // =========================
  // Loading
  // =========================

  if (isLoading) {
    return (
      <div dir="rtl" className="w-full p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <div className="h-7 w-40 rounded-lg bg-gray-200 dark:bg-[#444] animate-pulse" />

          <div className="mt-3 h-4 w-64 rounded bg-gray-200 dark:bg-[#444] animate-pulse" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
                rounded-2xl
                bg-white
                dark:bg-[#353535]
                p-5
                shadow-sm
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 w-24 rounded bg-gray-200 dark:bg-[#444] animate-pulse" />

                  <div className="mt-4 h-8 w-20 rounded bg-gray-200 dark:bg-[#444] animate-pulse" />
                </div>

                <div className="h-12 w-12 rounded-xl bg-gray-200 dark:bg-[#444] animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================
  // Error
  // =========================

  if (isError) {
    return (
      <div
        dir="rtl"
        className="
          w-full
          min-h-[400px]
          flex
          items-center
          justify-center
          p-4
        "
      >
        <div
          className="
            w-full
            max-w-md
            rounded-2xl
            bg-white
            dark:bg-[#353535]
            p-6
            text-center
            shadow-sm
          "
        >
          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-red-100
              text-red-500
            "
          >
            !
          </div>

          <h2
            className="
              mt-4
              text-lg
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            خطا در دریافت اطلاعات
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-gray-500
              dark:text-gray-300
            "
          >
            {error instanceof Error
              ? error.message
              : "امکان دریافت آمار داشبورد وجود ندارد"}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="
              mt-5
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-primary500
              px-5
              py-2.5
              text-sm
              font-bold
              text-white
              transition
              hover:opacity-90
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <RefreshCw
              className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // Dashboard
  // =========================

  return (
    <div
      dir="rtl"
      className="
        w-full
        p-4
        sm:p-6
        lg:p-8
      "
    >
      {/* Header */}

      <div className="mb-8">
        <h1
          className="
            text-xl
            font-bold
            text-gray-900
            dark:text-white
            sm:text-2xl
          "
        >
          داشبورد مدیریت
        </h1>

        <p
          className="
            mt-2
            text-sm
            text-gray-500
            dark:text-gray-300
          "
        >
          نمای کلی وضعیت سایت و فعالیت کاربران
        </p>
      </div>

      {/* Refresh */}

      <div className="mb-5 flex justify-start">
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-gray-200
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            text-gray-700
            transition
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:border-[#4a4a4a]
            dark:bg-[#353535]
            dark:text-white
            dark:hover:bg-[#404040]
          "
        >
          <RefreshCw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          بروزرسانی
        </button>
      </div>

      {/* Stats */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {/* Users */}

        <StatCard
          title="کاربران"
          value={stats?.usersCount ?? 0}
          description="تعداد کاربران ثبت‌نام شده"
          icon={<Users className="h-6 w-6" />}
        />

        {/* Properties */}

        <StatCard
          title="املاک"
          value={stats?.propertiesCount ?? 0}
          description="تعداد املاک ثبت شده"
          icon={<Building2 className="h-6 w-6" />}
        />

        {/* Reservations */}

        <StatCard
          title="رزروها"
          value={stats?.reservationsCount ?? 0}
          description="تعداد کل رزروها"
          icon={<CalendarCheck className="h-6 w-6" />}
        />

        {/* Revenue */}

        <StatCard
          title="درآمد"
          value={formatPrice(stats?.revenue ?? 0)}
          description="مجموع پرداخت‌های موفق"
          icon={<Wallet className="h-6 w-6" />}
          isRevenue
        />
      </div>
    </div>
  );
}

// ======================================================
// Stat Card
// ======================================================

function StatCard({
  title,
  value,
  description,
  icon,
  isRevenue = false,
}: {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
  isRevenue?: boolean;
}) {
  return (
    <div
      className="
        rounded-2xl
        bg-white
        p-5
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:shadow-md
        dark:bg-[#353535]
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 text-right">
          <p
            className="
              text-sm
              font-medium
              text-gray-500
              dark:text-gray-300
            "
          >
            {title}
          </p>

          <p
            className="
              mt-3
              truncate
              text-2xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            {value}
            {isRevenue && (
              <span className="mr-1 text-xs font-normal text-gray-500 dark:text-gray-300">
                تومان
              </span>
            )}
          </p>

          <p
            className="
              mt-2
              text-xs
              text-gray-400
              dark:text-gray-400
            "
          >
            {description}
          </p>
        </div>

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-primary500/10
            text-primary500
          "
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

// ======================================================
// Format Price
// ======================================================

function formatPrice(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}
