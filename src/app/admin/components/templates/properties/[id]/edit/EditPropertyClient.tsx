"use client";

import { ArrowRight, Save, X } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

import { useAdminProperty } from "@/hooks/useAdminProperty";
import { useAdminUpdateProperty } from "@/hooks/useAdminUpdateProperty";

import type { UpdateAdminPropertyPayload } from "@/services/adminPropertyService";

// =====================================================
// TYPES
// =====================================================

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

// =====================================================
// FORM TYPE
// =====================================================

type EditPropertyForm = {
  title: string;

  description: string;

  type: PropertyType | "";

  transactionType: TransactionType | "";

  status: PropertyStatus;

  city: string;

  address: string;

  images: string[];

  area: number | "";

  pricing: {
    sale: number | "";

    daily: number | "";

    monthly: number | "";

    mortgage: number | "";
  };

  facilities: {
    bedrooms: number | "";

    bathrooms: number | "";

    capacity: number | "";

    parking: boolean;

    pool: boolean;
  };
};

// =====================================================
// INPUT COMPONENT
// =====================================================

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

  value: string | number | "";

  type?: string;

  disabled?: boolean;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

      <input
        type={type}
        name={name}
        value={value === undefined ? "" : value}
        disabled={disabled}
        onChange={onChange}
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          p-3
          outline-none
          focus:border-primary500

          disabled:cursor-not-allowed
          disabled:bg-gray-100
          disabled:text-gray-400

          dark:border-gray-600
          dark:bg-[#444]
          dark:text-white
          dark:disabled:bg-[#2f2f2f]
        "
      />
    </div>
  );
}

// =====================================================
// SELECT COMPONENT
// =====================================================

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

          dark:border-gray-600
          dark:bg-[#444]
          dark:text-white
        "
      >
        <option value="">انتخاب کنید</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// =====================================================
// COMPONENT
// =====================================================

export default function EditPropertyClient({
  propertyId,
}: {
  propertyId: string;
}) {
  const router = useRouter();

  const {
    data: property,

    isLoading,

    isError,
  } = useAdminProperty(propertyId);

  const updateMutation = useAdminUpdateProperty();

  const [form, setForm] = useState<EditPropertyForm | null>(null);

  const [uploading, setUploading] = useState(false);

  if (isLoading) {
    return (
      <div
        dir="rtl"
        className="
          p-8
          text-center
          text-gray-500
        "
      >
        در حال دریافت اطلاعات ملک...
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div
        dir="rtl"
        className="
          p-8
          text-center
          text-red-500
        "
      >
        خطا در دریافت اطلاعات ملک
      </div>
    );
  }

  // =====================================================
  // CURRENT FORM
  // =====================================================

  const currentForm: EditPropertyForm = form ?? {
    title: property.title ?? "",

    description: property.description ?? "",

    type: (property.type as PropertyType) ?? "",

    transactionType: (property.transactionType as TransactionType) ?? "",

    status: (property.status as PropertyStatus) ?? "available",

    city: property.location?.city ?? "",

    address: property.location?.address ?? "",

    images: Array.isArray(property.images) ? property.images : [],

    area: property.area !== undefined ? Number(property.area) : "",

    pricing: {
      sale:
        property.pricing?.sale !== undefined
          ? Number(property.pricing.sale)
          : "",

      daily:
        property.pricing?.daily !== undefined
          ? Number(property.pricing.daily)
          : "",

      monthly:
        property.pricing?.monthly !== undefined
          ? Number(property.pricing.monthly)
          : "",

      mortgage:
        property.pricing?.mortgage !== undefined
          ? Number(property.pricing.mortgage)
          : "",
    },

    facilities: {
      bedrooms:
        property.facilities?.bedrooms !== undefined
          ? Number(property.facilities.bedrooms)
          : "",

      bathrooms:
        property.facilities?.bathrooms !== undefined
          ? Number(property.facilities.bathrooms)
          : "",

      capacity:
        property.facilities?.capacity !== undefined
          ? Number(property.facilities.capacity)
          : "",

      parking: Boolean(property.facilities?.parking),

      pool: Boolean(property.facilities?.pool),
    },
  };

  // =====================================================
  // TRANSACTION FLAGS
  // =====================================================

  const isSale = currentForm.transactionType === "sale";

  const isRent = currentForm.transactionType === "rent";

  const isMortgage = currentForm.transactionType === "mortgage";

  const isRentMortgage = currentForm.transactionType === "rent-mortgage";

  // =====================================================
  // UPDATE FORM
  // =====================================================

  function updateForm(value: Partial<EditPropertyForm>) {
    setForm((prev) => ({
      ...(prev ?? currentForm),

      ...value,
    }));
  }

  // =====================================================
  // GENERAL INPUT
  // =====================================================

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;

    updateForm({
      [name]: value,
    } as Partial<EditPropertyForm>);
  }

  // =====================================================
  // PROPERTY TYPE
  // =====================================================

  function handlePropertyTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    updateForm({
      type: e.target.value as PropertyType,
    });
  }

  // =====================================================
  // TRANSACTION TYPE
  // =====================================================

  function handleTransactionTypeChange(
    e: React.ChangeEvent<HTMLSelectElement>,
  ) {
    const value = e.target.value as TransactionType;

    updateForm({
      transactionType: value,

      pricing: {
        sale: value === "sale" ? currentForm.pricing.sale : "",

        daily: value === "rent" ? currentForm.pricing.daily : "",

        monthly:
          value === "rent" || value === "rent-mortgage"
            ? currentForm.pricing.monthly
            : "",

        mortgage:
          value === "mortgage" || value === "rent-mortgage"
            ? currentForm.pricing.mortgage
            : "",
      },
    });
  }

  // =====================================================
  // STATUS
  // =====================================================

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    updateForm({
      status: e.target.value as PropertyStatus,
    });
  }

  // =====================================================
  // AREA FIX
  // =====================================================

  function handleAreaChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;

    value = value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

    if (!/^\d*$/.test(value)) {
      return;
    }

    updateForm({
      area: value === "" ? "" : Number(value),
    });
  }

  // =====================================================
  // PRICING
  // =====================================================

  function updatePricing(
    field: "sale" | "daily" | "monthly" | "mortgage",

    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const value = e.target.value;

    updateForm({
      pricing: {
        ...currentForm.pricing,

        [field]: value === "" ? "" : Number(value),
      },
    });
  }

  // =====================================================
  // FACILITIES NUMBER
  // =====================================================

  function updateFacilityNumber(
    field: "bedrooms" | "capacity",

    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const value = e.target.value;

    updateForm({
      facilities: {
        ...currentForm.facilities,

        [field]: value === "" ? "" : Number(value),
      },
    });
  }

  // =====================================================
  // BATHROOM
  // =====================================================

  function updateBathroom(checked: boolean) {
    updateForm({
      facilities: {
        ...currentForm.facilities,

        bathrooms: checked ? 1 : "",
      },
    });
  }

  // =====================================================
  // BOOLEAN FACILITIES
  // =====================================================

  function updateFacilityBoolean(
    field: "parking" | "pool",

    value: boolean,
  ) {
    updateForm({
      facilities: {
        ...currentForm.facilities,

        [field]: value,
      },
    });
  }

  // =====================================================
  // IMAGE UPLOAD
  // =====================================================

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
          throw new Error(data.message || "آپلود تصویر انجام نشد");
        }

        urls.push(data.url);
      }

      // جایگزینی تصاویر قبلی
      updateForm({
        images: urls,
      });

      await Swal.fire({
        icon: "success",

        title: "موفق شد",

        text: "تصاویر جدید جایگزین شدند",

        confirmButtonText: "باشه",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",

        title: "خطا",

        text: error instanceof Error ? error.message : "خطا در آپلود تصویر",

        confirmButtonText: "باشه",
      });
    } finally {
      setUploading(false);

      e.target.value = "";
    }
  }

  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  function removeImage(index: number) {
    updateForm({
      images: currentForm.images.filter((_, i) => i !== index),
    });
  }

  // =====================================================
  // SUBMIT
  // =====================================================

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (uploading) {
      Swal.fire({
        icon: "warning",

        title: "لطفا صبر کنید",

        text: "آپلود تصاویر تمام نشده است",

        confirmButtonText: "باشه",
      });

      return;
    }

    if (!currentForm.title.trim()) {
      Swal.fire({
        icon: "warning",

        title: "عنوان ملک را وارد کنید",

        confirmButtonText: "باشه",
      });

      return;
    }

    if (!currentForm.type) {
      Swal.fire({
        icon: "warning",

        title: "نوع ملک را انتخاب کنید",

        confirmButtonText: "باشه",
      });

      return;
    }

    if (!currentForm.transactionType) {
      Swal.fire({
        icon: "warning",

        title: "نوع معامله را انتخاب کنید",

        confirmButtonText: "باشه",
      });

      return;
    }

    const pricing = {
      sale: isSale ? Number(currentForm.pricing.sale) || 0 : 0,

      daily: isRent ? Number(currentForm.pricing.daily) || 0 : 0,

      monthly:
        isRent || isRentMortgage ? Number(currentForm.pricing.monthly) || 0 : 0,

      mortgage:
        isMortgage || isRentMortgage
          ? Number(currentForm.pricing.mortgage) || 0
          : 0,
    };

    const payload: UpdateAdminPropertyPayload = {
      title: currentForm.title.trim(),

      description: currentForm.description.trim(),

      type: currentForm.type as PropertyType,

      transactionType: currentForm.transactionType as TransactionType,

      status: currentForm.status,

      location: {
        city: currentForm.city.trim(),

        address: currentForm.address.trim(),
      },

      images: currentForm.images,

      area: currentForm.area === "" ? undefined : Number(currentForm.area),

      pricing,

      facilities: {
        bedrooms:
          currentForm.facilities.bedrooms === ""
            ? 0
            : Number(currentForm.facilities.bedrooms),

        bathrooms:
          currentForm.facilities.bathrooms === ""
            ? 0
            : Number(currentForm.facilities.bathrooms),

        capacity:
          currentForm.facilities.capacity === ""
            ? 0
            : Number(currentForm.facilities.capacity),

        parking: currentForm.facilities.parking,

        pool: currentForm.facilities.pool,
      },
    };

    console.log("UPDATE PAYLOAD", payload);

    updateMutation.mutate(
      {
        id: propertyId,

        data: payload,
      },

      {
        onSuccess: async () => {
          await Swal.fire({
            icon: "success",

            title: "موفق شد",

            text: "ملک با موفقیت ویرایش شد",

            confirmButtonText: "باشه",
          });

          router.push(`/admin/properties/${propertyId}`);
        },

        onError: (error) => {
          Swal.fire({
            icon: "error",

            title: "خطا",

            text: error instanceof Error ? error.message : "خطا در ویرایش ملک",

            confirmButtonText: "باشه",
          });
        },
      },
    );
  }
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
            ویرایش ملک
          </h1>

          <p
            className="
            mt-2
            text-sm
            text-gray-500
          "
          >
            تغییر اطلاعات ملک
          </p>
        </div>

        <Link
          href={`/admin/properties/${propertyId}`}
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
        {/* TITLE */}

        <Input
          label="عنوان ملک"
          name="title"
          value={currentForm.title}
          onChange={handleChange}
        />

        {/* TYPE */}

        <SelectInput
          label="نوع ملک"
          value={currentForm.type}
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

        {/* TRANSACTION */}

        <SelectInput
          label="نوع معامله"
          value={currentForm.transactionType}
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

        {/* STATUS */}

        <SelectInput
          label="وضعیت ملک"
          value={currentForm.status}
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

        {/* LOCATION */}

        <div
          className="
            grid
            gap-4
            md:grid-cols-2
          "
        >
          <Input
            label="شهر"
            name="city"
            value={currentForm.city}
            onChange={handleChange}
          />

          <Input
            label="آدرس"
            name="address"
            value={currentForm.address}
            onChange={handleChange}
          />
        </div>

        {/* AREA */}

        <Input
          label="متراژ (متر مربع)"
          name="area"
          type="text"
          value={currentForm.area === "" ? "" : String(currentForm.area)}
          onChange={handleAreaChange}
        />

        {/* PRICE */}

        <div>
          <h2
            className="
              mb-4
              text-lg
              font-semibold
              dark:text-white
            "
          >
            اطلاعات قیمت
          </h2>

          <div
            className="
              grid
              gap-4

              md:grid-cols-2
              lg:grid-cols-4
            "
          >
            <Input
              label="قیمت فروش"
              name="sale"
              type="text"
              value={currentForm.pricing.sale}
              disabled={!isSale}
              onChange={(e) => updatePricing("sale", e)}
            />

            <Input
              label="قیمت روزانه"
              name="daily"
              type="text"
              value={currentForm.pricing.daily}
              disabled={!isRent}
              onChange={(e) => updatePricing("daily", e)}
            />

            <Input
              label="اجاره ماهانه"
              name="monthly"
              type="text"
              value={currentForm.pricing.monthly}
              disabled={!isRent && !isRentMortgage}
              onChange={(e) => updatePricing("monthly", e)}
            />

            <Input
              label="رهن"
              name="mortgage"
              type="text"
              value={currentForm.pricing.mortgage}
              disabled={!isMortgage && !isRentMortgage}
              onChange={(e) => updatePricing("mortgage", e)}
            />
          </div>
        </div>

        {/* FACILITIES */}

        <div>
          <h2
            className="
              mb-4
              text-lg
              font-semibold
              dark:text-white
            "
          >
            امکانات و ظرفیت
          </h2>

          <div
            className="
              grid
              gap-4
              md:grid-cols-2
            "
          >
            <Input
              label="تعداد اتاق خواب"
              name="bedrooms"
              type="text"
              value={currentForm.facilities.bedrooms}
              onChange={(e) => updateFacilityNumber("bedrooms", e)}
            />

            <Input
              label="ظرفیت نفرات"
              name="capacity"
              type="text"
              value={currentForm.facilities.capacity}
              onChange={(e) => updateFacilityNumber("capacity", e)}
            />
          </div>

          <div
            className="
              mt-5
              grid
              gap-4
              md:grid-cols-2
            "
          >
            {/* BATHROOM */}

            <label
              className="
                flex
                cursor-pointer
                items-center
                gap-3
                rounded-xl
                border
                p-3
                dark:border-gray-600
                dark:text-white
              "
            >
              <input
                type="checkbox"
                checked={Number(currentForm.facilities.bathrooms) > 0}
                onChange={(e) => updateBathroom(e.target.checked)}
                className="
                  h-5
                  w-5
                "
              />
              حمام دارد
            </label>

            {/* PARKING */}

            <label
              className="
                flex
                cursor-pointer
                items-center
                gap-3
                rounded-xl
                border
                p-3
                dark:border-gray-600
                dark:text-white
              "
            >
              <input
                type="checkbox"
                checked={currentForm.facilities.parking}
                onChange={(e) =>
                  updateFacilityBoolean("parking", e.target.checked)
                }
                className="
                  h-5
                  w-5
                "
              />
              پارکینگ دارد
            </label>

            {/* POOL */}

            <label
              className="
                flex
                cursor-pointer
                items-center
                gap-3
                rounded-xl
                border
                p-3
                dark:border-gray-600
                dark:text-white
              "
            >
              <input
                type="checkbox"
                checked={currentForm.facilities.pool}
                onChange={(e) =>
                  updateFacilityBoolean("pool", e.target.checked)
                }
                className="
                  h-5
                  w-5
                "
              />
              استخر دارد
            </label>
          </div>
        </div>
        {/* DESCRIPTION */}

        <div>
          <label
            className="
              mb-2
              block
              text-sm
              dark:text-white
            "
          >
            توضیحات
          </label>

          <textarea
            name="description"
            value={currentForm.description}
            onChange={handleChange}
            className="
              min-h-[120px]
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

        {/* IMAGES */}

        <div>
          <h2
            className="
              mb-4
              text-lg
              font-semibold
              dark:text-white
            "
          >
            تصاویر ملک
          </h2>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="
              block
              w-full
              rounded-xl
              border
              p-3
              dark:border-gray-600
              dark:text-white
            "
          />

          {uploading && (
            <p
              className="
                  mt-3
                  text-sm
                  text-blue-500
                "
            >
              در حال آپلود تصاویر...
            </p>
          )}

          {currentForm.images.length > 0 && (
            <div
              className="
                  mt-5
                  grid
                  grid-cols-2
                  gap-4
                  md:grid-cols-4
                "
            >
              {currentForm.images.map((image, index) => (
                <div
                  key={image}
                  className="
                          relative
                        "
                >
                  <img
                    src={image}
                    alt="property"
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
                            bg-red-500
                            p-1
                            text-white
                          "
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BUTTONS */}

        <div
          className="
            flex
            justify-start
            gap-3
            pt-6
          "
        >
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-primary500
              px-6
              py-3
              text-white
              disabled:opacity-50
            "
          >
            <Save size={18} />

            {updateMutation.isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>

          <Link
            href={`/admin/properties/${propertyId}`}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-gray-200
              px-6
              py-3

              dark:bg-[#444]
              dark:text-white
            "
          >
            <X size={18} />
            انصراف
          </Link>
        </div>
      </form>
    </div>
  );
}
