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
    block
    overflow-hidden
    rounded-2xl
    group
    shadow-sm
    hover:shadow-lg
    transition
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
      rounded-xl
      bg-white/95
      dark:bg-[#353535]/95
      px-3
      py-2
      shadow-md
      backdrop-blur-sm
    "
                >
                  <div className="flex items-start justify-between gap-2">
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

                    {villa.facilities?.capacity &&
                      villa.facilities.capacity > 0 && (
                        <span
                          className="
              shrink-0
              rounded-full
              bg-primary500
              px-2
              py-1
              text-[10px]
              font-semibold
              text-white
            "
                        >
                          {villa.facilities.capacity} نفر
                        </span>
                      )}
                  </div>

                  <div
                    className="
        mt-1
        text-xs
        text-gray-500
        dark:text-gray-400
      "
                  >
                    {villa.location?.city || "نامشخص"}
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
