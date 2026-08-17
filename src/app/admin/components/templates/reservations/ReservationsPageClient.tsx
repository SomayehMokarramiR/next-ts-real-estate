"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface ReservationUser {
  name?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

interface ReservationProperty {
  title?: string;

  location?: {
    city?: string;
  };
}

interface AdminReservation {
  _id: string;

  userId?: ReservationUser;

  propertyId?: ReservationProperty;

  checkIn: string;

  checkOut: string;

  nights: number;

  amount: number;

  status: "pending" | "paid" | "cancelled";

  createdAt: string;
}

interface ReservationsResponse {
  success: boolean;

  reservations: AdminReservation[];

  total: number;

  totalPages: number;

  currentPage: number;

  limit: number;
}

async function getReservations(params: {
  page: number;
  search: string;
  status: string;
  checkIn: string;
  checkOut: string;
}): Promise<ReservationsResponse> {
  const query = new URLSearchParams();

  query.append("page", String(params.page));

  query.append("limit", "10");

  if (params.search) {
    query.append("search", params.search);
  }

  if (params.status) {
    query.append("status", params.status);
  }

  if (params.checkIn) {
    query.append("checkIn", params.checkIn);
  }

  if (params.checkOut) {
    query.append("checkOut", params.checkOut);
  }

  const res = await fetch(`/api/admin/reservations?${query.toString()}`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "خطا در دریافت رزروها");
  }

  return data;
}

export default function ReservationsPageClient() {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [checkIn, setCheckIn] = useState("");

  const [checkOut, setCheckOut] = useState("");

  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery<ReservationsResponse>({
    queryKey: ["admin-reservations", page, search, status, checkIn, checkOut],

    queryFn: () =>
      getReservations({
        page,

        search,

        status,

        checkIn,

        checkOut,
      }),
  });

  const reservations = data?.reservations ?? [];

  const totalPages = data?.totalPages ?? 1;

  return (
    <div dir="rtl" className="w-full px-4 py-6">
      <div className="mb-6">
        <h1
          className="
        text-2xl
        font-bold
        dark:text-white
        "
        >
          مدیریت رزروها
        </h1>

        <p
          className="
        text-sm
        text-gray-500
        mt-2
        "
        >
          مشاهده و مدیریت رزروهای ثبت شده
        </p>
      </div>

      <div
        className="
      bg-white
      dark:bg-[#353535]
      rounded-2xl
      p-4
      mb-5
      "
      >
        <div
          className="
        flex
        flex-col
        xl:flex-row
        gap-4
        "
        >
          <div
            className="
          relative
          flex-1
          "
          >
            <Search
              size={18}
              className="
              absolute
              right-3
              top-3
              text-gray-400
              "
            />

            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);

                setPage(1);
              }}
              placeholder="جستجوی نام کاربر، ملک، تلفن، ایمیل یا مبلغ"
              className="
              w-full
              pr-10
              pl-3
              py-2.5
              rounded-xl
              border
              outline-none
              dark:bg-[#222]
              dark:text-white
              "
            />
          </div>

          <input
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);

              setPage(1);
            }}
            placeholder="ورود yyyy/mm/dd"
            className="
            rounded-xl
            border
            px-4
            py-2.5
            dark:bg-[#222]
            dark:text-white
            "
          />

          <input
            value={checkOut}
            onChange={(e) => {
              setCheckOut(e.target.value);

              setPage(1);
            }}
            placeholder="خروج yyyy/mm/dd"
            className="
            rounded-xl
            border
            px-4
            py-2.5
            dark:bg-[#222]
            dark:text-white
            "
          />

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);

              setPage(1);
            }}
            className="
            rounded-xl
            border
            px-4
            py-2.5
            dark:bg-[#222]
            dark:text-white
            "
          >
            <option value="">همه وضعیت‌ها</option>

            <option value="paid">پرداخت شده</option>

            <option value="pending">در انتظار پرداخت</option>

            <option value="cancelled">لغو شده</option>
          </select>
        </div>
      </div>

      {isLoading && (
        <div
          className="
        text-center
        py-10
        text-gray-500
        "
        >
          در حال دریافت رزروها...
        </div>
      )}

      {!isLoading && error && (
        <div
          className="
        text-center
        py-10
        text-red-500
        "
        >
          خطا در دریافت رزروها
        </div>
      )}

      {!isLoading && !error && (
        <div
          className="
      bg-white
      dark:bg-[#353535]
      rounded-2xl
      overflow-hidden
      "
        >
          <div className="overflow-x-auto">
            <table
              className="
        w-full
        text-sm
        "
            >
              <thead
                className="
          bg-gray-100
          dark:bg-[#2b2b2b]
          "
              >
                <tr>
                  <th className="p-4 text-right">کاربر</th>

                  <th className="p-4 text-right">ملک</th>

                  <th className="p-4 text-right">ورود</th>

                  <th className="p-4 text-right">خروج</th>

                  <th className="p-4 text-right">مبلغ</th>

                  <th className="p-4 text-right">وضعیت</th>
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
                    <td
                      className="
          p-4
          dark:text-white
          "
                    >
                      {item.userId?.name || "-"} {item.userId?.lastName || ""}
                    </td>

                    <td
                      className="
          p-4
          dark:text-white
          "
                    >
                      {item.propertyId?.title || "-"}
                    </td>

                    <td
                      className="
          p-4
          dark:text-white
          "
                    >
                      {item.checkIn}
                    </td>

                    <td
                      className="
          p-4
          dark:text-white
          "
                    >
                      {item.checkOut}
                    </td>

                    <td
                      className="
          p-4
          dark:text-white
          "
                    >
                      {item.amount.toLocaleString("fa-IR")}
                      {" تومان"}
                    </td>

                    <td className="p-4">
                      <span
                        className={`
          px-3
          py-1
          rounded-full
          text-xs
          font-medium

          ${
            item.status === "paid"
              ? "bg-green-500 text-white"
              : item.status === "cancelled"
                ? "bg-red-500 text-white"
                : "bg-yellow-400 text-black"
          }

          `}
                      >
                        {item.status === "paid"
                          ? "پرداخت شده"
                          : item.status === "cancelled"
                            ? "لغو شده"
                            : "در انتظار پرداخت"}
                      </span>
                    </td>
                  </tr>
                ))}

                {reservations.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="
          p-10
          text-center
          text-gray-500
          "
                    >
                      رزروی پیدا نشد
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div
              className="
        flex
        justify-center
        items-center
        gap-2
        py-5
        "
            >
              {Array.from({
                length: totalPages,
              }).map((_, index) => {
                const number = index + 1;

                return (
                  <button
                    key={number}
                    onClick={() => setPage(number)}
                    className={`
          w-9
          h-9
          rounded-full

          ${page === number ? "bg-primary500 text-white" : "bg-gray-200"}

          `}
                  >
                    {number}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
