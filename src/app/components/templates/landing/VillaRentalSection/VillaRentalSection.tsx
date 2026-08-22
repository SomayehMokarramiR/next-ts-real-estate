"use client";

import Image from "next/image";
import Link from "next/link";

import { useProperties } from "@/hooks/useProperties";

export default function VillaRentalSection() {
  const { data, isLoading } = useProperties({
    limit: "10",
    type: "villa",
  });

  // ======================================
  // API DATA
  // ======================================

  const properties = Array.isArray(data)
    ? data
    : Array.isArray(data?.properties)
      ? data.properties
      : [];
  console.log("VILLA DATA:", properties);

  // فقط ۴ ویلا برای لندینگ
  const visibleVillas = properties.slice(0, 4);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            ویلا را با ما انتخاب کنید
          </h2>

          <p className="text-gray-500 mt-2">
            اجاره ویلا در محبوب ترین مقاصد ایران
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <p className="text-center text-gray-500">در حال بارگذاری...</p>
        )}

        {/* Empty */}
        {!isLoading && visibleVillas.length === 0 && (
          <p className="text-center text-gray-500">
            ویلایی برای نمایش وجود ندارد
          </p>
        )}

        {/* Cards */}
        {!isLoading && visibleVillas.length > 0 && (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-5
              w-full
            "
          >
            {visibleVillas.map((villa) => (
              <Link
                key={villa._id}
                href={`/properties/${villa._id}`}
                className="
                  relative
                  rounded-2xl
                  overflow-hidden
                  cursor-pointer
                  group
                  shadow-sm
                  hover:shadow-lg
                  transition
                  block
                  w-full
                "
              >
                <Image
                  src={villa.images?.[0] || "/images/placeholder.jpg"}
                  alt={villa.title || "ویلا"}
                  width={600}
                  height={350}
                  className="
                    w-full
                    h-56
                    object-cover
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />

                <div
                  className="
    absolute
    bottom-3
    right-3
    left-3
    rounded-2xl
    bg-white/95
    dark:bg-[#353535]
    backdrop-blur-sm
    px-4
    py-3
    shadow-lg
  "
                >
                  <h3
                    className="
      text-sm
      font-bold
      text-gray-900
      dark:text-white
      truncate
    "
                  >
                    {villa.title || "ویلای زیبا"}
                  </h3>

                  <p
                    className="
      mt-2
      text-xs
      text-gray-600
      dark:text-gray-300
      line-clamp-2
      min-h-[32px]
    "
                  >
                    {villa.description || "اقامتگاه زیبا و مجهز"}
                  </p>

                  <div
                    className="
      mt-3
      flex
      items-center
      justify-between
      gap-2
    "
                  >
                    <span
                      className="
        text-xs
        font-medium
        text-gray-700
        dark:text-gray-200
      "
                    >
                      {villa.location?.city || "نامشخص"}
                    </span>

                    {villa.facilities?.capacity &&
                      villa.facilities.capacity > 0 && (
                        <span
                          className="
            rounded-full
            bg-primary500
            px-3
            py-1
            text-xs
            font-semibold
            text-white
          "
                        >
                          {villa.facilities.capacity} نفر
                        </span>
                      )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* More Button */}
        <div className="flex justify-center mt-8">
          <Link
            href="/properties?type=villa"
            className="
              border
              border-primary500
              rounded-full
              px-8
              py-2.5
              text-sm
              text-primary500
              hover:bg-primary500
              hover:text-white
              transition
            "
          >
            مشاهده بیشتر
          </Link>
        </div>
      </div>
    </section>
  );
}
