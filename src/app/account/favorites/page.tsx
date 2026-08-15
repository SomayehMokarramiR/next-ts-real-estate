"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import { useFavorites } from "@/hooks/useFavorites";
import PropertyCard from "../../components/modules/property/PropertyCard";

export default function FavoritesPage() {
  const { data, isLoading, isError } = useFavorites();

  // Loading
  if (isLoading) {
    return (
      <div
        className="
          min-h-[400px]
          flex
          items-center
          justify-center
          text-gray-500
        "
      >
        در حال دریافت علاقه‌مندی‌ها...
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div
        className="
          min-h-[400px]
          flex
          flex-col
          items-center
          justify-center
          gap-4
        "
      >
        <p className="text-red-500">خطا در دریافت علاقه‌مندی‌ها</p>

        <Link
          href="/login"
          className="
            text-primary500
            font-bold
          "
        >
          ورود به حساب کاربری
        </Link>
      </div>
    );
  }

  const favorites = data?.favorites ?? [];

  // Empty
  if (favorites.length === 0) {
    return (
      <div
        className="
          min-h-[450px]
          flex
          flex-col
          items-center
          justify-center
          gap-4
          text-center
        "
      >
        <Heart size={70} className="text-gray-300" />

        <h1
          className="
            text-xl
            font-bold
            text-gray-800
            dark:text-white
          "
        >
          علاقه‌مندی‌ها خالی است
        </h1>

        <p className="text-sm text-gray-500">
          ملک‌هایی که ذخیره می‌کنید اینجا نمایش داده می‌شوند
        </p>

        <Link
          href="/properties"
          className="
            mt-2
            bg-primary500
            text-white
            px-6
            py-2.5
            rounded-xl
            text-sm
          "
        >
          مشاهده ملک‌ها
        </Link>
      </div>
    );
  }

  // List
  return (
    <div
      className="
        w-full
        px-4
        py-6
      "
    >
      <div
        className="
          flex
          items-center
          justify-end
          gap-2
          mb-6
        "
      >
        <h1
          className="
            text-xl
            font-bold
            text-gray-900
            dark:text-white
          "
        >
          علاقه‌مندی‌های من
        </h1>

        <Heart
          size={25}
          className="
            fill-red-500
            text-red-500
          "
        />
      </div>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >
        {favorites.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
}
