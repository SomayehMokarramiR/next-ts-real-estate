"use client";

import { toJalaali } from "jalaali-js";
import { Eye, Pencil, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// =========================
// TYPES
// =========================

interface ReservationUser {
  _id?: string;
  name?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

interface ReservationProperty {
  _id?: string;
  title?: string;

  location?: {
    city?: string;
    address?: string;
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
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
// =========================
// GET RESERVATIONS
// =========================

async function getReservations(params: {
  page: number;
  search: string;
  status: string;
  checkIn: string;
  checkOut: string;
}): Promise<ReservationsResponse> {
  const query = new URLSearchParams();

  query.set("page", String(params.page));
  query.set("limit", "10");

  const search = params.search.trim();
  const checkIn = params.checkIn.trim();
  const checkOut = params.checkOut.trim();

  if (search) {
    query.set("search", search);
  }

  if (params.status) {
    query.set("status", params.status);
  }

  if (checkIn) {
    query.set("checkIn", checkIn);
  }

  if (checkOut) {
    query.set("checkOut", checkOut);
  }

  const response = await fetch(`/api/admin/reservations?${query.toString()}`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  let data: unknown;

  try {
    data = await response.json();
  } catch {
    throw new Error("پاسخ نامعتبر از سرور دریافت شد");
  }

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : "خطا در دریافت رزروها";

    throw new Error(message);
  }

  return data as ReservationsResponse;
}

// =========================
// STATUS LABEL
// =========================

function getStatusLabel(status: AdminReservation["status"]): string {
  switch (status) {
    case "paid":
      return "پرداخت شده";

    case "cancelled":
      return "لغو شده";

    case "pending":
      return "در انتظار پرداخت";

    default:
      return status;
  }
}

// =========================
// STATUS CLASS
// =========================

function getStatusClass(status: AdminReservation["status"]): string {
  switch (status) {
    case "paid":
      return "bg-green-500 text-white";

    case "cancelled":
      return "bg-red-500 text-white";

    case "pending":
      return "bg-yellow-400 text-black";

    default:
      return "bg-gray-400 text-white";
  }
}
//===============================

function toPersianNumber(value: string) {
  return value.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

function formatJalaliDate(date?: string) {
  if (!date) return "-";

  const value = String(date).trim();

  // اگر تاریخ از قبل شمسی باشد
  // مثال: 1405/02/01
  const jalaliMatch = value.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})/);

  if (jalaliMatch) {
    const year = Number(jalaliMatch[1]);

    // سال‌های شمسی
    if (year >= 1300 && year <= 1500) {
      const month = jalaliMatch[2].padStart(2, "0");
      const day = jalaliMatch[3].padStart(2, "0");

      return `${toPersianNumber(String(year))}/${toPersianNumber(
        month,
      )}/${toPersianNumber(day)}`;
    }
  }

  // اگر تاریخ میلادی / ISO باشد
  const parsedDate = new Date(value);

  if (!Number.isNaN(parsedDate.getTime())) {
    const { jy, jm, jd } = toJalaali(
      parsedDate.getFullYear(),
      parsedDate.getMonth() + 1,
      parsedDate.getDate(),
    );

    return `${toPersianNumber(String(jy))}/${toPersianNumber(
      String(jm).padStart(2, "0"),
    )}/${toPersianNumber(String(jd).padStart(2, "0"))}`;
  }

  return value;
}

// =========================
// COMPONENT
// =========================

export default function ReservationsPageClient() {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [checkIn, setCheckIn] = useState("");

  const [checkOut, setCheckOut] = useState("");

  const [page, setPage] = useState(1);

  // =========================
  // QUERY
  // =========================

  const { data, isLoading, isFetching, error } = useQuery<ReservationsResponse>(
    {
      queryKey: ["admin-reservations", page, search, status, checkIn, checkOut],

      queryFn: () =>
        getReservations({
          page,
          search,
          status,
          checkIn,
          checkOut,
        }),

      staleTime: 0,

      refetchOnWindowFocus: false,
    },
  );

  const reservations = data?.reservations ?? [];

  const totalPages = Math.max(data?.pagination?.pages ?? 1, 1);

  // =========================
  // RESET FILTERS
  // =========================

  function resetFilters() {
    setSearch("");
    setStatus("");
    setCheckIn("");
    setCheckOut("");
    setPage(1);
  }

  // =========================
  // RENDER
  // =========================

  return (
    <div dir="rtl" className="w-full px-4 py-6">
      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">مدیریت رزروها</h1>

          <p className="mt-2 text-sm text-gray-500">
            مشاهده و مدیریت رزروهای ثبت شده
          </p>
        </div>

        {/* CREATE */}

        <Link
          href="/admin/reservations/create"
          className="
            flex
            w-fit
            items-center
            gap-2
            rounded-xl
            bg-primary500
            px-4
            py-2.5
            text-sm
            font-medium
            text-white
            transition
            hover:opacity-90
          "
        >
          <Plus size={18} />
          رزرو جدید
        </Link>
      </div>

      {/* =========================
          FILTERS
      ========================= */}

      <div
        className="
          mb-5
          rounded-2xl
          bg-white
          p-4
          dark:bg-[#353535]
        "
      >
        <div
          className="
            grid
            gap-4
            xl:grid-cols-[minmax(250px,1fr)_180px_180px_180px_auto]
          "
        >
          {/* SEARCH */}

          <div className="relative">
            <Search
              size={18}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
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
                rounded-xl
                border
                border-gray-300
                py-2.5
                pl-3
                pr-10
                outline-none
                transition
                focus:border-primary500
                dark:border-gray-600
                dark:bg-[#222]
                dark:text-white
              "
            />
          </div>

          {/* CHECK IN */}

          <input
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              setPage(1);
            }}
            placeholder="ورود yyyy/mm/dd"
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-2.5
              outline-none
              transition
              focus:border-primary500
              dark:border-gray-600
              dark:bg-[#222]
              dark:text-white
            "
          />

          {/* CHECK OUT */}

          <input
            value={checkOut}
            onChange={(e) => {
              setCheckOut(e.target.value);
              setPage(1);
            }}
            placeholder="خروج yyyy/mm/dd"
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-2.5
              outline-none
              transition
              focus:border-primary500
              dark:border-gray-600
              dark:bg-[#222]
              dark:text-white
            "
          />

          {/* STATUS */}

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-2.5
              outline-none
              transition
              focus:border-primary500
              dark:border-gray-600
              dark:bg-[#222]
              dark:text-white
            "
          >
            <option value="">همه وضعیت‌ها</option>

            <option value="paid">پرداخت شده</option>

            <option value="pending">در انتظار پرداخت</option>

            <option value="cancelled">لغو شده</option>
          </select>

          {/* RESET */}

          <button
            type="button"
            onClick={resetFilters}
            className="
              rounded-xl
              border
              border-gray-300
              px-4
              py-2.5
              text-sm
              text-gray-600
              transition
              hover:bg-gray-100
              dark:border-gray-600
              dark:text-gray-300
              dark:hover:bg-[#444]
            "
          >
            پاک کردن
          </button>
        </div>
      </div>

      {/* =========================
          FETCHING
      ========================= */}

      {isFetching && !isLoading && (
        <div className="mb-3 text-left text-xs text-gray-400">
          در حال به‌روزرسانی...
        </div>
      )}

      {/* =========================
          LOADING
      ========================= */}

      {isLoading && (
        <div className="rounded-2xl bg-white py-12 text-center text-gray-500 dark:bg-[#353535]">
          در حال دریافت رزروها...
        </div>
      )}

      {/* =========================
          ERROR
      ========================= */}

      {!isLoading && error && (
        <div className="rounded-2xl bg-white py-12 text-center text-red-500 dark:bg-[#353535]">
          {error instanceof Error ? error.message : "خطا در دریافت رزروها"}
        </div>
      )}

      {/* =========================
          TABLE
      ========================= */}

      {!isLoading && !error && (
        <div
          className="
            overflow-hidden
            rounded-2xl
            bg-white
            dark:bg-[#353535]
          "
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-sm">
              <thead
                className="
                  bg-gray-100
                  dark:bg-[#2b2b2b]
                "
              >
                <tr>
                  <th className="whitespace-nowrap p-4 text-right">کاربر</th>

                  <th className="whitespace-nowrap p-4 text-right">ملک</th>

                  <th className="whitespace-nowrap p-4 text-right">ورود</th>

                  <th className="whitespace-nowrap p-4 text-right">خروج</th>

                  <th className="whitespace-nowrap p-4 text-right">شب</th>

                  <th className="whitespace-nowrap p-4 text-right">مبلغ</th>

                  <th className="whitespace-nowrap p-4 text-right">وضعیت</th>

                  <th className="whitespace-nowrap p-4 text-center">عملیات</th>
                </tr>
              </thead>

              <tbody>
                {reservations.map((item) => (
                  <tr
                    key={item._id}
                    className="
                      border-b
                      transition
                      hover:bg-gray-50
                      dark:border-gray-700
                      dark:hover:bg-[#303030]
                    "
                  >
                    {/* USER */}

                    <td className="p-4 dark:text-white">
                      <div>
                        <div className="font-medium">
                          {item.userId?.name || "-"}{" "}
                          {item.userId?.lastName || ""}
                        </div>
                      </div>
                    </td>

                    {/* PROPERTY */}

                    <td className="max-w-[240px] p-4 dark:text-white">
                      <div className="truncate font-medium">
                        {item.propertyId?.title || "-"}
                      </div>

                      {item.propertyId?.location?.city && (
                        <div className="mt-1 text-xs text-gray-500">
                          {item.propertyId.location.city}
                        </div>
                      )}
                    </td>

                    {/* CHECK IN */}

                    <td className="whitespace-nowrap p-4 dark:text-white">
                      {formatJalaliDate(item.checkIn)}
                    </td>

                    {/* CHECK OUT */}

                    <td className="whitespace-nowrap p-4 dark:text-white">
                      {formatJalaliDate(item.checkOut)}
                    </td>

                    {/* NIGHTS */}

                    <td className="whitespace-nowrap p-4 dark:text-white">
                      {item.nights ?? 0}
                    </td>

                    {/* AMOUNT */}

                    <td className="whitespace-nowrap p-4 dark:text-white">
                      {Number(item.amount || 0).toLocaleString("fa-IR")}
                      {" تومان"}
                    </td>

                    {/* STATUS */}

                    <td className="whitespace-nowrap p-4">
                      <span
                        className={`
                          inline-flex
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-medium
                          ${getStatusClass(item.status)}
                        `}
                      >
                        {getStatusLabel(item.status)}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* DETAIL */}

                        <Link
                          href={`/admin/reservations/${item._id}`}
                          title="مشاهده جزئیات"
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            bg-blue-50
                            text-blue-600
                            transition
                            hover:bg-blue-100
                            dark:bg-blue-500/10
                            dark:text-blue-400
                          "
                        >
                          <Eye size={17} />
                        </Link>

                        {/* EDIT */}

                        <Link
                          href={`/admin/reservations/${item._id}/edit`}
                          title="ویرایش رزرو"
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            bg-orange-50
                            text-orange-600
                            transition
                            hover:bg-orange-100
                            dark:bg-orange-500/10
                            dark:text-orange-400
                          "
                        >
                          <Pencil size={17} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}

                {reservations.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-10 text-center text-gray-500">
                      رزروی پیدا نشد
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}

          {totalPages > 1 && (
            <div
              className="
                flex
                flex-wrap
                items-center
                justify-center
                gap-2
                px-4
                py-5
              "
            >
              {Array.from({ length: totalPages }).map((_, index) => {
                const number = index + 1;

                return (
                  <button
                    key={number}
                    type="button"
                    onClick={() => setPage(number)}
                    disabled={isFetching}
                    aria-current={page === number ? "page" : undefined}
                    className={`
                      h-9
                      w-9
                      rounded-full
                      transition
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      ${
                        page === number
                          ? "bg-primary500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-[#444] dark:text-white"
                      }
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
