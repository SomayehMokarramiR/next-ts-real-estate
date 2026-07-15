"use client";

import { Clock } from "lucide-react";
import { OFFERS } from "./constants";
import useCountdown from "./hooks/useCountdown";
import OfferCard from "./OfferCard";

export default function OffersSection() {
  const timer = useCountdown(2 * 3600 + 25 * 60 + 20);

  return (
    <section>
      <div className="max-w-7xl mx-auto px-6">
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
          <h2 className="text-gray-900 text-2xl sm:text-3xl md:text-4xl font-extrabold text-center font-primary-font-semibold">
            تخفیفات ویژه برای شروع تابستان
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFERS.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        {/* See more button */}
        <div className="flex justify-center mt-10">
          <button className="border border-primary500 hover:border-primary600 hover:text-primary600 text-primary500 text-sm font-semibold px-8 py-3 rounded-full transition-colors duration-200">
            مشاهده بیشتر
          </button>
        </div>
      </div>
    </section>
  );
}
