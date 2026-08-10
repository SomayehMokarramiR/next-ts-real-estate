"use client";

import OfferCard from "../components/templates/landing/offersSection/OfferCard";
import { useProperties } from "@/hooks/useProperties";

export default function OffersPage() {
  const { data: properties = [], isLoading } = useProperties();

  const discountedProperties = properties.filter(
    (property) => property.pricing?.discount && property.pricing.discount > 0,
  );

  return (
    <main className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          تخفیفات ویژه
        </h1>

        <p className="mt-3 text-gray-500 dark:text-gray-300">
          بهترین پیشنهادهای اقامت با تخفیف‌های ویژه
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <p className="text-center text-gray-500">در حال بارگذاری...</p>
      )}

      {/* Empty */}
      {!isLoading && discountedProperties.length === 0 && (
        <p className="text-center text-gray-500">
          در حال حاضر تخفیف ویژه‌ای وجود ندارد
        </p>
      )}

      {/* Cards */}
      {!isLoading && discountedProperties.length > 0 && (
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
    </main>
  );
}
