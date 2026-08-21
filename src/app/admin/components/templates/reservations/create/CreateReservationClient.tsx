"use client";

import { ArrowRight, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toGregorian } from "jalaali-js";
import { PersianDateInput } from "../../../module/PersianDateInput";

// =========================
// TYPES
// =========================

type ReservationStatus = "pending" | "paid" | "cancelled";

interface UserItem {
  _id: string;

  name?: string;

  lastName?: string;
}

interface PropertyItem {
  _id: string;

  title?: string;

  location?: {
    city?: string;
  };
}

interface CreateReservationForm {
  userId: string;

  propertyId: string;

  checkIn: string;

  checkOut: string;

  nights: number;

  amount: number;

  status: ReservationStatus;
}

// =========================
// USERS API
// =========================

async function getUsers(): Promise<UserItem[]> {
  const res = await fetch("/api/admin/users?limit=100", {
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "خطا در دریافت کاربران");
  }

  return data.users;
}

// =========================
// PROPERTIES API
// =========================

async function getProperties(): Promise<PropertyItem[]> {
  const res = await fetch("/api/admin/properties?limit=100", {
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "خطا در دریافت املاک");
  }

  return data.properties;
}

// =========================
// CREATE API
// =========================

async function createReservation(data: CreateReservationForm) {
  const res = await fetch("/api/admin/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const text = await res.text();

  let result;

  try {
    result = text ? JSON.parse(text) : {};
  } catch {
    throw new Error("پاسخ نامعتبر از سرور دریافت شد");
  }

  if (!res.ok) {
    throw new Error(result.message || "خطا در ایجاد رزرو");
  }

  return result;
}
//======================
function toPersianNumber(value: string) {
  return value.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}
// =========================
// JALALI TO DATE
// =========================

function convertJalaliToDate(value: string) {
  if (!value) return null;

  const clean = value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

  const parts = clean.split("/");

  if (parts.length !== 3) return null;

  let year;
  let month;
  let day;

  // اگر فرمت روز/ماه/سال بود
  if (parts[0].length <= 2) {
    day = Number(parts[0]);
    month = Number(parts[1]);
    year = Number(parts[2]);
  }
  // اگر فرمت سال/ماه/روز بود
  else {
    year = Number(parts[0]);
    month = Number(parts[1]);
    day = Number(parts[2]);
  }

  if (!year || !month || !day) {
    return null;
  }

  const result = toGregorian(year, month, day);

  return new Date(result.gy, result.gm - 1, result.gd);
}
// =========================
// CALCULATE NIGHTS
// =========================

function calculateNights(checkIn: string, checkOut: string) {
  const start = convertJalaliToDate(checkIn);

  const end = convertJalaliToDate(checkOut);

  if (!start || !end) {
    return 0;
  }

  const diff = end.getTime() - start.getTime();

  const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));

  return nights > 0 ? nights : 0;
}

// =========================
// USER LABEL
// =========================

function getUserLabel(user: UserItem) {
  const name = `${user.name ?? ""} ${user.lastName ?? ""}`.trim();

  return name || "بدون نام";
}

//==================
function normalizePersianDate(value: string) {
  if (!value) return "";

  return value
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/-/g, "/")
    .trim();
}
// =========================
// COMPONENT
// =========================

export default function CreateReservationClient() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<CreateReservationForm>({
    userId: "",

    propertyId: "",

    checkIn: "",

    checkOut: "",

    nights: 0,

    amount: 0,

    status: "pending",
  });

  // =========================
  // USERS
  // =========================

  const { data: users = [], isLoading: usersLoading } = useQuery<UserItem[]>({
    queryKey: ["admin-users-reservation"],

    queryFn: getUsers,
  });

  // =========================
  // PROPERTIES
  // =========================

  const { data: properties = [], isLoading: propertiesLoading } = useQuery<
    PropertyItem[]
  >({
    queryKey: ["admin-properties-reservation"],

    queryFn: getProperties,
  });

  // =========================
  // UPDATE FIELD
  // =========================

  function updateField<K extends keyof CreateReservationForm>(
    field: K,
    value: CreateReservationForm[K],
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

  // =========================
  // SUBMIT
  // =========================

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (saving) return;

    if (!form.userId) {
      await Swal.fire({
        icon: "warning",
        title: "کاربر را انتخاب کنید",
        confirmButtonText: "باشه",
      });
      return;
    }

    if (!form.propertyId) {
      await Swal.fire({
        icon: "warning",
        title: "ملک را انتخاب کنید",
        confirmButtonText: "باشه",
      });
      return;
    }

    if (!form.checkIn || !form.checkOut) {
      await Swal.fire({
        icon: "warning",
        title: "تاریخ ورود و خروج را وارد کنید",
        confirmButtonText: "باشه",
      });
      return;
    }

    if (form.nights <= 0) {
      await Swal.fire({
        icon: "warning",
        title: "تعداد شب معتبر نیست",
        text: "تاریخ خروج باید بعد از تاریخ ورود باشد",
        confirmButtonText: "باشه",
      });
      return;
    }

    if (form.amount <= 0) {
      await Swal.fire({
        icon: "warning",
        title: "مبلغ را وارد کنید",
        confirmButtonText: "باشه",
      });
      return;
    }

    try {
      setSaving(true);

      const payload: CreateReservationForm = {
        userId: form.userId,
        propertyId: form.propertyId,

        checkIn: normalizePersianDate(form.checkIn),
        checkOut: normalizePersianDate(form.checkOut),

        nights: form.nights,
        amount: form.amount,
        status: form.status,
      };

      console.log("SEND RESERVATION:", payload);

      const result = await createReservation(payload);

      await Swal.fire({
        icon: "success",
        title: "موفق شد",
        text: result.message || "رزرو با موفقیت ایجاد شد",
        confirmButtonText: "باشه",
      });

      if (result.reservation?._id) {
        router.push(`/admin/reservations/${result.reservation._id}`);
      } else {
        router.push("/admin/reservations");
      }

      router.refresh();
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "خطا",
        text: error instanceof Error ? error.message : "خطا در ایجاد رزرو",
        confirmButtonText: "باشه",
      });
    } finally {
      setSaving(false);
    }
  }
  // =========================
  // RENDER
  // =========================

  return (
    <div dir="rtl" className="w-full p-6">
      {/* HEADER */}

      <div
        className="
 mb-6
 flex
 items-center
 justify-between
 "
      >
        <div>
          <h1
            className="
text-2xl
font-bold
dark:text-white
"
          >
            ایجاد رزرو جدید
          </h1>

          <p
            className="
mt-2
text-sm
text-gray-500
"
          >
            ثبت رزرو جدید توسط مدیر
          </p>
        </div>

        <Link
          href="/admin/reservations"
          className="
flex
items-center
gap-2
rounded-xl
bg-gray-200
px-4
py-2
dark:bg-[#444]
dark:text-white
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
shadow-sm
dark:bg-[#353535]
"
      >
        {/* USER + PROPERTY */}

        <div
          className="
grid
gap-5
md:grid-cols-2
"
        >
          {/* USER */}

          <div>
            <label
              className="
mb-2
block
text-sm
dark:text-white
"
            >
              انتخاب کاربر
            </label>

            <select
              value={form.userId}
              onChange={(e) => updateField("userId", e.target.value)}
              disabled={usersLoading}
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
            >
              <option value="">
                {usersLoading ? "در حال دریافت کاربران..." : "انتخاب کاربر"}
              </option>

              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {getUserLabel(user)}
                </option>
              ))}
            </select>
          </div>

          {/* PROPERTY */}

          <div>
            <label
              className="
mb-2
block
text-sm
dark:text-white
"
            >
              انتخاب ملک
            </label>

            <select
              value={form.propertyId}
              onChange={(e) => updateField("propertyId", e.target.value)}
              disabled={propertiesLoading}
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
            >
              <option value="">
                {propertiesLoading ? "در حال دریافت املاک..." : "انتخاب ملک"}
              </option>

              {properties.map((property) => (
                <option key={property._id} value={property._id}>
                  {property.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* DATES */}

        <div
          className="
 grid
 gap-5
 md:grid-cols-2
 "
        >
          <PersianDateInput
            label="تاریخ ورود"
            value={form.checkIn}
            onChange={(value) => updateField("checkIn", value)}
          />

          <PersianDateInput
            label="تاریخ خروج"
            value={form.checkOut}
            onChange={(value) => updateField("checkOut", value)}
          />
        </div>

        {/* INFO */}

        <div
          className="
grid
gap-5
md:grid-cols-3
"
        >
          <Input label="تعداد شب" type="number" value={form.nights} readOnly />

          <Input
            label="مبلغ کل (تومان)"
            type="number"
            value={form.amount}
            onChange={(e) => updateField("amount", Number(e.target.value) || 0)}
          />

          <SelectInput
            label="وضعیت"
            value={form.status}
            onChange={(e) =>
              updateField("status", e.target.value as ReservationStatus)
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

        {/* SUBMIT */}

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
transition
hover:opacity-90
disabled:opacity-50
"
        >
          <Save size={18} />

          {saving ? "در حال ایجاد..." : "ایجاد رزرو"}
        </button>
      </form>
    </div>
  );
}

// =========================
// INPUT
// =========================

function Input({
  label,

  value,

  type = "text",

  placeholder,

  readOnly = false,

  onChange,
}: {
  label: string;

  value: string | number;

  type?: string;

  placeholder?: string;

  readOnly?: boolean;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const isDate = label.includes("تاریخ");

  return (
    <div>
      <label
        className="
mb-2
block
text-sm
dark:text-white
"
      >
        {label}
      </label>

      <input
        type={type}
        value={String(value)}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={onChange}
        dir={isDate ? "ltr" : "rtl"}
        className={`
    w-full
    rounded-xl
    border
    border-gray-300
    p-3
    outline-none
    focus:border-primary500
    dark:border-gray-600
    dark:bg-[#444]
    dark:text-white
    ${readOnly ? "cursor-not-allowed opacity-70" : ""}
  `}
      />
    </div>
  );
}

// =========================
// SELECT
// =========================

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
text-sm
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
border-gray-300
p-3
outline-none
focus:border-primary500
dark:border-gray-600
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
