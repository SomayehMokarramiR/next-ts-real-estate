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

// =========================
// FORM TYPE
// =========================

type CreatePropertyForm = {
  title: string;
  description: string;

  type: PropertyType | "";

  status: PropertyStatus;

  transactionType: TransactionType | "";

  city: string;
  address: string;

  images: string[];

  area: string;

  sale: string;
  monthly: string;
  mortgage: string;

  bedrooms: string;
  bathrooms: string;
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

    status: "available",

    transactionType: "",

    city: "",
    address: "",

    images: [],

    area: "",

    sale: "",
    monthly: "",
    mortgage: "",

    bedrooms: "",
    bathrooms: "",
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
  // PROPERTY TYPE CHANGE
  // =========================

  function handlePropertyTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as PropertyType | "";

    setForm((prev) => ({
      ...prev,
      type: value,
    }));
  }

  // =========================
  // STATUS CHANGE
  // =========================

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as PropertyStatus;

    setForm((prev) => ({
      ...prev,
      status: value,
    }));
  }

  // =========================
  // TRANSACTION TYPE CHANGE
  // =========================

  function handleTransactionTypeChange(
    e: React.ChangeEvent<HTMLSelectElement>,
  ) {
    const transactionType = e.target.value as TransactionType | "";

    setForm((prev) => ({
      ...prev,

      transactionType,

      // فروش
      sale: transactionType === "sale" ? prev.sale : "",

      // اجاره یا رهن و اجاره
      monthly:
        transactionType === "rent" || transactionType === "rent-mortgage"
          ? prev.monthly
          : "",

      // رهن یا رهن و اجاره
      mortgage:
        transactionType === "mortgage" || transactionType === "rent-mortgage"
          ? prev.mortgage
          : "",
    }));
  }

  // =========================
  // BOOLEAN CHANGE
  // =========================

  function handleBooleanChange(field: "parking" | "pool", value: boolean) {
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

    if (!files.length) {
      return;
    }

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

      Swal.fire({
        icon: "success",
        title: "موفق شد",
        text: "تصاویر با موفقیت آپلود شدند",
        confirmButtonText: "باشه",
      });
    } catch (error) {
      console.error("IMAGE UPLOAD ERROR:", error);

      Swal.fire({
        icon: "error",
        title: "خطا در آپلود تصویر",
        text: error instanceof Error ? error.message : "آپلود تصویر انجام نشد",
        confirmButtonText: "باشه",
      });
    } finally {
      setUploading(false);

      // امکان انتخاب مجدد همان فایل
      e.target.value = "";
    }
  }

  // =========================
  // REMOVE IMAGE
  // =========================

  function removeImage(index: number) {
    setForm((prev) => ({
      ...prev,

      images: prev.images.filter((_, imageIndex) => imageIndex !== index),
    }));
  }

  // =========================
  // SUBMIT
  // =========================

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // =========================
    // UPLOAD CHECK
    // =========================

    if (uploading) {
      Swal.fire({
        icon: "warning",
        title: "لطفاً صبر کنید",
        text: "آپلود تصاویر هنوز تمام نشده است",
        confirmButtonText: "باشه",
      });

      return;
    }

    // =========================
    // MUTATION CHECK
    // =========================

    if (createMutation.isPending) {
      return;
    }

    // =========================
    // BASIC VALIDATION
    // =========================

    if (!form.title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "عنوان ملک را وارد کنید",
        confirmButtonText: "باشه",
      });

      return;
    }

    if (!form.type) {
      Swal.fire({
        icon: "warning",
        title: "نوع ملک را انتخاب کنید",
        confirmButtonText: "باشه",
      });

      return;
    }

    if (!form.transactionType) {
      Swal.fire({
        icon: "warning",
        title: "نوع معامله را انتخاب کنید",
        confirmButtonText: "باشه",
      });

      return;
    }

    if (!form.city.trim()) {
      Swal.fire({
        icon: "warning",
        title: "شهر را وارد کنید",
        confirmButtonText: "باشه",
      });

      return;
    }

    if (!form.address.trim()) {
      Swal.fire({
        icon: "warning",
        title: "آدرس را وارد کنید",
        confirmButtonText: "باشه",
      });

      return;
    }

    // =========================
    // PRICE VALIDATION
    // =========================

    if (form.transactionType === "sale" && !form.sale.trim()) {
      Swal.fire({
        icon: "warning",
        title: "قیمت فروش را وارد کنید",
        confirmButtonText: "باشه",
      });

      return;
    }

    if (
      (form.transactionType === "rent" ||
        form.transactionType === "rent-mortgage") &&
      !form.monthly.trim()
    ) {
      Swal.fire({
        icon: "warning",
        title: "اجاره ماهانه را وارد کنید",
        confirmButtonText: "باشه",
      });

      return;
    }

    if (
      (form.transactionType === "mortgage" ||
        form.transactionType === "rent-mortgage") &&
      !form.mortgage.trim()
    ) {
      Swal.fire({
        icon: "warning",
        title: "مبلغ رهن را وارد کنید",
        confirmButtonText: "باشه",
      });

      return;
    }

    // =========================
    // NARROW TYPES
    // =========================

    const propertyType = form.type as PropertyType;

    const transactionType = form.transactionType as TransactionType;

    const status = form.status as PropertyStatus;

    // =========================
    // PRICING
    // =========================

    const pricing = {
      sale: transactionType === "sale" ? Number(form.sale) || 0 : 0,

      daily: 0,

      monthly:
        transactionType === "rent" || transactionType === "rent-mortgage"
          ? Number(form.monthly) || 0
          : 0,

      mortgage:
        transactionType === "mortgage" || transactionType === "rent-mortgage"
          ? Number(form.mortgage) || 0
          : 0,
    };

    // =========================
    // PAYLOAD
    // =========================

    const payload: CreateAdminPropertyPayload = {
      title: form.title.trim(),

      description: form.description.trim(),

      type: propertyType,

      transactionType,

      status,

      location: {
        city: form.city.trim(),

        address: form.address.trim(),
      },

      images: form.images,

      area: Number(form.area) || 0,

      pricing,

      facilities: {
        bedrooms: Number(form.bedrooms) || 0,

        bathrooms: Number(form.bathrooms) || 0,

        capacity: Number(form.capacity) || 0,

        parking: form.parking,

        pool: form.pool,
      },
    };

    console.log("FINAL CREATE PAYLOAD:", JSON.stringify(payload, null, 2));

    // =========================
    // CREATE PROPERTY
    // =========================

    createMutation.mutate(payload, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "موفق شد",
          text: "ملک با موفقیت اضافه شد",
          confirmButtonText: "باشه",
        }).then(() => {
          router.push("/admin/properties");
        });
      },

      onError: (error) => {
        console.error("CREATE PROPERTY ERROR:", error);

        Swal.fire({
          icon: "error",
          title: "خطا",
          text: error instanceof Error ? error.message : "خطا در ایجاد ملک",
          confirmButtonText: "باشه",
        });
      },
    });
  }

  // =========================
  // PRICE STATES
  // =========================

  const isSale = form.transactionType === "sale";

  const isRent = form.transactionType === "rent";

  const isMortgage = form.transactionType === "mortgage";

  const isRentMortgage = form.transactionType === "rent-mortgage";

  // =========================
  // RENDER
  // =========================

  return (
    <div dir="rtl" className="w-full p-6">
      {/* =========================
          HEADER
      ========================= */}

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

      {/* =========================
          FORM
      ========================= */}

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
        {/* =========================
            TITLE
        ========================= */}

        <Input
          label="عنوان ملک"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        {/* =========================
            PROPERTY TYPE
        ========================= */}

        <SelectInput
          label="نوع ملک"
          name="type"
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

        {/* =========================
            TRANSACTION TYPE
        ========================= */}

        <SelectInput
          label="نوع معامله"
          name="transactionType"
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

        {/* =========================
            STATUS
        ========================= */}

        <SelectInput
          label="وضعیت"
          name="status"
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

        {/* =========================
            LOCATION
        ========================= */}

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

        {/* =========================
            AREA
        ========================= */}

        <Input
          label="متراژ (متر مربع)"
          name="area"
          type="number"
          value={form.area}
          onChange={handleChange}
        />

        {/* =========================
            PRICING
        ========================= */}

        <div>
          <h2 className="mb-4 text-lg font-semibold dark:text-white">
            اطلاعات قیمت
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {/* SALE */}

            <Input
              label="قیمت فروش (تومان)"
              name="sale"
              type="number"
              value={form.sale}
              disabled={!isSale}
              onChange={handleChange}
            />

            {/* MONTHLY */}

            <Input
              label="اجاره ماهانه (تومان)"
              name="monthly"
              type="number"
              value={form.monthly}
              disabled={!isRent && !isRentMortgage}
              onChange={handleChange}
            />

            {/* MORTGAGE */}

            <Input
              label="رهن (تومان)"
              name="mortgage"
              type="number"
              value={form.mortgage}
              disabled={!isMortgage && !isRentMortgage}
              onChange={handleChange}
            />
          </div>

          {!form.transactionType && (
            <p className="mt-3 text-sm text-gray-500">
              ابتدا نوع معامله را انتخاب کنید.
            </p>
          )}

          {isSale && (
            <p className="mt-3 text-sm text-gray-500">
              ملک فروشی است؛ فقط قیمت فروش فعال است.
            </p>
          )}

          {isRent && (
            <p className="mt-3 text-sm text-gray-500">
              ملک اجاره‌ای است؛ فقط اجاره ماهانه فعال است.
            </p>
          )}

          {isMortgage && (
            <p className="mt-3 text-sm text-gray-500">
              ملک رهنی است؛ فقط مبلغ رهن فعال است.
            </p>
          )}

          {isRentMortgage && (
            <p className="mt-3 text-sm text-gray-500">
              ملک رهن و اجاره است؛ مبلغ رهن و اجاره ماهانه را وارد کنید.
            </p>
          )}
        </div>

        {/* =========================
            FACILITIES
        ========================= */}

        <div>
          <h2 className="mb-4 text-lg font-semibold dark:text-white">
            امکانات و مشخصات
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <Input
              label="تعداد اتاق خواب"
              name="bedrooms"
              type="number"
              value={form.bedrooms}
              onChange={handleChange}
            />

            <Input
              label="تعداد حمام"
              name="bathrooms"
              type="number"
              value={form.bathrooms}
              onChange={handleChange}
            />

            <Input
              label="ظرفیت نفرات"
              name="capacity"
              type="number"
              value={form.capacity}
              onChange={handleChange}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-6">
            {/* PARKING */}

            <label className="flex cursor-pointer items-center gap-2 dark:text-white">
              <input
                type="checkbox"
                checked={form.parking}
                onChange={(e) =>
                  handleBooleanChange("parking", e.target.checked)
                }
                className="h-5 w-5"
              />
              پارکینگ دارد
            </label>

            {/* POOL */}

            <label className="flex cursor-pointer items-center gap-2 dark:text-white">
              <input
                type="checkbox"
                checked={form.pool}
                onChange={(e) => handleBooleanChange("pool", e.target.checked)}
                className="h-5 w-5"
              />
              استخر دارد
            </label>
          </div>
        </div>

        {/* =========================
            DESCRIPTION
        ========================= */}

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

        {/* =========================
            IMAGES
        ========================= */}

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
                  alt={`تصویر ملک ${index + 1}`}
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
                    hover:bg-red-50
                  "
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* =========================
            SUBMIT
        ========================= */}

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
            transition
            hover:opacity-90
            disabled:cursor-not-allowed
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

// =========================
// INPUT
// =========================

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
          transition
          focus:border-primary500
          disabled:cursor-not-allowed
          disabled:bg-gray-100
          disabled:text-gray-400
          dark:bg-[#444]
          dark:text-white
          dark:disabled:bg-[#2f2f2f]
          dark:disabled:text-gray-500
        "
      />
    </div>
  );
}

// =========================
// SELECT INPUT
// =========================

function SelectInput({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
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
        name={name}
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
