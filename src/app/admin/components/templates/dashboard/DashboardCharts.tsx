"use client";

import { BarChart3, TrendingUp } from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

import { useAdminStats } from "@/hooks/useAdminStats";

export default function DashboardCharts() {
  const { data, isLoading, isError } = useAdminStats();

  const stats = data?.stats;

  if (isLoading) {
    return (
      <div
        className="
        mt-6
        rounded-2xl
        bg-white
        dark:bg-[#353535]
        p-6
        text-gray-500
        "
      >
        در حال دریافت نمودارها...
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
        mt-6
        rounded-2xl
        bg-white
        dark:bg-[#353535]
        p-6
        text-red-500
        "
      >
        خطا در دریافت نمودارها
      </div>
    );
  }

  const reservationData = [
    {
      title: "کل رزروها",
      value: stats?.reservationsCount ?? 0,
    },

    {
      title: "کاربران",
      value: stats?.usersCount ?? 0,
    },

    {
      title: "املاک",
      value: stats?.propertiesCount ?? 0,
    },
  ];

  const revenueData = [
    {
      title: "درآمد",
      value: stats?.revenue ?? 0,
    },
  ];

  return (
    <div
      dir="rtl"
      className="
      mt-6
      grid
      grid-cols-1
      xl:grid-cols-2
      gap-6
      "
    >
      {/* Reservations */}

      <div
        className="
        rounded-2xl
        bg-white
        dark:bg-[#353535]
        p-5
        "
      >
        <div
          className="
          flex
          items-center
          gap-3
          mb-6
          "
        >
          <div
            className="
            h-10
            w-10
            rounded-xl
            bg-primary500/10
            text-primary500
            flex
            items-center
            justify-center
            "
          >
            <BarChart3 size={22} />
          </div>

          <div>
            <h3
              className="
              font-bold
              text-gray-900
              dark:text-white
              "
            >
              آمار کلی سایت
            </h3>

            <p className="text-xs text-gray-500">وضعیت فعلی سیستم</p>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={reservationData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="title" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue */}

      <div
        className="
        rounded-2xl
        bg-white
        dark:bg-[#353535]
        p-5
        "
      >
        <div
          className="
          flex
          items-center
          gap-3
          mb-6
          "
        >
          <div
            className="
            h-10
            w-10
            rounded-xl
            bg-primary500/10
            text-primary500
            flex
            items-center
            justify-center
            "
          >
            <TrendingUp size={22} />
          </div>

          <div>
            <h3
              className="
              font-bold
              text-gray-900
              dark:text-white
              "
            >
              درآمد
            </h3>

            <p className="text-xs text-gray-500">مجموع پرداخت‌های موفق</p>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="title" />

              <YAxis />

              <Tooltip
                formatter={(value) =>
                  `${Number(value).toLocaleString("fa-IR")} تومان`
                }
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
