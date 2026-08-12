"use client";

import { useRef } from "react";
import Link from "next/link";

import PropertyCard from "./PropertyCard";
import { useProperties } from "@/hooks/useProperties";

export default function PropertySection() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading } = useProperties();

  // ======================================
  // API DATA
  // ======================================

  const properties = data?.properties ?? [];

  // فقط ۵ ملک برای Preview لندینگ
  const visibleProperties = properties.slice(0, 5);

  return (
    <section
      dir="rtl"
      className="
        bg-white
        dark:bg-[#272727]
        py-16
        sm:py-20
      "
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="
              text-primary500
              text-sm
              font-bold
              mb-2
              tracking-wide
              font-primary-font-bold
            "
          >
            فقط بگرد و پیدا کن
          </p>

          <h2
            className="
              text-gray-900
              dark:text-white
              text-2xl
              sm:text-3xl
              md:text-4xl
              font-extrabold
              font-primary-font-semibold
            "
          >
            هر ملکی بخوای اینجا پیدا میشه!
          </h2>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-10">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              در حال بارگذاری املاک...
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && visibleProperties.length === 0 && (
          <div className="flex justify-center py-10">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              ملکی برای نمایش وجود ندارد.
            </p>
          </div>
        )}

        {/* Cards */}
        {!isLoading && visibleProperties.length > 0 && (
          <div
            ref={scrollRef}
            className="
              flex
              flex-wrap
              justify-center
              gap-4
              pb-4
              scrollbar-hide
            "
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {visibleProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}

        {/* More Button */}
        {!isLoading && properties.length > 0 && (
          <div className="flex justify-center mt-10">
            <Link
              href="/properties"
              className="
                inline-flex
                items-center
                justify-center
                border
                border-primary500
                text-primary500
                hover:bg-primary500
                hover:text-white
                rounded-full
                px-8
                py-2.5
                text-sm
                font-semibold
                transition-colors
              "
            >
              مشاهده بیشتر
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
