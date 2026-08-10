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

type Props = {
  propertyId: string;
};

export default function PropertyDetails({ propertyId }: Props) {
  const { data: property, isLoading, error } = useProperty(propertyId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="rounded-3xl bg-[#F0F0F3] p-10 text-center dark:bg-[#272727]">
          <p className="text-gray-500 dark:text-gray-300">
            در حال دریافت اطلاعات ملک...
          </p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="rounded-3xl bg-red-50 p-10 text-center text-red-500">
          <p>خطا در دریافت اطلاعات ملک</p>

          <Link
            href="/"
            className="mt-5 inline-flex items-center gap-1 text-primary500"
          >
            بازگشت به صفحه اصلی
            <ChevronLeft size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const dailyPrice = property.pricing?.daily ?? 0;

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

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Breadcrumb */}
      <div className="mb-5 flex items-center gap-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-primary500">
          صفحه اصلی
        </Link>

        <ChevronLeft size={15} />

        <span className="text-gray-600 dark:text-gray-300">جزئیات ملک</span>
      </div>

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            {property.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin size={17} className="text-primary500" />

              <span>
                {property.location?.address ||
                  property.location?.city ||
                  "آدرس ثبت نشده"}
              </span>
            </div>

            <div className="flex items-center gap-1 rounded-full bg-primary500 px-3 py-1 text-sm text-white">
              <Star size={15} className="fill-white" />

              <span>{property.rating ?? 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2">
        <div className="relative h-[260px] overflow-hidden rounded-3xl md:col-span-2 md:row-span-2 md:h-[520px]">
          <Image
            src={property.images?.[0] || "/images/placeholder.jpg"}
            alt={property.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="relative hidden h-[250px] overflow-hidden rounded-3xl md:block">
          <Image
            src={property.images?.[1] || "/images/galary1.png"}
            alt={property.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="relative hidden h-[250px] overflow-hidden rounded-3xl md:block">
          <Image
            src={property.images?.[2] || "/images/galary2.png"}
            alt={property.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="relative hidden h-[250px] overflow-hidden rounded-3xl md:block">
          <Image
            src={property.images?.[3] || "/images/galary3.png"}
            alt={property.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="relative hidden h-[250px] overflow-hidden rounded-3xl md:block">
          <Image
            src={property.images?.[4] || "/images/galary4.png"}
            alt={property.title}
            fill
            className="object-cover"
          />

          {property.images?.length > 5 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-gray-800">
                مشاهده همه تصاویر
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Right / Main */}
        <div className="space-y-6">
          {/* Property Type */}
          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#272727]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold dark:text-white">
                  {property.type === "villa"
                    ? "ویلا"
                    : property.type === "apartment"
                      ? "آپارتمان"
                      : property.type === "house"
                        ? "خانه"
                        : property.type === "hotel"
                          ? "هتل"
                          : "سوئیت"}
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  اقامتگاهی مناسب برای یک اقامت راحت
                </p>
              </div>

              <div className="rounded-full bg-primary500/10 px-4 py-2 text-sm text-primary500">
                {property.status === "available" ? "قابل رزرو" : "غیرقابل رزرو"}
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#272727]">
            <h2 className="text-xl font-bold dark:text-white">
              امکانات و ویژگی‌ها
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {facilities.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-2xl bg-[#F0F0F3] p-4 dark:bg-[#353535]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary500/10 text-primary500">
                      <Icon size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">{item.label}</p>

                      <p className="mt-1 text-sm font-bold dark:text-white">
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
            <h2 className="text-xl font-bold dark:text-white">
              درباره این اقامتگاه
            </h2>

            <p className="mt-5 whitespace-pre-line leading-8 text-gray-500 dark:text-gray-300">
              {property.description || "توضیحاتی برای این ملک ثبت نشده است."}
            </p>
          </div>

          {/* Location */}
          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-[#272727]">
            <h2 className="text-xl font-bold dark:text-white">
              موقعیت اقامتگاه
            </h2>

            <div className="mt-5 flex items-start gap-3 text-gray-500 dark:text-gray-300">
              <MapPin className="mt-1 shrink-0 text-primary500" size={20} />

              <div>
                <p className="font-medium dark:text-white">
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
        <div className="lg:relative">
          <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-md dark:bg-[#272727]">
            <p className="text-sm text-gray-400">قیمت اقامت</p>

            <div className="mt-2 flex items-end gap-2">
              <span className="text-2xl font-bold text-primary500">
                {dailyPrice.toLocaleString("fa-IR")}
              </span>

              <span className="mb-1 text-sm text-gray-400">تومان / شب</span>
            </div>

            {property.pricing?.oldPrice &&
              property.pricing.oldPrice > dailyPrice && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-gray-400 line-through">
                    {property.pricing.oldPrice.toLocaleString("fa-IR")}
                  </span>

                  {property.pricing.discount && (
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-500">
                      {property.pricing.discount}٪ تخفیف
                    </span>
                  )}
                </div>
              )}

            <div className="my-6 border-t border-dashed border-gray-200 dark:border-gray-600" />

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">ظرفیت</span>

                <span className="font-medium dark:text-white">
                  {property.facilities?.capacity ?? 0} نفر
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">وضعیت</span>

                <span className="font-medium text-primary500">
                  {property.status === "available"
                    ? "آماده رزرو"
                    : "فعلاً قابل رزرو نیست"}
                </span>
              </div>
            </div>

            <Link
              href={`/single-reserve-house/${property._id}`}
              className={`mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-bold text-white transition ${
                property.status === "available"
                  ? "bg-primary500 hover:opacity-90"
                  : "pointer-events-none bg-gray-300"
              }`}
            >
              رزرو اقامتگاه
              <ChevronLeft size={18} />
            </Link>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
              <CheckCircle2 size={15} className="text-primary500" />
              رزرو امن و آنلاین
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
