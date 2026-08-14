"use client";

import Link from "next/link";
import {
  CalendarDays,
  ChevronLeft,
  Clock3,
  CreditCard,
  MapPin,
  XCircle,
  CheckCircle2,
} from "lucide-react";

import {
  useMyReservations,
  useDeleteReservation,
} from "@/hooks/useReservations";

import Swal from "sweetalert2";
import type {
  Reservation,
  ReservationProperty,
} from "@/services/reservationService";

type ReservationStatus = "pending" | "paid" | "cancelled";

function getStatusLabel(status: ReservationStatus) {
  switch (status) {
    case "paid":
      return "پرداخت شده";

    case "pending":
      return "در انتظار پرداخت";

    case "cancelled":
      return "لغو شده";

    default:
      return "نامشخص";
  }
}

function getStatusClass(status: ReservationStatus) {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-600 dark:bg-green-950/30 dark:text-green-400";

    case "pending":
      return "bg-amber-100 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400";

    case "cancelled":
      return "bg-red-100 text-red-500 dark:bg-red-950/30 dark:text-red-400";

    default:
      return "bg-gray-100 text-gray-500 dark:bg-[#353535] dark:text-gray-300";
  }
}

function getStatusIcon(status: ReservationStatus) {
  switch (status) {
    case "paid":
      return CheckCircle2;

    case "pending":
      return Clock3;

    case "cancelled":
      return XCircle;

    default:
      return Clock3;
  }
}

function formatAmount(amount: number) {
  return amount.toLocaleString("fa-IR");
}

function getProperty(reservation: Reservation): ReservationProperty | null {
  if (typeof reservation.propertyId === "string") {
    return null;
  }

  return reservation.propertyId;
}

export default function ReservationsPage() {
  const { data, isLoading, isError, error, refetch } = useMyReservations();

  const deleteReservationMutation = useDeleteReservation();

  if (isLoading) {
    return (
      <div className="space-y-6" dir="rtl">
        <div>
          <div className="h-8 w-40 rounded-lg bg-muted animate-pulse" />

          <div className="mt-2 h-4 w-72 rounded bg-muted animate-pulse" />
        </div>

        <div className="grid grid-cols-1 gap-5">
          {Array.from({
            length: 3,
          }).map((_, index) => (
            <div
              key={index}
              className="
                overflow-hidden
                rounded-2xl              
                border border-border bg-background               
                p-5
                shadow-sm
                
                animate-pulse
              "
            >
              <div className="flex flex-col gap-5 md:flex-row">
                <div className="h-48 w-full rounded-xl bg-muted md:w-64" />

                <div className="flex-1 space-y-4">
                  <div className="h-5 w-1/2 rounded bg-muted" />
                  <div className="h-4 w-1/3 rounded bg-muted" />
                  <div className="h-4 w-2/3 rounded bg-muted" />
                  <div className="h-10 w-36 rounded-xl bg-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center" dir="rtl">
        <p className="text-sm text-red-500">
          {error instanceof Error ? error.message : "خطا در دریافت رزروهای شما"}
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="
            mt-5
            rounded-xl
            bg-primary500
            px-5
            py-2.5
            text-sm
            font-medium
            text-white
            hover:bg-primary600
          "
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  const reservations = data?.reservations ?? [];

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">رزروهای من</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          لیست تمام رزروهای ثبت‌شده شما
        </p>
      </div>

      {/* Count */}
      <div
        className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-primary500/10
          px-4
          py-2
          text-sm
          font-medium
          text-primary500
        "
      >
        <CalendarDays className="h-4 w-4" />
        {(data?.total ?? reservations.length).toLocaleString("fa-IR")} رزرو
      </div>

      {/* Empty */}
      {reservations.length === 0 ? (
        <div
          className="
            rounded-2xl
            border
            border-dashed
           border-border
bg-background
            px-6
            py-20
            text-center
            dark:border-[#444]
            dark:bg-[#272727]
          "
        >
          <CalendarDays className="mx-auto h-12 w-12 text-gray-300" />

          <h2 className="mt-4 text-lg font-bold text-foreground">
            هنوز رزروی ندارید
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            اقامتگاه موردنظر خود را انتخاب کنید و رزروتان را ثبت کنید.
          </p>

          <Link
            href="/house-reserve"
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-primary500
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              hover:bg-primary600
            "
          >
            مشاهده اقامتگاه‌ها
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {reservations.map((reservation) => {
            const property = getProperty(reservation);

            const StatusIcon = getStatusIcon(reservation.status);

            return (
              <article
                key={reservation._id}
                className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-100
                    bg-background
                    p-5
                    shadow-sm
                    transition
                    hover:shadow-md
                    dark:border-[#353535]
                    dark:bg-[#272727]
                  "
              >
                <div className="flex flex-col gap-5 md:flex-row">
                  {/* Property Image */}
                  <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl md:w-64">
                    <img
                      src={property?.images?.[0] || "/images/galary1.png"}
                      alt={property?.title || "اقامتگاه"}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-lg font-bold text-foreground">
                          {property?.title || "اقامتگاه"}
                        </h2>

                        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 text-primary500" />

                          <span>
                            {property?.location?.city || "شهر ثبت نشده"}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`
                            inline-flex
                            w-fit
                            items-center
                            gap-1.5
                            rounded-full
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            ${getStatusClass(reservation.status)}
                          `}
                      >
                        <StatusIcon className="h-3.5 w-3.5" />

                        {getStatusLabel(reservation.status)}
                      </span>
                    </div>

                    {/* Reservation Info */}
                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-xl  p-3 bg-muted">
                        <p className="text-[11px] text-muted-foreground">
                          ورود
                        </p>

                        <p className="mt-1 text-sm font-semibold text-foreground">
                          {reservation.checkIn}
                        </p>
                      </div>

                      <div className="rounded-xl  p-3 bg-muted">
                        <p className="text-[11px] text-muted-foreground">
                          خروج
                        </p>

                        <p className="mt-1 text-sm font-semibold text-foreground">
                          {reservation.checkOut}
                        </p>
                      </div>

                      <div className="rounded-xl bg-[#F7F8FA] p-3 dark:bg-[#353535]">
                        <p className="text-[11px] text-muted-foreground">
                          تعداد شب
                        </p>

                        <p className="mt-1 text-sm font-semibold text-foreground">
                          {reservation.nights} شب
                        </p>
                      </div>

                      <div className="rounded-xl bg-[#F7F8FA] p-3 dark:bg-[#353535]">
                        <p className="text-[11px] text-muted-foreground">
                          مبلغ
                        </p>

                        <p className="mt-1 text-sm font-semibold text-primary500">
                          {formatAmount(reservation.amount || 0)} تومان
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4 border-border">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CreditCard className="h-4 w-4" />
                        {(reservation.passengers?.length ?? 0).toLocaleString(
                          "fa-IR",
                        )}{" "}
                        مسافر
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/account/reservations/${reservation._id}/edit`}
                          className="
    inline-flex
    items-center
    gap-1.5
    rounded-xl
    bg-blue-500
    px-4
    py-2
    text-xs
    font-medium
    text-white
    transition
    hover:bg-blue-600
  "
                        >
                          ویرایش
                        </Link>
                        <button
                          type="button"
                          disabled={deleteReservationMutation.isPending}
                          onClick={async () => {
                            const result = await Swal.fire({
                              title: "حذف رزرو",
                              text: "آیا از حذف این رزرو مطمئن هستید؟",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "بله، حذف شود",
                              cancelButtonText: "انصراف",
                              reverseButtons: true,
                            });

                            if (!result.isConfirmed) return;

                            deleteReservationMutation.mutate(reservation._id, {
                              onSuccess: () => {
                                Swal.fire({
                                  title: "حذف شد",
                                  text: "رزرو با موفقیت حذف شد",
                                  icon: "success",
                                  timer: 1500,
                                  showConfirmButton: false,
                                });
                              },

                              onError: (error) => {
                                Swal.fire({
                                  title: "خطا",
                                  text:
                                    error instanceof Error
                                      ? error.message
                                      : "حذف رزرو انجام نشد",
                                  icon: "error",
                                });
                              },
                            });
                          }}
                          className="
    inline-flex
    items-center
    gap-1.5
    rounded-xl
    bg-red-500
    px-4
    py-2
    text-xs
    font-medium
    text-white
    transition
    hover:bg-red-600
    disabled:opacity-50
  "
                        >
                          {deleteReservationMutation.isPending
                            ? "در حال حذف..."
                            : "حذف رزرو"}
                        </button>
                        <Link
                          href={`/account/reservations/${reservation._id}`}
                          className="
        inline-flex
        items-center
        gap-1.5
        rounded-xl
        bg-primary500
        px-4
        py-2
        text-xs
        font-medium
        text-white
        hover:bg-primary600
      "
                        >
                          مشاهده جزئیات
                          <ChevronLeft className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
