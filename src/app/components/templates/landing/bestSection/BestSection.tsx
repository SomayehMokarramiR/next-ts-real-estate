"use client";

import Link from "next/link";
import PropertyCard from "../../../modules/property/PropertyCard";
import { useLandingBestProperties } from "@/hooks/useLandingBestProperties.ts";

export default function BestSection() {
  const { data: properties = [], isLoading } = useLandingBestProperties();

  // فقط 3 مورد برای نمایش در Landing
  const visibleProperties = properties.slice(0, 3);

  return (
    <section className="bg-white dark:bg-[#272727] py-14 px-4">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm font-medium mb-1 text-primary500">
            همه جا ما با شما هستیم
          </p>

          <h2
            className="
              text-gray-900
              dark:text-white
              font-extrabold
              text-[28px]
              md:text-3xl
            "
          >
            بهترین اقامتگاه ها برای شما
          </h2>
        </div>

        {/* Loading */}
        {isLoading && (
          <p className="text-center text-gray-500">در حال بارگذاری...</p>
        )}

        {/* Empty */}
        {!isLoading && visibleProperties.length === 0 && (
          <p className="text-center text-gray-500">
            اقامتگاهی برای نمایش وجود ندارد
          </p>
        )}

        {/* Cards */}
        {!isLoading && visibleProperties.length > 0 && (
          <div
            className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-5
      mb-10
    "
          >
            {visibleProperties.map((property, index) => (
              <div
                key={property._id}
                className={`
          w-full
          ${
            index === 2 ? "sm:col-span-2 lg:col-span-1 flex justify-center" : ""
          }
        `}
              >
                <div
                  className={`
            w-full
            ${index === 2 ? "sm:max-w-[calc(50%-10px)] lg:max-w-none" : ""}
          `}
                >
                  <PropertyCard property={property} />
                </div>
              </div>
            ))}
          </div>
        )}
        {/* More Button */}
        {properties.length > 3 && (
          <div className="flex justify-center">
            <Link
              href="/best-properties"
              className="
                px-8
                py-2
                rounded-full
                border
                border-primary500
                text-primary500
                text-sm
                font-medium
                transition
                hover:bg-primary500
                hover:text-white
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
