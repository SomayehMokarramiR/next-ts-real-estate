"use client";

import { ArrowRight, Save, X } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

import { useAdminCreateProperty } from "@/hooks/useAdminCreateProperty";
import type { CreateAdminPropertyPayload } from "@/services/adminPropertyService";

// =========================
// PROPERTY TYPES
// =========================

type PropertyType =
  | "apartment"
  | "villa"
  | "house"
  | "hotel"
  | "suite"
  | "land"
  | "office"
  | "commercial";

type TransactionType = "rent" | "mortgage" | "rent-mortgage" | "sale";

type PropertyStatus = "available" | "reserved" | "inactive";

type BookingType = "daily" | "none";

// =========================
// FORM TYPE
// =========================

type CreatePropertyForm = {
  title: string;

  description: string;

  type: PropertyType | "";

  transactionType: TransactionType | "";

  status: PropertyStatus;

  bookingType: BookingType;

  city: string;

  address: string;

  images: string[];

  area: string;

  sale: string;

  monthly: string;

  mortgage: string;

  bedrooms: string;

  bathrooms: boolean;

  capacity: string;

  parking: boolean;

  pool: boolean;
};

// =========================
// COMPONENT
// =========================

export default function CreatePropertyClient() {
  const router = useRouter();

  const createMutation = useAdminCreateProperty();

  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<CreatePropertyForm>({
    title: "",

    description: "",

    type: "",

    transactionType: "",

    status: "available",

    bookingType: "none",

    city: "",

    address: "",

    images: [],

    area: "",

    sale: "",

    monthly: "",

    mortgage: "",

    bedrooms: "",

    bathrooms: false,

    capacity: "",

    parking: false,

    pool: false,
  });

  // =========================
  // GENERAL CHANGE
  // =========================

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]: value,
    }));
  }

  // =========================
  // PROPERTY TYPE
  // =========================

  function handlePropertyTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as PropertyType | "";

    setForm((prev) => ({
      ...prev,

      type: value,
    }));
  }

  // =========================
  // STATUS
  // =========================

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as PropertyStatus;

    setForm((prev) => ({
      ...prev,

      status: value,
    }));
  }

  // =========================
  // BOOKING TYPE
  // =========================

  function handleBookingTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as BookingType;

    setForm((prev) => ({
      ...prev,

      bookingType: value,
    }));
  }

  // =========================
  // TRANSACTION TYPE
  // =========================

  function handleTransactionTypeChange(
    e: React.ChangeEvent<HTMLSelectElement>,
  ) {
    const transactionType = e.target.value as TransactionType | "";

    setForm((prev) => ({
      ...prev,

      transactionType,

      sale: transactionType === "sale" ? prev.sale : "",

      monthly:
        transactionType === "rent" || transactionType === "rent-mortgage"
          ? prev.monthly
          : "",

      mortgage:
        transactionType === "mortgage" || transactionType === "rent-mortgage"
          ? prev.mortgage
          : "",
    }));
  }

  // =========================
  // BOOLEAN CHANGE
  // =========================

  function handleBooleanChange(
    field: "parking" | "pool" | "bathrooms",

    value: boolean,
  ) {
    setForm((prev) => ({
      ...prev,

      [field]: value,
    }));
  }

  // =========================
  // IMAGE UPLOAD
  // =========================

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);

    if (!files.length) return;

    setUploading(true);

    try {
      const urls: string[] = [];

      for (const file of files) {
        const formData = new FormData();

        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok || !data.success || !data.url) {
          throw new Error(data.message || "خطا در آپلود تصویر");
        }

        urls.push(data.url);
      }

      setForm((prev) => ({
        ...prev,

        images: [...prev.images, ...urls],
      }));
    } catch (error) {
      Swal.fire({
        icon: "error",

        title: "خطا در آپلود تصویر",

        text: error instanceof Error ? error.message : "خطا",
      });
    } finally {
      setUploading(false);

      e.target.value = "";
    }
  }
  // =========================
  // REMOVE IMAGE
  // =========================

  function removeImage(index: number) {
    setForm((prev) => ({
      ...prev,

      images: prev.images.filter((_, i) => i !== index),
    }));
  }

  // =========================
  // HELPERS
  // =========================

  const isSale = form.transactionType === "sale";

  const isRent = form.transactionType === "rent";

  const isMortgage = form.transactionType === "mortgage";

  const isRentMortgage = form.transactionType === "rent-mortgage";

  // =========================
  // SUBMIT
  // =========================

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (uploading) return;

    if (createMutation.isPending) return;

    if (!form.title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "عنوان ملک را وارد کنید",
      });

      return;
    }

    if (!form.type) {
      Swal.fire({
        icon: "warning",
        title: "نوع ملک را انتخاب کنید",
      });

      return;
    }

    if (!form.transactionType) {
      Swal.fire({
        icon: "warning",
        title: "نوع معامله را انتخاب کنید",
      });

      return;
    }

    if (!form.city.trim()) {
      Swal.fire({
        icon: "warning",
        title: "شهر را وارد کنید",
      });

      return;
    }

    // =========================
    // PRICE VALIDATION
    // =========================

    if (isSale && !form.sale.trim()) {
      Swal.fire({
        icon: "warning",
        title: "قیمت فروش را وارد کنید",
      });

      return;
    }

    if ((isRent || isRentMortgage) && !form.monthly.trim()) {
      Swal.fire({
        icon: "warning",
        title: "اجاره ماهانه را وارد کنید",
      });

      return;
    }

    if ((isMortgage || isRentMortgage) && !form.mortgage.trim()) {
      Swal.fire({
        icon: "warning",
        title: "مبلغ رهن را وارد کنید",
      });

      return;
    }

    const payload: CreateAdminPropertyPayload = {
      title: form.title.trim(),

      description: form.description.trim(),

      type: form.type as PropertyType,

      transactionType: form.transactionType as TransactionType,

      status: form.status,

      bookingType: form.bookingType,

      location: {
        city: form.city.trim(),

        address: form.address.trim(),
      },

      images: form.images,

      area: Number(form.area.replace(/\D/g, "")) || 0,

      pricing: {
        sale: isSale ? Number(form.sale.replace(/\D/g, "")) || 0 : 0,

        monthly:
          isRent || isRentMortgage
            ? Number(form.monthly.replace(/\D/g, "")) || 0
            : 0,

        mortgage:
          isMortgage || isRentMortgage
            ? Number(form.mortgage.replace(/\D/g, "")) || 0
            : 0,

        daily: 0,
      },

      facilities: {
        bedrooms: Number(form.bedrooms) || 0,
        bathrooms: Number(form.bathrooms) || 0,
        capacity: Number(form.capacity) || 0,
        parking: form.parking,
        pool: form.pool,
      },
    };

    console.log("FINAL CREATE PAYLOAD", payload);

    createMutation.mutate(payload, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",

          title: "موفق شد",

          text: "ملک ذخیره شد",

          confirmButtonText: "باشه",
        }).then(() => {
          router.push("/admin/properties");
        });
      },

      onError: (error) => {
        Swal.fire({
          icon: "error",

          title: "خطا",

          text: error instanceof Error ? error.message : "خطا در ذخیره ملک",
        });
      },
    });
  }

  // =========================
  // RENDER
  // =========================

  return (
    <div dir="rtl" className="w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">
            افزودن ملک جدید
          </h1>

          <p className="mt-2 text-sm text-gray-500">ایجاد ملک جدید</p>
        </div>

        <Link
          href="/admin/properties"
          className="
 flex items-center gap-2
 rounded-xl bg-gray-200
 px-4 py-2
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
        <Input
          label="عنوان ملک"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <SelectInput
          label="نوع ملک"
          value={form.type}
          onChange={handlePropertyTypeChange}
          options={[
            {
              value: "apartment",
              label: "آپارتمان",
            },
            {
              value: "villa",
              label: "ویلا",
            },
            {
              value: "house",
              label: "خانه",
            },
            {
              value: "hotel",
              label: "هتل",
            },
            {
              value: "suite",
              label: "سوئیت",
            },
            {
              value: "land",
              label: "زمین",
            },
            {
              value: "office",
              label: "اداری",
            },
            {
              value: "commercial",
              label: "تجاری",
            },
          ]}
        />

        <SelectInput
          label="نوع معامله"
          value={form.transactionType}
          onChange={handleTransactionTypeChange}
          options={[
            {
              value: "sale",
              label: "فروش",
            },
            {
              value: "rent",
              label: "اجاره",
            },
            {
              value: "mortgage",
              label: "رهن",
            },
            {
              value: "rent-mortgage",
              label: "رهن و اجاره",
            },
          ]}
        />

        <SelectInput
          label="نوع رزرو"
          value={form.bookingType}
          onChange={handleBookingTypeChange}
          options={[
            {
              value: "daily",
              label: "رزرو روزانه",
            },
            {
              value: "none",
              label: "بدون رزرو",
            },
          ]}
        />

        <SelectInput
          label="وضعیت"
          value={form.status}
          onChange={handleStatusChange}
          options={[
            {
              value: "available",
              label: "فعال",
            },
            {
              value: "reserved",
              label: "رزرو شده",
            },
            {
              value: "inactive",
              label: "غیرفعال",
            },
          ]}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="شهر"
            name="city"
            value={form.city}
            onChange={handleChange}
          />

          <Input
            label="آدرس"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <Input
          label="متراژ"
          name="area"
          value={form.area}
          onChange={handleChange}
        />

        <div>
          <h2 className="mb-4 text-lg font-semibold dark:text-white">
            اطلاعات قیمت
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <Input
              label="قیمت فروش"
              name="sale"
              value={form.sale}
              disabled={!isSale}
              onChange={handleChange}
            />

            <Input
              label="اجاره ماهانه"
              name="monthly"
              value={form.monthly}
              disabled={!isRent && !isRentMortgage}
              onChange={handleChange}
            />

            <Input
              label="رهن"
              name="mortgage"
              value={form.mortgage}
              disabled={!isMortgage && !isRentMortgage}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* DESCRIPTION */}
        <div>
          <label className="mb-2 block text-sm dark:text-white">توضیحات</label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="
              min-h-32
              w-full
              rounded-xl
              border
              p-3
              outline-none
              focus:border-primary500
              dark:bg-[#444]
              dark:text-white
            "
          />
        </div>

        {/* IMAGES */}
        <div>
          <label className="mb-3 block dark:text-white">تصاویر ملک</label>

          <input
            type="file"
            accept="image/*"
            multiple
            disabled={uploading}
            onChange={handleImageChange}
          />

          {uploading && (
            <p className="mt-2 text-sm text-gray-500">در حال آپلود تصاویر...</p>
          )}

          <div
            className="
              mt-4
              grid
              gap-4
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
            "
          >
            {form.images.map((img, index) => (
              <div
                key={`${img}-${index}`}
                className="relative overflow-hidden rounded-xl"
              >
                <img
                  src={img}
                  alt={`تصویر ${index + 1}`}
                  className="
                    h-32
                    w-full
                    rounded-xl
                    object-cover
                  "
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="
                    absolute
                    right-2
                    top-2
                    rounded-full
                    bg-white
                    p-1
                    text-red-500
                    shadow
                  "
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={createMutation.isPending || uploading}
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

          {createMutation.isPending
            ? "در حال ذخیره..."
            : uploading
              ? "در حال آپلود..."
              : "ذخیره ملک"}
        </button>
      </form>
    </div>
  );
}

/* =========================
   INPUT
========================= */

function Input({
  label,
  name,
  value,
  type = "text",
  disabled = false,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  type?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm dark:text-white">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="
          w-full
          rounded-xl
          border
          p-3
          outline-none
          focus:border-primary500
          disabled:bg-gray-100
          dark:bg-[#444]
          dark:text-white
        "
      />
    </div>
  );
}

/* =========================
   SELECT
========================= */

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
      <label className="mb-2 block text-sm dark:text-white">{label}</label>

      <select
        value={value}
        onChange={onChange}
        className="
          w-full
          rounded-xl
          border
          p-3
          outline-none
          focus:border-primary500
          dark:bg-[#444]
          dark:text-white
        "
      >
        <option value="">انتخاب کنید</option>

        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
