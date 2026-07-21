"use client";

import { useRef } from "react";
import PropertyCard from "./PropertyCard";
import { PROPERTIES } from "./constants";

export default function PropertySection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      dir="rtl"
      className="
      bg-white dark:bg-[#272727]
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

        {/* Cards */}
        <div
          ref={scrollRef}
          className="
          flex
          gap-4
          overflow-x-auto
          pb-4
          scrollbar-hide
          "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {PROPERTIES.map((p) => (
            <PropertyCard key={p.id} property={p} active={p.active} />
          ))}
        </div>
      </div>
    </section>
  );
}
