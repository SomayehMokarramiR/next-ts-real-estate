"use client";

import {
  ArrowRight,
  CalendarDays,
  Edit,
  Home,
  Mail,
  Phone,
  Trash2,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

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

interface Reservation {
  _id: string;

  userId?: ReservationUser | string;

  propertyId?: ReservationProperty | string;

  checkIn: string;

  checkOut: string;

  nights: number;

  amount: number;

  status: "pending" | "paid" | "cancelled";

  createdAt?: string;

  updatedAt?: string;
}

interface ReservationResponse {
  success: boolean;

  reservation: Reservation;

  message?: string;
}

// =========================
// GET RESERVATION
// =========================

async function getReservation(
  reservationId: string,
): Promise<ReservationResponse> {
  const response = await fetch(`/api/admin/reservations/${reservationId}`, {
    credentials: "include",
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "خطا در دریافت اطلاعات رزرو");
  }

  return data;
}

// =========================
// DELETE RESERVATION
// =========================

async function deleteReservation(reservationId: string) {
  const response = await fetch(`/api/admin/reservations/${reservationId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const text = await response.text();

  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(data.message || "خطا در حذف رزرو");
  }

  return data;
}
// =========================
// HELPERS
// =========================

function getUserName(user?: ReservationUser | string) {
  if (!user) return "-";

  if (typeof user === "string") {
    return user;
  }

  return `${user.name ?? ""} ${user.lastName ?? ""}`.trim() || "-";
}

function getPropertyTitle(property?: ReservationProperty | string) {
  if (!property) return "-";

  if (typeof property === "string") {
    return property;
  }

  return property.title || "-";
}

function getStatusLabel(status: Reservation["status"]) {
  if (status === "paid") {
    return "پرداخت شده";
  }

  if (status === "cancelled") {
    return "لغو شده";
  }

  return "در انتظار پرداخت";
}

function getStatusClass(status: Reservation["status"]) {
  if (status === "paid") {
    return "bg-green-500 text-white";
  }

  if (status === "cancelled") {
    return "bg-red-500 text-white";
  }

  return "bg-yellow-400 text-black";
}

function formatAmount(amount: number) {
  return `${Number(amount || 0).toLocaleString("fa-IR")} تومان`;
}

function toPersianNumber(value: string) {
  return value.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}
// =========================
// COMPONENT
// =========================

export default function ReservationDetailClient({
  reservationId,
}: {
  reservationId: string;
}) {
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);

  const { data, isLoading, isError, error } = useQuery<ReservationResponse>({
    queryKey: ["admin-reservation", reservationId],

    queryFn: () => getReservation(reservationId),

    enabled: Boolean(reservationId),
  });

  // =========================
  // LOADING
  // =========================

  if (isLoading) {
    return (
      <div dir="rtl" className="p-8 text-center text-gray-500">
        در حال دریافت اطلاعات رزرو...
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (isError || !data?.reservation) {
    return (
      <div dir="rtl" className="p-8">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm dark:bg-[#353535]">
          <p className="text-red-500">
            {error instanceof Error
              ? error.message
              : "خطا در دریافت اطلاعات رزرو"}
          </p>

          <Link
            href="/admin/reservations"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gray-200 px-4 py-2 dark:bg-[#444] dark:text-white"
          >
            <ArrowRight size={18} />
            بازگشت به رزروها
          </Link>
        </div>
      </div>
    );
  }

  const reservation = data.reservation;

  const user =
    typeof reservation.userId === "object" ? reservation.userId : undefined;

  const property =
    typeof reservation.propertyId === "object"
      ? reservation.propertyId
      : undefined;

  // =========================
  // DELETE
  // =========================

  async function handleDelete() {
    if (deleting) return;

    const result = await Swal.fire({
      icon: "warning",
      title: "حذف رزرو",
      text: "آیا از حذف این رزرو مطمئن هستید؟",
      showCancelButton: true,
      confirmButtonText: "بله، حذف شود",
      cancelButtonText: "انصراف",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) {
      return;
    }

    setDeleting(true);

    try {
      await deleteReservation(reservationId);

      await Swal.fire({
        icon: "success",
        title: "موفق شد",
        text: "رزرو با موفقیت حذف شد",
        confirmButtonText: "باشه",
      });

      router.push("/admin/reservations");

      router.refresh();
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "خطا",
        text: error instanceof Error ? error.message : "خطا در حذف رزرو",
        confirmButtonText: "باشه",
      });
    } finally {
      setDeleting(false);
    }
  }

  // =========================
  // RENDER
  // =========================

  return (
    <div dir="rtl" className="w-full p-6">
      {/* HEADER */}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">جزئیات رزرو</h1>

          <p className="mt-2 text-sm text-gray-500">مشاهده اطلاعات کامل رزرو</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/reservations"
            className="flex items-center gap-2 rounded-xl bg-gray-200 px-4 py-2 dark:bg-[#444] dark:text-white"
          >
            <ArrowRight size={18} />
            بازگشت
          </Link>

          <Link
            href={`/admin/reservations/${reservationId}/edit`}
            className="flex items-center gap-2 rounded-xl bg-primary500 px-4 py-2 text-white"
          >
            <Edit size={18} />
            ویرایش
          </Link>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={18} />

            {deleting ? "در حال حذف..." : "حذف"}
          </button>
        </div>
      </div>

      {/* STATUS */}

      <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm dark:bg-[#353535]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-gray-500">وضعیت رزرو</p>

            <span
              className={`mt-2 inline-block rounded-full px-4 py-2 text-sm font-medium ${getStatusClass(
                reservation.status,
              )}`}
            >
              {getStatusLabel(reservation.status)}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-500">مبلغ کل</p>

            <p className="mt-2 text-xl font-bold dark:text-white">
              {formatAmount(reservation.amount)}
            </p>
          </div>
        </div>
      </div>

      {/* USER + PROPERTY */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* USER */}

        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#353535]">
          <div className="mb-5 flex items-center gap-2">
            <User size={20} />

            <h2 className="text-lg font-semibold dark:text-white">
              اطلاعات کاربر
            </h2>
          </div>

          <div className="space-y-4">
            <InfoRow
              icon={<User size={17} />}
              label="نام"
              value={getUserName(reservation.userId)}
            />

            <InfoRow
              icon={<Mail size={17} />}
              label="ایمیل"
              value={user?.email || "-"}
            />

            <InfoRow
              icon={<Phone size={17} />}
              label="شماره تماس"
              value={user?.phoneNumber || "-"}
            />
          </div>
        </div>

        {/* PROPERTY */}

        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#353535]">
          <div className="mb-5 flex items-center gap-2">
            <Home size={20} />

            <h2 className="text-lg font-semibold dark:text-white">
              اطلاعات ملک
            </h2>
          </div>

          <div className="space-y-4">
            <InfoRow
              icon={<Home size={17} />}
              label="عنوان ملک"
              value={getPropertyTitle(reservation.propertyId)}
            />

            <InfoRow
              icon={<Home size={17} />}
              label="شهر"
              value={property?.location?.city || "-"}
            />

            <InfoRow
              icon={<Home size={17} />}
              label="آدرس"
              value={property?.location?.address || "-"}
            />
          </div>
        </div>
      </div>

      {/* RESERVATION INFO */}

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm dark:bg-[#353535]">
        <div className="mb-5 flex items-center gap-2">
          <CalendarDays size={20} />

          <h2 className="text-lg font-semibold dark:text-white">
            اطلاعات رزرو
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <InfoBox
            label="تاریخ ورود"
            value={toPersianNumber(reservation.checkIn || "-")}
          />

          <InfoBox
            label="تاریخ خروج"
            value={toPersianNumber(reservation.checkOut || "-")}
          />

          <InfoBox label="تعداد شب" value={`${reservation.nights ?? 0} شب`} />
        </div>
      </div>

      {/* META */}

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm dark:bg-[#353535]">
        <div className="grid gap-5 md:grid-cols-2">
          <InfoBox label="شناسه رزرو" value={reservation._id} />

          <InfoBox
            label="تاریخ ثبت"
            value={
              reservation.createdAt
                ? new Date(reservation.createdAt).toLocaleString("fa-IR")
                : "-"
            }
          />
        </div>
      </div>
    </div>
  );
}

// =========================
// INFO ROW
// =========================

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-gray-500">{icon}</div>

      <div>
        <p className="text-xs text-gray-500">{label}</p>

        <p className="mt-1 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

// =========================
// INFO BOX
// =========================

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-gray-50 p-4 dark:bg-[#444]">
      <p className="text-xs text-gray-500">{label}</p>

      <p className="mt-2 break-all font-medium dark:text-white">{value}</p>
    </div>
  );
}
