"use client";

import {
  Building2,
  CalendarCheck,
  Users,
  Wallet,
  RefreshCw,
} from "lucide-react";

import { useQueryClient } from "@tanstack/react-query";

import { useAdminStats } from "@/hooks/useAdminStats";

import LatestReservations from "./LatestReservations";
import LatestUsers from "./LatestUsers";
import DashboardCharts from "./DashboardCharts";

export default function AdminDashboardClient() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, refetch, isFetching } =
    useAdminStats();

  const stats = data?.stats;

  // =========================
  // Loading
  // =========================

  if (isLoading) {
    return (
      <div
        dir="rtl"
        className="
        p-8
        text-center
        text-gray-500
        "
      >
        در حال دریافت اطلاعات داشبورد...
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
        p-8
        text-center
        text-red-500
        "
      >
        {error instanceof Error
          ? error.message
          : "خطا در دریافت اطلاعات داشبورد"}
      </div>
    );
  }

  // =========================
  // Refresh Dashboard
  // =========================

  const handleRefresh = async () => {
    await refetch();

    await queryClient.invalidateQueries({
      queryKey: ["admin-latest-users"],
    });

    await queryClient.invalidateQueries({
      queryKey: ["admin-latest-reservations"],
    });

    await queryClient.invalidateQueries({
      queryKey: ["admin-dashboard-chart"],
    });
  };

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
          text-2xl
          font-bold
          text-gray-900
          dark:text-white
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

      <div className="mb-6">
        <button
          onClick={handleRefresh}
          disabled={isFetching}
          className="
          flex
          items-center
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
          <RefreshCw size={18} className={isFetching ? "animate-spin" : ""} />

          {isFetching ? "در حال بروزرسانی..." : "بروزرسانی"}
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
        <StatCard
          title="کاربران"
          value={stats?.usersCount ?? 0}
          icon={<Users size={25} />}
        />

        <StatCard
          title="املاک"
          value={stats?.propertiesCount ?? 0}
          icon={<Building2 size={25} />}
        />

        <StatCard
          title="رزروها"
          value={stats?.reservationsCount ?? 0}
          icon={<CalendarCheck size={25} />}
        />

        <StatCard
          title="درآمد"
          value={`${formatPrice(stats?.revenue ?? 0)} تومان`}
          icon={<Wallet size={25} />}
        />
      </div>

      {/* Charts */}

      <div className="mt-8">
        <DashboardCharts />
      </div>

      {/* Latest */}

      <div
        className="
        mt-8
        grid
        grid-cols-1
        gap-6
        xl:grid-cols-2
        "
      >
        <LatestReservations />

        <LatestUsers />
      </div>
    </div>
  );
}

// =========================
// Stat Card
// =========================

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="
      rounded-2xl
      bg-white
      dark:bg-[#353535]
      p-5
      shadow-sm
      transition
      hover:-translate-y-1
      hover:shadow-md
      "
    >
      <div
        className="
        flex
        items-center
        justify-between
        "
      >
        <div>
          <p
            className="
            text-sm
            text-gray-500
            dark:text-gray-300
            "
          >
            {title}
          </p>

          <p
            className="
            mt-3
            text-2xl
            font-bold
            text-gray-900
            dark:text-white
            "
          >
            {value}
          </p>
        </div>

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
          {icon}
        </div>
      </div>
    </div>
  );
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("fa-IR").format(value);
}
