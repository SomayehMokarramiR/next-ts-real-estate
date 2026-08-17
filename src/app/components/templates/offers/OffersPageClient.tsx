"use client";

import OfferCard from "@/app/components/templates/landing/offersSection/OfferCard";
import { useProperties } from "@/hooks/useProperties";

export default function OffersPageClient() {
  const { data, isLoading, error } = useProperties({
    page: "1",
    limit: "50",
  });

  // ======================================
  // API DATA
  // ======================================

  const properties = Array.isArray(data)
    ? data
    : Array.isArray(data?.properties)
      ? data.properties
      : [];

  // ======================================
  // DISCOUNTED PROPERTIES
  // ======================================

  const discountedProperties = properties.filter((property) => {
    const discount = Number(property.pricing?.discount ?? 0);

    return Number.isFinite(discount) && discount > 0;
  });

  // ======================================
  // PAGE
  // ======================================

  return (
    <section
      dir="rtl"
      className="
        w-full
        bg-white
        dark:bg-[#272727]
        px-4
        sm:px-6
        pt-24
        md:pt-28
        pb-12
        md:pb-14
      "
    >
      <div
        className="
          w-full
          max-w-7xl
          mx-auto
        "
      >
        {/* ==============================
            HEADER
        ============================== */}

        <div className="text-center mb-10">
          <h1
            className="
              text-3xl
              md:text-4xl
              font-extrabold
              text-gray-900
              dark:text-white
            "
          >
            تخفیفات ویژه
          </h1>

          <p
            className="
              mt-3
              text-primary500
              dark:text-gray-300
            "
          >
            بهترین پیشنهادهای اقامت با تخفیف‌های ویژه
          </p>
        </div>

        {/* ==============================
            LOADING
        ============================== */}

        {isLoading && (
          <div className="flex justify-center py-16">
            <p className="text-center text-gray-500 dark:text-gray-300">
              در حال بارگذاری...
            </p>
          </div>
        )}

        {/* ==============================
            ERROR
        ============================== */}

        {!isLoading && error && (
          <div className="flex justify-center py-16">
            <p className="text-center text-red-500">خطا در دریافت تخفیف‌ها</p>
          </div>
        )}

        {/* ==============================
            EMPTY
        ============================== */}

        {!isLoading && !error && discountedProperties.length === 0 && (
          <div className="flex justify-center py-16">
            <p className="text-center text-gray-500 dark:text-gray-300">
              در حال حاضر تخفیفی برای نمایش وجود ندارد
            </p>
          </div>
        )}

        {/* ==============================
            OFFERS
        ============================== */}

        {!isLoading && !error && discountedProperties.length > 0 && (
          <div
            className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
          >
            {discountedProperties.map((property) => (
              <div key={property._id} className="w-full">
                <OfferCard offer={property} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
