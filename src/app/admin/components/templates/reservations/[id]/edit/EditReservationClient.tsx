"use client";

import { ArrowRight, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toGregorian } from "jalaali-js";
import { PersianDateInput } from "@/app/admin/components/module/PersianDateInput";
import { jalaliToDate } from "@/app/lib/reservation/dateUtils";

// =============================
// TYPES
// =============================

interface EditReservationForm {
  userId: string;

  propertyId: string;

  checkIn: string;

  checkOut: string;

  nights: number;

  amount: number;

  status: "pending" | "paid" | "cancelled";
}

interface UserItem {
  _id: string;

  name: string;

  lastName: string;
}

interface PropertyItem {
  _id: string;

  title: string;
}

// =============================
// RESERVATION RESPONSE
// =============================

interface ReservationResponse {
  success: boolean;

  reservation: {
    _id: string;

    userId:
      | string
      | {
          _id: string;
        };

    propertyId:
      | string
      | {
          _id: string;
        };

    checkIn: string;

    checkOut: string;

    nights: number;

    amount: number;

    status: "pending" | "paid" | "cancelled";
  };
}

// =============================
// API
// =============================

async function getReservation(id: string) {
  const res = await fetch(`/api/admin/reservations/${id}`, {
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "خطا در دریافت رزرو");
  }

  return data as ReservationResponse;
}

async function getUsers() {
  const res = await fetch("/api/admin/users?limit=100", {
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "خطا در دریافت کاربران");
  }

  return data.users as UserItem[];
}

async function getProperties() {
  const res = await fetch("/api/admin/properties?limit=100", {
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "خطا در دریافت املاک");
  }

  return data.properties as PropertyItem[];
}

async function updateReservation(id: string, data: EditReservationForm) {
  const res = await fetch(`/api/admin/reservations/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "خطا در ویرایش رزرو");
  }

  return result;
}
// =============================
// DATE HELPERS
// =============================
function normalizePersianNumber(value: string) {
  return value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
}

function normalizeDateForPicker(value: string) {
  if (!value) return "";

  const clean = normalizePersianNumber(value).split("T")[0].trim();

  const parts = clean.split("/");

  if (parts.length !== 3) {
    return "";
  }

  const year = parts[0].padStart(4, "0");

  const month = parts[1].padStart(2, "0");

  const day = parts[2].padStart(2, "0");

  return `${year}/${month}/${day}`;
}
// دقیقا مثل Create
function convertJalaliToDate(value: string) {
  if (!value) return null;

  const clean = normalizePersianNumber(value);

  const parts = clean.split("/");

  if (parts.length !== 3) {
    return null;
  }

  const year = Number(parts[0]);

  const month = Number(parts[1]);

  const day = Number(parts[2]);

  if (!year || !month || !day) {
    return null;
  }

  const result = toGregorian(year, month, day);

  return new Date(result.gy, result.gm - 1, result.gd);
}

function calculateNights(checkIn: string, checkOut: string) {
  const start = jalaliToDate(checkIn);
  const end = jalaliToDate(checkOut);

  const diff = end.getTime() - start.getTime();

  const nights = Math.round(diff / (1000 * 60 * 60 * 24));

  return nights > 0 ? nights : 1;
}
// =============================
// COMPONENT
// =============================

export default function EditReservationClient({
  reservationId,
}: {
  reservationId: string;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [users, setUsers] = useState<UserItem[]>([]);

  const [properties, setProperties] = useState<PropertyItem[]>([]);

  const [form, setForm] = useState<EditReservationForm>({
    userId: "",

    propertyId: "",

    checkIn: "",

    checkOut: "",

    nights: 0,

    amount: 0,

    status: "pending",
  });

  // =============================
  // LOAD DATA
  // =============================

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true);

        const [reservationData, usersData, propertiesData] = await Promise.all([
          getReservation(reservationId),

          getUsers(),

          getProperties(),
        ]);

        if (!active) return;

        setUsers(usersData);

        setProperties(propertiesData);

        const reservation = reservationData.reservation;

        console.log("RAW CHECKIN:", reservation.checkIn);
        console.log("RAW CHECKOUT:", reservation.checkOut);

        const userId =
          typeof reservation.userId === "string"
            ? reservation.userId
            : reservation.userId._id;

        const propertyId =
          typeof reservation.propertyId === "string"
            ? reservation.propertyId
            : reservation.propertyId._id;

        setForm({
          userId,
          propertyId,

          checkIn: reservation.checkIn ? reservation.checkIn.split("T")[0] : "",

          checkOut: reservation.checkOut
            ? reservation.checkOut.split("T")[0]
            : "",

          nights: reservation.nights || 0,

          amount: reservation.amount || 0,

          status: reservation.status,
        });
      } catch (error) {
        if (active) {
          setError(
            error instanceof Error ? error.message : "خطا در دریافت اطلاعات",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [reservationId]);
  // =============================
  // UPDATE FIELD
  // =============================

  function updateField<K extends keyof EditReservationForm>(
    field: K,
    value: EditReservationForm[K],
  ) {
    setForm((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      };

      if (field === "checkIn" || field === "checkOut") {
        updated.nights = calculateNights(updated.checkIn, updated.checkOut);
      }

      return updated;
    });
  }

  //========================
  function changeDate(field: "checkIn" | "checkOut", value: string) {
    setForm((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      };

      updated.nights = calculateNights(updated.checkIn, updated.checkOut);

      return updated;
    });
  }
  // =============================
  // SUBMIT
  // =============================

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSaving(true);

      await updateReservation(reservationId, form);

      await Swal.fire({
        icon: "success",

        title: "موفق شد",

        text: "رزرو ویرایش شد",

        confirmButtonText: "باشه",
      });

      router.push(`/admin/reservations/${reservationId}`);

      router.refresh();
    } catch (error) {
      Swal.fire({
        icon: "error",

        title: "خطا",

        text: error instanceof Error ? error.message : "خطا در ذخیره",
      });
    } finally {
      setSaving(false);
    }
  }

  // =============================
  // LOADING
  // =============================

  if (loading) {
    return (
      <div dir="rtl" className="p-8 text-center">
        در حال دریافت اطلاعات رزرو...
      </div>
    );
  }

  if (error) {
    return (
      <div
        dir="rtl"
        className="
   p-8
   text-center
   text-red-500
   "
      >
        {error}
      </div>
    );
  }

  return (
    <div dir="rtl" className="w-full p-6">
      <div
        className="
 mb-6
 flex
 justify-between
 items-center
 "
      >
        <h1
          className="
 text-2xl
 font-bold
 dark:text-white
 "
        >
          ویرایش رزرو
        </h1>

        <Link
          href={`/admin/reservations/${reservationId}`}
          className="
flex
gap-2
rounded-xl
bg-gray-200
px-4
py-2
"
        >
          <ArrowRight size={18} />
          بازگشت
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="
space-y-6
rounded-2xl
bg-white
p-6
shadow
dark:bg-[#353535]
"
      >
        <div
          className="
grid
md:grid-cols-2
gap-5
"
        >
          <SelectInput
            label="کاربر"
            value={form.userId}
            onChange={(e) => updateField("userId", e.target.value)}
            options={users.map((user) => ({
              value: user._id,

              label: `${user.name} ${user.lastName}`,
            }))}
          />

          <SelectInput
            label="ملک"
            value={form.propertyId}
            onChange={(e) => updateField("propertyId", e.target.value)}
            options={properties.map((property) => ({
              value: property._id,

              label: property.title,
            }))}
          />
        </div>
        <div
          className="
grid
md:grid-cols-2
gap-5
"
        >
          <PersianDateInput
            label="تاریخ ورود"
            value={form.checkIn}
            onChange={(value) => changeDate("checkIn", value)}
          />

          <PersianDateInput
            label="تاریخ خروج"
            value={form.checkOut}
            onChange={(value) => changeDate("checkOut", value)}
          />
        </div>

        <div
          className="
grid
md:grid-cols-3
gap-5
"
        >
          <Input label="تعداد شب" value={form.nights} readOnly />

          <Input
            label="مبلغ نهایی"
            type="number"
            value={form.amount}
            onChange={(e) => updateField("amount", Number(e.target.value) || 0)}
          />

          <SelectInput
            label="وضعیت"
            value={form.status}
            onChange={(e) =>
              updateField(
                "status",

                e.target.value as EditReservationForm["status"],
              )
            }
            options={[
              {
                value: "pending",

                label: "در انتظار پرداخت",
              },

              {
                value: "paid",

                label: "پرداخت شده",
              },

              {
                value: "cancelled",

                label: "لغو شده",
              },
            ]}
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="
flex
items-center
gap-2
rounded-xl
bg-primary500
px-5
py-3
text-white
disabled:opacity-50
"
        >
          <Save size={18} />

          {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </form>
    </div>
  );
}

// =============================
// INPUT
// =============================

function Input({
  label,

  value,

  onChange,

  readOnly = false,

  type = "text",
}: {
  label: string;

  value: string | number;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  readOnly?: boolean;

  type?: string;
}) {
  return (
    <div>
      <label
        className="
mb-2
block
dark:text-white
"
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        className="
w-full
rounded-xl
border
border-gray-300
p-3
outline-none
dark:border-gray-600
dark:bg-[#444]
dark:text-white
"
      />
    </div>
  );
}

// =============================
// SELECT
// =============================

function SelectInput({
  label,

  value,

  onChange,

  options,
}: {
  label: string;

  value: string;

  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

  options: {
    value: string;
    label: string;
  }[];
}) {
  return (
    <div>
      <label
        className="
mb-2
block
dark:text-white
"
      >
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="
w-full
rounded-xl
border
p-3
dark:bg-[#444]
dark:text-white
"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
