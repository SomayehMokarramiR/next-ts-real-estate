"use client";

import PropertyCard from "../../modules/property/PropertyCard";

import MainLayout from "../../layout/MainLayout";

import { useBestProperties } from "@/hooks/useBestProperties";

export default function BestPropertiesPage() {
  const {
    data: properties = [],
    isLoading,
    isError,
    error,
  } = useBestProperties();

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
            px-4
            py-14
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-7xl
            "
          >
            {/* HEADER */}

            <div className="mb-10 text-center">
              <p
                className="
                  mb-2
                  text-sm
                  font-medium
                  text-primary500
                "
              >
                همه جا ما با شما هستیم
              </p>

              <h1
                className="
                  text-3xl
                  font-extrabold
                  text-gray-900
                  dark:text-white
                  md:text-4xl
                "
              >
                بهترین اقامتگاه ها برای شما
              </h1>

              <p
                className="
                  mt-3
                  text-sm
                  text-gray-500
                  dark:text-gray-300
                "
              >
                محبوب‌ترین املاک بر اساس بازدید، امتیاز و رزرو کاربران
              </p>
            </div>

            {/* ERROR */}

            {isError && (
              <div
                className="
                  py-20
                  text-center
                "
              >
                <p
                  className="
                    text-red-500
                  "
                >
                  {error.message}
                </p>
              </div>
            )}

            {/* LOADING */}

            {isLoading && (
              <div
                className="
                  grid
                  grid-cols-1
                  gap-6
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >
                {Array.from({
                  length: 6,
                }).map((_, index) => (
                  <div
                    key={index}
                    className="
                      h-96
                      animate-pulse
                      rounded-2xl
                      bg-gray-200
                      dark:bg-[#353535]
                    "
                  />
                ))}
              </div>
            )}

            {/* EMPTY */}

            {!isLoading && !isError && properties.length === 0 && (
              <div
                className="
                  py-20
                  text-center
                  text-gray-500
                "
              >
                اقامتگاه ویژه‌ای برای نمایش وجود ندارد
              </div>
            )}

            {/* PROPERTIES */}

            {!isLoading && !isError && properties.length > 0 && (
              <div
                className="
                  grid
                  grid-cols-1
                  gap-6
                  sm:grid-cols-2
                  lg:grid-cols-3
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
