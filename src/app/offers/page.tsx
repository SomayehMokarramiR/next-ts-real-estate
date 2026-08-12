"use client";

import OfferCard from "../components/templates/landing/offersSection/OfferCard";
import MainLayout from "../components/layout/MainLayout";
import { useProperties } from "@/hooks/useProperties";

export default function OffersPage() {
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

  const discountedProperties = properties.filter(
    (property) => Number(property.pricing?.discount ?? 0) > 0,
  );

  // ======================================
  // DEBUG
  // ======================================

  console.log("=== OFFERS PAGE ===");
  console.log("data:", data);
  console.log("properties:", properties);
  console.log("properties count:", properties.length);
  console.log("discounted properties:", discountedProperties);
  console.log("discounted count:", discountedProperties.length);

  // ======================================
  // PAGE
  // ======================================

  return (
    <MainLayout>
      <main
        className="
          w-full
          bg-white
          dark:bg-[#272727]
        "
      >
        <section
          className="
            w-full
            px-4
            sm:px-6
            py-12
            md:py-14
          "
        >
          <div
            className="
              w-full
              max-w-7xl
              mx-auto
            "
          >
            {/* Header */}
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
                  text-gray-500
                  dark:text-gray-300
                "
              >
                بهترین پیشنهادهای اقامت با تخفیف‌های ویژه
              </p>
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="flex justify-center py-16">
                <p className="text-center text-gray-500 dark:text-gray-300">
                  در حال بارگذاری...
                </p>
              </div>
            )}

            {/* Error */}
            {!isLoading && error && (
              <div className="flex justify-center py-16">
                <p className="text-center text-red-500">
                  خطا در دریافت تخفیف‌ها
                </p>
              </div>
            )}

            {/* Empty */}
            {!isLoading && !error && discountedProperties.length === 0 && (
              <div className="flex justify-center py-16">
                <p className="text-center text-gray-500 dark:text-gray-300">
                  در حال حاضر تخفیف ویژه‌ای وجود ندارد
                </p>
              </div>
            )}

            {/* Cards */}
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
                  <OfferCard key={property._id} offer={property} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
