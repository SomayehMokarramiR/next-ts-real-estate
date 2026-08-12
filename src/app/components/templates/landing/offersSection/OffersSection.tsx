"use client";

import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";

import useCountdown from "./hooks/useCountdown";
import OfferCard from "./OfferCard";
import { useProperties } from "@/hooks/useProperties";

export default function OffersSection() {
  const timer = useCountdown(2 * 3600 + 25 * 60 + 20);
  const router = useRouter();

  // ======================================
  // GET PROPERTIES
  // ======================================

  const { data, isLoading, error } = useProperties({
    page: "1",
    limit: "100",
  });

  // ======================================
  // API DATA
  // ======================================

  const properties = data?.properties ?? [];

  // ======================================
  // DISCOUNTED PROPERTIES
  // ======================================

  const discountedProperties = properties.filter((property) => {
    const discount = Number(property.pricing?.discount ?? 0);

    return discount > 0;
  });

  // فقط ۳ مورد برای لندینگ
  const visibleOffers = discountedProperties.slice(0, 3);

  // ======================================
  // DEBUG
  // ======================================

  console.log("=== OFFERS SECTION ===");
  console.log("API DATA:", data);
  console.log("ALL PROPERTIES:", properties);
  console.log("ALL PROPERTIES COUNT:", properties.length);
  console.log("DISCOUNTED:", discountedProperties);
  console.log("DISCOUNTED COUNT:", discountedProperties.length);

  // ======================================
  // RENDER
  // ======================================

  return (
    <section className="w-full bg-white dark:bg-[#272727]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-10">
          {/* Timer */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div
              className="
                flex
                items-center
                gap-1.5
                bg-blue-600
                text-white
                text-xs
                font-bold
                px-3
                py-1.5
                rounded-full
                shadow-md
                shadow-blue-500/30
              "
            >
              <Clock size={13} />

              <span style={{ fontFamily: "monospace" }}>{timer}</span>
            </div>

            <span className="text-red-500 text-[16px] font-primary-font-bold">
              فرصت رو از دست نده
            </span>
          </div>

          {/* Title */}
          <h2
            className="
              text-gray-900
              dark:text-white
              text-2xl
              sm:text-3xl
              md:text-4xl
              font-extrabold
              text-center
              font-primary-font-semibold
            "
          >
            تخفیفات ویژه برای شروع تابستان
          </h2>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-10">
            <p className="text-center text-gray-500 dark:text-gray-300">
              در حال بارگذاری...
            </p>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="flex justify-center py-10">
            <p className="text-center text-red-500">خطا در دریافت تخفیف‌ها</p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && discountedProperties.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-center text-gray-500 dark:text-gray-300">
              در حال حاضر تخفیفی برای نمایش وجود ندارد
            </p>
          </div>
        )}

        {/* Cards */}
        {!isLoading && !error && visibleOffers.length > 0 && (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-6
            "
          >
            {visibleOffers.map((property, index) => (
              <div
                key={property._id}
                className={`
                  w-full

                  ${
                    visibleOffers.length === 3 && index === 2
                      ? `
                        sm:col-span-2
                        sm:flex
                        sm:justify-center
                        lg:col-span-1
                        lg:block
                      `
                      : ""
                  }
                `}
              >
                <OfferCard offer={property} />
              </div>
            ))}
          </div>
        )}

        {/* More Button */}
        {!isLoading && !error && discountedProperties.length > 3 && (
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={() => router.push("/offers")}
              className="
                  border
                  border-primary500
                  hover:bg-primary500
                  hover:text-white
                  text-primary500
                  text-sm
                  font-semibold
                  px-8
                  py-3
                  rounded-full
                  transition-colors
                  duration-200
                "
            >
              مشاهده بیشتر
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
