"use client";

import {
  ArrowRight,
  CalendarDays,
  Mail,
  Phone,
  UserRound,
  ShieldCheck,
  Home,
  Wallet,
} from "lucide-react";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

type Reservation = {
  _id: string;

  propertyId?: {
    title?: string;

    location?: {
      city?: string;
      address?: string;
    };
  };

  checkIn?: string;

  checkOut?: string;

  nights?: number;

  amount?: number;

  status?: string;

  createdAt: string;
};

type UserDetailData = {
  success: boolean;

  user: {
    _id: string;

    name: string;

    lastName?: string;

    email: string;

    phoneNumber?: string;

    role: "user" | "admin";

    createdAt: string;
  };

  reservationsCount: number;

  reservations: Reservation[];
};

export default function UserDetailClient({ data }: { data: UserDetailData }) {
  const router = useRouter();

  const user = data?.user;

  const reservations = data?.reservations ?? [];

  const reservationsCount = data?.reservationsCount ?? 0;

  if (!user) {
    return (
      <div dir="rtl" className="p-10 text-center text-red-500">
        اطلاعات کاربر یافت نشد
      </div>
    );
  }

  const totalPayment = reservations.reduce(
    (sum, item) => sum + (item.amount ?? 0),
    0,
  );

  return (
    <div dir="rtl" className="w-full px-4 py-6">
      {/* Header */}

      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="
          p-2
          rounded-xl
          bg-gray-100
          dark:bg-[#333]
          "
        >
          <ArrowRight size={20} />
        </button>

        <div>
          <h1
            className="
            text-2xl
            font-bold
            text-gray-900
            dark:text-white
            "
          >
            جزئیات کاربر
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            مشاهده اطلاعات و رزروهای کاربر
          </p>
        </div>
      </div>

      {/* User */}

      <div
        className="
        bg-white
        dark:bg-[#353535]
        rounded-2xl
        p-6
        mb-6
        "
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="
            w-12
            h-12
            rounded-full
            bg-primary500
            text-white
            flex
            items-center
            justify-center
            "
          >
            <UserRound size={24} />
          </div>

          <div>
            <h2
              className="
              font-bold
              text-lg
              text-gray-900
              dark:text-white
              "
            >
              {user.name} {user.lastName}
            </h2>

            <span className="text-xs text-gray-500">شناسه: {user._id}</span>
          </div>
        </div>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
          "
        >
          <InfoCard
            icon={<Mail size={18} />}
            title="ایمیل"
            value={user.email}
          />

          <InfoCard
            icon={<Phone size={18} />}
            title="شماره تماس"
            value={user.phoneNumber || "-"}
          />

          <InfoCard
            icon={<ShieldCheck size={18} />}
            title="نقش"
            value={user.role === "admin" ? "مدیر" : "کاربر"}
          />

          <InfoCard
            icon={<CalendarDays size={18} />}
            title="تاریخ عضویت"
            value={new Date(user.createdAt).toLocaleDateString("fa-IR")}
          />
        </div>
      </div>

      {/* Stats */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-4
        mb-6
        "
      >
        <StatCard
          icon={<Home size={22} />}
          title="تعداد رزرو"
          value={String(reservationsCount)}
        />

        <StatCard
          icon={<Wallet size={22} />}
          title="مجموع پرداخت"
          value={`${totalPayment.toLocaleString("fa-IR")} تومان`}
        />

        <StatCard
          icon={<CalendarDays size={22} />}
          title="آخرین رزرو"
          value={
            reservations.length
              ? new Date(reservations[0].createdAt).toLocaleDateString("fa-IR")
              : "-"
          }
        />
      </div>

      {/* Reservations */}

      <div
        className="
        bg-white
        dark:bg-[#353535]
        rounded-2xl
        overflow-hidden
        "
      >
        <div className="p-5 border-b dark:border-gray-700">
          <h2
            className="
            font-bold
            text-lg
            text-gray-900
            dark:text-white
            "
          >
            رزروهای کاربر
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table
            className="
            w-full
            text-sm
            text-right
            "
          >
            <thead
              className="
              bg-gray-100
              dark:bg-[#2b2b2b]
              "
            >
              <tr>
                <th className="p-4">ملک</th>

                <th className="p-4">شهر</th>

                <th className="p-4">ورود</th>

                <th className="p-4">خروج</th>

                <th className="p-4">شب</th>

                <th className="p-4">مبلغ</th>

                <th className="p-4">وضعیت</th>
              </tr>
            </thead>

            <tbody>
              {reservations.map((item) => (
                <tr
                  key={item._id}
                  className="
                  border-b
                  dark:border-gray-700
                  "
                >
                  <td className="p-4">{item.propertyId?.title || "-"}</td>

                  <td className="p-4">
                    {item.propertyId?.location?.city || "-"}
                  </td>

                  <td className="p-4">{item.checkIn || "-"}</td>

                  <td className="p-4">{item.checkOut || "-"}</td>

                  <td className="p-4">{item.nights ?? 0}</td>

                  <td className="p-4">
                    {(item.amount ?? 0).toLocaleString("fa-IR")}
                    {" تومان"}
                  </td>

                  <td className="p-4">
                    {item.status === "paid" ? "پرداخت شده" : item.status || "-"}
                  </td>
                </tr>
              ))}

              {reservations.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="
                    p-10
                    text-center
                    text-gray-500
                    "
                  >
                    رزروی ثبت نشده
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div
      className="
rounded-xl
bg-gray-50
dark:bg-[#222]
p-4
flex
items-center
gap-3
"
    >
      <div className="text-primary500">{icon}</div>

      <div>
        <p className="text-xs text-gray-500">{title}</p>

        <p className="font-medium text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div
      className="
bg-white
dark:bg-[#353535]
rounded-2xl
p-5
flex
items-center
gap-4
"
    >
      <div
        className="
w-12
h-12
rounded-xl
bg-gray-100
dark:bg-[#222]
flex
items-center
justify-center
"
      >
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-500">{title}</p>

        <p className="font-bold mt-1">{value}</p>
      </div>
    </div>
  );
}
