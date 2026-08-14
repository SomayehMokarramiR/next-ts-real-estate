"use client";

import Image from "next/image";
import Link from "next/link";

import {
  MapPin,
  Star,
  Home,
  Bath,
  Users,
  Car,
  Waves,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";

import { useProperty } from "@/hooks/useProperties";
import Breadcrumb from "@/app/components/modules/breadcrumb/Breadcrumb";

type Props = {
  propertyId: string;
};

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  villa: "ویلا",
  apartment: "آپارتمان",
  house: "خانه",
  hotel: "هتل",
  suite: "سوئیت",
};

function getPropertyType(type?: string) {
  if (!type) return "ملک";

  return PROPERTY_TYPE_LABELS[type] ?? type;
}

function getPropertyImage(images: string[] | undefined, index: number) {
  const fallbacks = [
    "/images/galary1.png",
    "/images/galary2.png",
    "/images/galary3.png",
    "/images/galary4.png",
    "/images/galary5.png",
  ];

  return images?.[index] || fallbacks[index];
}

function getStatusLabel(status?: string) {
  switch (status) {
    case "available":
      return "قابل رزرو";

    case "reserved":
      return "رزرو شده";

    case "inactive":
      return "غیرفعال";

    default:
      return "نامشخص";
  }
}

function getStatusClass(status?: string) {
  switch (status) {
    case "available":
      return "bg-primary500/10 text-primary500";

    case "reserved":
      return "bg-amber-100 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400";

    case "inactive":
      return "bg-red-100 text-red-500 dark:bg-red-950/30 dark:text-red-400";

    default:
      return "bg-gray-100 text-gray-500 dark:bg-[#353535] dark:text-gray-400";
  }
}

export default function PropertyDetails({ propertyId }: Props) {
  const {
    data: property,
    isLoading,
    isError,
    error,
    refetch,
  } = useProperty(propertyId);

  // ======================================
  // LOADING
  // ======================================

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8" dir="rtl">
        <div className="animate-pulse">
          <div className="h-5 w-56 rounded bg-gray-200 dark:bg-[#353535] mb-8" />

          <div className="h-9 w-2/3 rounded bg-gray-200 dark:bg-[#353535] mb-4" />

          <div className="h-[280px] md:h-[520px] rounded-3xl bg-gray-200 dark:bg-[#353535] mb-8" />

          <div className="grid lg:grid-cols-[1fr_360px] gap-6">
            <div className="space-y-6">
              <div className="h-36 rounded-3xl bg-gray-200 dark:bg-[#353535]" />
              <div className="h-56 rounded-3xl bg-gray-200 dark:bg-[#353535]" />
              <div className="h-48 rounded-3xl bg-gray-200 dark:bg-[#353535]" />
            </div>

            <div className="h-80 rounded-3xl bg-gray-200 dark:bg-[#353535]" />
          </div>
        </div>
      </div>
    );
  }

  // ======================================
  // ERROR
  // ======================================

  if (isError || !property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10" dir="rtl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              {
                label: "املاک",
                href: "/properties",
              },
              {
                label: "جزئیات ملک",
              },
            ]}
          />
        </div>

        <div className="rounded-3xl bg-red-50 dark:bg-red-950/20 p-10 text-center">
          <h2 className="text-lg font-bold text-red-500">
            ملک موردنظر پیدا نشد
          </h2>

          <p className="mt-2 text-sm text-red-400">
            {error instanceof Error
              ? error.message
              : "اطلاعات این ملک در دسترس نیست."}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => refetch()}
              className="
                rounded-full
                bg-primary500
                px-5
                py-2.5
                text-sm
                text-white
                hover:bg-primary600
                transition-colors
              "
            >
              تلاش مجدد
            </button>

            <Link
              href="/properties"
              className="
                rounded-full
                border
                border-primary500
                px-5
                py-2.5
                text-sm
                text-primary500
                hover:bg-primary500/10
                transition-colors
              "
            >
              بازگشت به املاک
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ======================================
  // DATA
  // ======================================

  const dailyPrice = property.pricing?.daily ?? 0;

  const oldPrice = property.pricing?.oldPrice ?? 0;

  const isAvailable = property.status === "available";

  const typeLabel = getPropertyType(property.type);

  const statusLabel = getStatusLabel(property.status);

  const statusClass = getStatusClass(property.status);

  const facilities = [
    {
      icon: Home,
      label: "اتاق خواب",
      value: property.facilities?.bedrooms ?? 0,
    },
    {
      icon: Bath,
      label: "حمام",
      value: property.facilities?.bathrooms ?? 0,
    },
    {
      icon: Users,
      label: "ظرفیت",
      value: `${property.facilities?.capacity ?? 0} نفر`,
    },
    {
      icon: Car,
      label: "پارکینگ",
      value: property.facilities?.parking ? "دارد" : "ندارد",
    },
    {
      icon: Waves,
      label: "استخر",
      value: property.facilities?.pool ? "دارد" : "ندارد",
    },
  ];

  // ======================================
  // UI
  // ======================================

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8" dir="rtl">
      {/* Breadcrumb */}

      <div className="mb-6">
        <Breadcrumb
          items={[
            {
              label: "املاک",
              href: "/properties",
            },
            {
              label: property.title,
            },
          ]}
        />
      </div>

      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1
            className="
              text-2xl
              md:text-3xl
              font-bold
              text-gray-900
              dark:text-white
              leading-relaxed
            "
          >
            {property.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-300">
              <MapPin size={17} className="text-primary500" />

              <span>
                {property.location?.address ||
                  property.location?.city ||
                  "آدرس ثبت نشده"}
              </span>
            </div>

            <span className="rounded-full bg-primary500/10 px-3 py-1 text-sm text-primary500">
              {typeLabel}
            </span>

            <span className="flex items-center gap-1 rounded-full bg-primary500 px-3 py-1 text-sm text-white">
              <Star size={15} className="fill-white" />

              <span>{property.rating ?? 0}</span>
            </span>
          </div>
        </div>

        <Link
          href="/properties"
          className="
            inline-flex
            items-center
            gap-1.5
            text-sm
            text-gray-500
            hover:text-primary500
            transition-colors
          "
        >
          بازگشت به املاک
          <ChevronLeft size={16} />
        </Link>
      </div>

      {/* Gallery */}

      <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2">
        <div
          className="
            relative
            h-[280px]
            overflow-hidden
            rounded-3xl
            md:col-span-2
            md:row-span-2
            md:h-[520px]
          "
        >
          <Image
            src={getPropertyImage(property.images, 0)}
            alt={property.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="
              relative
              hidden
              h-[250px]
              overflow-hidden
              rounded-3xl
              md:block
            "
          >
            <Image
              src={getPropertyImage(property.images, index)}
              alt={property.title}
              fill
              className="object-cover"
            />

            {index === 4 && (property.images?.length ?? 0) > 5 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-gray-800">
                  مشاهده همه تصاویر
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Main */}

        <div className="space-y-6">
          {/* Status */}

          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#272727]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {typeLabel}
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  اقامتگاهی مناسب برای یک اقامت راحت
                </p>
              </div>

              <span
                className={`
                  inline-flex
                  w-fit
                  rounded-full
                  px-4
                  py-2
                  text-sm
                  font-medium
                  ${statusClass}
                `}
              >
                {statusLabel}
              </span>
            </div>
          </div>

          {/* Facilities */}

          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#272727]">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              امکانات و ویژگی‌ها
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {facilities.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      bg-[#F0F0F3]
                      p-4
                      dark:bg-[#353535]
                    "
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary500/10 text-primary500">
                      <Icon size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">{item.label}</p>

                      <p className="mt-1 text-sm font-bold text-gray-800 dark:text-white">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Description */}

          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#272727]">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              درباره این اقامتگاه
            </h2>

            <p className="mt-5 whitespace-pre-line leading-8 text-gray-500 dark:text-gray-300">
              {property.description || "توضیحاتی برای این ملک ثبت نشده است."}
            </p>
          </div>

          {/* Location */}

          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#272727]">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              موقعیت اقامتگاه
            </h2>

            <div className="mt-5 flex items-start gap-3 text-gray-500 dark:text-gray-300">
              <MapPin className="mt-1 shrink-0 text-primary500" size={20} />

              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {property.location?.city || "شهر ثبت نشده"}
                </p>

                <p className="mt-1 text-sm">
                  {property.location?.address || "آدرس ثبت نشده"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Card */}

        <aside className="lg:relative">
          <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-md dark:bg-[#272727]">
            <p className="text-sm text-gray-400">قیمت اقامت</p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-2xl font-bold text-primary500">
                {dailyPrice.toLocaleString("fa-IR")}
              </span>

              <span className="mb-1 text-sm text-gray-400">تومان / شب</span>
            </div>

            {oldPrice > dailyPrice && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-400 line-through">
                  {oldPrice.toLocaleString("fa-IR")}
                </span>

                {dailyPrice > 0 && (
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-500">
                    تخفیف ویژه
                  </span>
                )}
              </div>
            )}

            <div className="my-6 border-t border-dashed border-gray-200 dark:border-gray-600" />

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">ظرفیت</span>

                <span className="font-medium text-gray-900 dark:text-white">
                  {property.facilities?.capacity ?? 0} نفر
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">وضعیت</span>

                <span
                  className={
                    property.status === "available"
                      ? "font-medium text-primary500"
                      : property.status === "reserved"
                        ? "font-medium text-amber-600"
                        : "font-medium text-red-500"
                  }
                >
                  {statusLabel}
                </span>
              </div>
            </div>

            {/* ======================================
                BOOKING BUTTON
            ====================================== */}

            {isAvailable ? (
              <>
                <Link
                  href={`/single-reserve-house/${property._id}`}
                  className="
                    mt-7
                    flex
                    h-12
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-primary500
                    text-sm
                    font-bold
                    text-white
                    transition-colors
                    hover:bg-primary600
                  "
                >
                  رزرو اقامتگاه
                  <ChevronLeft size={18} />
                </Link>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <CheckCircle2 size={15} className="text-primary500" />
                  رزرو امن و آنلاین
                </div>
              </>
            ) : (
              <div
                className={`
                  mt-7
                  flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  rounded-full
                  px-4
                  text-center
                  text-sm
                  font-bold
                  ${
                    property.status === "reserved"
                      ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400"
                      : "bg-gray-200 text-gray-500 dark:bg-[#353535] dark:text-gray-400"
                  }
                `}
              >
                {property.status === "reserved"
                  ? "این اقامتگاه قبلاً رزرو شده است"
                  : "این اقامتگاه فعلاً قابل رزرو نیست"}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
