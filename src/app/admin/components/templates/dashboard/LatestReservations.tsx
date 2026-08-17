"use client";

import { CalendarDays, User, Home, Wallet } from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "@/app/lib/apiRequest";

type Reservation = {
  _id: string;

  userId?: {
    name?: string;
    lastName?: string;
  };

  propertyId?: {
    title?: string;
  };

  checkIn?: string;

  checkOut?: string;

  amount?: number;

  status?: string;
};

type LatestReservationsResponse = {
  success: boolean;
  reservations: Reservation[];
};

async function getLatestReservations(): Promise<LatestReservationsResponse> {
  const data = await apiRequest("/api/admin/reservations?limit=5");

  return data as LatestReservationsResponse;
}

export default function LatestReservations() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-latest-reservations"],

    queryFn: getLatestReservations,

    staleTime: 1000 * 60 * 2,
  });

  const reservations: Reservation[] = data?.reservations ?? [];

  if (isLoading) {
    return (
      <div
        className="
        mt-6
        rounded-2xl
        bg-white
        dark:bg-[#353535]
        p-6
        "
      >
        <p className="text-gray-500">در حال دریافت آخرین رزروها...</p>
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
        خطا در دریافت رزروها
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="
      mt-6
      rounded-2xl
      bg-white
      dark:bg-[#353535]
      overflow-hidden
      "
    >
      {/* Header */}

      <div
        className="
        p-5
        border-b
        dark:border-gray-700
        "
      >
        <h2
          className="
          font-bold
          text-lg
          text-gray-900
          dark:text-white
          "
        >
          آخرین رزروها
        </h2>
      </div>

      {/* List */}

      <div
        className="
        divide-y
        dark:divide-gray-700
        "
      >
        {reservations.map((item) => (
          <div
            key={item._id}
            className="
              p-5
              flex
              flex-col
              gap-4
              lg:flex-row
              lg:items-center
              lg:justify-between
              "
          >
            {/* Property + User */}

            <div
              className="
                flex
                items-center
                gap-3
                "
            >
              <div
                className="
                  h-11
                  w-11
                  rounded-xl
                  bg-primary500/10
                  text-primary500
                  flex
                  items-center
                  justify-center
                  "
              >
                <Home size={22} />
              </div>

              <div>
                <p
                  className="
                    font-bold
                    text-gray-900
                    dark:text-white
                    "
                >
                  {item.propertyId?.title || "-"}
                </p>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-gray-500
                    "
                >
                  <User size={14} />
                  {item.userId?.name || "-"} {item.userId?.lastName || ""}
                </div>
              </div>
            </div>

            {/* Info */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-5
                text-sm
                text-gray-600
                dark:text-gray-300
                "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  "
              >
                <CalendarDays size={16} />

                <span>
                  {item.checkIn || "-"}
                  {" تا "}
                  {item.checkOut || "-"}
                </span>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  "
              >
                <Wallet size={16} />

                <span>
                  {(item.amount ?? 0).toLocaleString("fa-IR")}

                  {" تومان"}
                </span>
              </div>

              <span
                className={`
                  px-3
                  py-1
                  rounded-full
                  text-xs

                  ${
                    item.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }

                  `}
              >
                {item.status === "paid" ? "پرداخت شده" : item.status || "-"}
              </span>
            </div>
          </div>
        ))}

        {reservations.length === 0 && (
          <div
            className="
              p-10
              text-center
              text-gray-500
              "
          >
            رزروی وجود ندارد
          </div>
        )}
      </div>
    </div>
  );
}
