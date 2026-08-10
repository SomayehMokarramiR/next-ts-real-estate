"use client";

import { Clock } from "lucide-react";
import useCountdown from "./hooks/useCountdown";
import OfferCard from "./OfferCard";
import { useProperties } from "@/hooks/useProperties";
import { useRouter } from "next/navigation";

export default function OffersSection() {
  const timer = useCountdown(2 * 3600 + 25 * 60 + 20);
  const { data: properties = [], isLoading } = useProperties();
  const router = useRouter();

  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 py-8 bg-white dark:bg-[#272727]">
        {/* Header */}
        <div className="mb-10">
          {/* Eyebrow row */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md shadow-blue-500/30">
              <Clock size={13} />
              <span style={{ fontFamily: "monospace" }}>{timer}</span>
            </div>
            <span className="text-red-500 text-[16px] font-primary-font-bold">
              فرصت رو از دست نده
            </span>
          </div>

          {/* Title */}
          <h2 className="text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl font-extrabold text-center font-primary-font-semibold">
            تخفیفات ویژه برای شروع تابستان
          </h2>
        </div>

        {/* Cards grid */}
        <div
          className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    gap-6
    justify-items-center
  "
        >
          {isLoading ? (
            <p className="text-center col-span-full">در حال بارگذاری...</p>
          ) : (
            properties.map((property, index) => (
              <div
                key={property._id}
                className={`
          w-full
          ${
            properties.length % 3 === 1 && index === properties.length - 1
              ? "lg:col-start-2"
              : ""
          }
        `}
              >
                <OfferCard offer={property} />
              </div>
            ))
          )}
        </div>

        {/* See more button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => router.push("/offers")}
            className="border border-primary500 hover:border-primary600 hover:text-primary600 text-primary500 text-sm font-semibold px-8 py-3 rounded-full transition-colors duration-200"
          >
            مشاهده بیشتر
          </button>
        </div>
      </div>
    </section>
  );
}
