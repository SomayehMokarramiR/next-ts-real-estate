"use client";

import PropertyCard from "../../modules/property/PropertyCard";
import { useBestProperties } from "@/hooks/useBestProperties";
import MainLayout from "../../layout/MainLayout";

export default function BestPropertiesPage() {
  const { data: properties = [], isLoading } = useBestProperties();

  return (
    <MainLayout>
      <main
        className="
          w-full
          pt-[80px]
          md:pt-[88px]
        "
      >
        <section
          className="
            bg-white
            dark:bg-[#272727]
            py-14
            px-4
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
              <p
                className="
                  text-primary500
                  text-sm
                  font-medium
                  mb-2
                "
              >
                همه جا ما با شما هستیم
              </p>

              <h1
                className="
                  text-gray-900
                  dark:text-white
                  text-3xl
                  md:text-4xl
                  font-extrabold
                "
              >
                بهترین اقامتگاه ها برای شما
              </h1>
            </div>

            {/* Loading */}
            {isLoading && (
              <p className="text-center text-gray-500">در حال بارگذاری...</p>
            )}

            {/* Empty */}
            {!isLoading && properties.length === 0 && (
              <p className="text-center text-gray-500">
                اقامتگاه ویژه‌ای برای نمایش وجود ندارد
              </p>
            )}

            {/* Properties */}
            {!isLoading && properties.length > 0 && (
              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-3
                  gap-6
                "
              >
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
