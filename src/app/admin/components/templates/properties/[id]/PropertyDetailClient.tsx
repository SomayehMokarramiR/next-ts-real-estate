"use client";

import { ArrowRight, Building2, Check, X } from "lucide-react";
import Link from "next/link";

import { useAdminProperty } from "@/hooks/useAdminProperty";

export default function PropertyDetailClient({
  propertyId,
}: {
  propertyId: string;
}) {
  const { data: property, isLoading, isError } = useAdminProperty(propertyId);

  if (isLoading) {
    return (
      <div dir="rtl" className="p-8 text-center text-gray-500">
        در حال دریافت اطلاعات ملک...
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div dir="rtl" className="p-8 text-center text-red-500">
        خطا در دریافت اطلاعات ملک
      </div>
    );
  }

  // =========================
  // PERSIAN LABELS
  // =========================

  const propertyTypeLabels: Record<string, string> = {
    apartment: "آپارتمان",
    villa: "ویلا",
    house: "خانه",
    land: "زمین",
    office: "اداری",
    commercial: "تجاری",
  };

  const transactionTypeLabels: Record<string, string> = {
    sale: "فروش",
    rent: "اجاره",
    mortgage: "رهن",
  };

  const statusLabels: Record<string, string> = {
    available: "فعال",
    reserved: "رزرو شده",
    inactive: "غیرفعال",
    sold: "فروخته شده",
  };

  const propertyType =
    propertyTypeLabels[property.type] || property.type || "-";

  const transactionType =
    transactionTypeLabels[property.transactionType] ||
    property.transactionType ||
    "-";

  const status = statusLabels[property.status] || property.status || "-";

  // =========================
  // TRANSACTION TYPE
  // =========================

  const isSale = property.transactionType === "sale";
  const isRent = property.transactionType === "rent";
  const isMortgage = property.transactionType === "mortgage";

  return (
    <div dir="rtl" className="w-full p-6">
      {/* =========================
          HEADER
      ========================= */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">جزئیات ملک</h1>

          <p className="mt-2 text-sm text-gray-500">مشاهده اطلاعات کامل ملک</p>
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
          MAIN CARD
      ========================= */}

      <div
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

        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-primary500/10
              text-primary500
            "
          >
            <Building2 size={24} />
          </div>

          <h2 className="text-xl font-bold dark:text-white">
            {property.title}
          </h2>
        </div>

        {/* =========================
            IMAGES
        ========================= */}

        <Section title="تصاویر ملک">
          {property.images?.length ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {property.images.map((image, index) => (
                <img
                  key={`${image}-${index}`}
                  src={image}
                  alt={`${property.title} - تصویر ${index + 1}`}
                  className="
                    h-48
                    w-full
                    rounded-xl
                    object-cover
                  "
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">تصویری ثبت نشده است</p>
          )}
        </Section>

        {/* =========================
            PROPERTY INFO
        ========================= */}

        <Section title="اطلاعات ملک">
          <div className="grid gap-5 sm:grid-cols-2">
            <Info title="نوع ملک" value={propertyType} />

            <Info title="نوع معامله" value={transactionType} />

            <Info title="وضعیت" value={status} />

            <Info title="شهر" value={property.location?.city} />

            <Info title="آدرس" value={property.location?.address} />

            <Info
              title="متراژ"
              value={
                property.area !== undefined
                  ? `${property.area.toLocaleString()} متر`
                  : "-"
              }
            />

            <Info
              title="ظرفیت"
              value={
                property.facilities?.capacity !== undefined
                  ? `${property.facilities.capacity} نفر`
                  : "-"
              }
            />

            <Info
              title="تعداد اتاق خواب"
              value={property.facilities?.bedrooms}
            />

            <Info title="تعداد حمام" value={property.facilities?.bathrooms} />
          </div>
        </Section>

        {/* =========================
            PRICING
        ========================= */}

        <Section title="اطلاعات قیمت">
          <div className="grid gap-5 sm:grid-cols-2">
            {/* SALE */}

            {isSale && (
              <Info
                title="قیمت فروش"
                value={
                  property.pricing?.daily !== undefined &&
                  property.pricing.daily > 0
                    ? `${property.pricing.daily.toLocaleString()} تومان`
                    : "-"
                }
              />
            )}

            {/* RENT */}

            {isRent && (
              <Info
                title="اجاره ماهانه"
                value={
                  property.pricing?.monthly !== undefined &&
                  property.pricing.monthly > 0
                    ? `${property.pricing.monthly.toLocaleString()} تومان`
                    : "-"
                }
              />
            )}

            {/* MORTGAGE */}

            {isMortgage && (
              <Info
                title="رهن"
                value={
                  property.pricing?.mortgage !== undefined &&
                  property.pricing.mortgage > 0
                    ? `${property.pricing.mortgage.toLocaleString()} تومان`
                    : "-"
                }
              />
            )}
          </div>
        </Section>

        {/* =========================
            FACILITIES
        ========================= */}

        <Section title="امکانات">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Facility title="پارکینگ" value={property.facilities?.parking} />

            <Facility title="استخر" value={property.facilities?.pool} />
          </div>
        </Section>

        {/* =========================
            DESCRIPTION
        ========================= */}

        <Section title="توضیحات">
          <p
            className="
              text-sm
              leading-7
              text-gray-600
              dark:text-gray-300
            "
          >
            {property.description || "توضیحی ثبت نشده است"}
          </p>
        </Section>
      </div>
    </div>
  );
}

// =========================
// SECTION
// =========================

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 font-bold dark:text-white">{title}</h3>

      {children}
    </div>
  );
}

// =========================
// INFO
// =========================

function Info({ title, value }: { title: string; value?: string | number }) {
  return (
    <div
      className="
        rounded-xl
        bg-gray-50
        p-4
        dark:bg-[#444]
      "
    >
      <p className="text-xs text-gray-500 dark:text-gray-300">{title}</p>

      <p className="mt-2 font-bold dark:text-white">
        {value !== undefined && value !== "" ? value : "-"}
      </p>
    </div>
  );
}

// =========================
// FACILITY
// =========================

function Facility({ title, value }: { title: string; value?: boolean }) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-xl
        bg-gray-50
        p-4
        dark:bg-[#444]
      "
    >
      <span className="dark:text-white">{title}</span>

      {value ? (
        <div className="flex items-center gap-2 text-green-500">
          <Check size={20} />
          <span className="text-sm">دارد</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-red-500">
          <X size={20} />
          <span className="text-sm">ندارد</span>
        </div>
      )}
    </div>
  );
}
