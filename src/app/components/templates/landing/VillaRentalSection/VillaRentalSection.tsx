"use client";

import Image from "next/image";
import { useProperties } from "@/hooks/useProperties";
import Link from "next/link";

export default function VillaRentalSection() {
  const { data: properties = [], isLoading } = useProperties();

  const villas = properties.filter((property) => property.type === "villa");

  // فقط ۴ ویلا در لندینگ نمایش داده شود
  const visibleVillas = villas.slice(0, 4);

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
        {!isLoading && villas.length === 0 && (
          <p className="text-center text-gray-500">
            ویلایی برای نمایش وجود ندارد
          </p>
        )}

        {/* Cards */}
        {!isLoading && villas.length > 0 && (
          <div
            className={`
      grid gap-5

      ${
        visibleVillas.length === 1
          ? "grid-cols-1 max-w-md mx-auto"
          : visibleVillas.length === 2
            ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      }
    `}
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
        "
              >
                <Image
                  src={villa.images?.[0] || "/images/placeholder.jpg"}
                  alt={villa.title}
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

                {/* Overlay */}
                <div
                  className="
            absolute
            bottom-3
            right-3
            left-3
            flex
            items-center
            justify-between
            bg-white/90
            dark:bg-[#353535]
            backdrop-blur-sm
            rounded-full
            px-3
            py-2
            shadow
          "
                >
                  <span
                    className="
              text-gray-800
              dark:text-white
              text-xs
              font-medium
              truncate
            "
                  >
                    {villa.location?.city}
                  </span>

                  <span
                    className="
              bg-primary500
              text-white
              text-xs
              font-semibold
              rounded-full
              px-3
              py-1
            "
                  >
                    {villa.facilities?.capacity ?? 0} نفر
                  </span>
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
