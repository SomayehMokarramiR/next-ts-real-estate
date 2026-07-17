"use client";

import { useState } from "react";

import PropertyHeader from "./PropertyHeader";
import DescriptionSection from "./DescriptionSection";
import BookingSidebar from "./BookingSidebar";
import AmenitiesGrid from "./AmenitiesGrid";
import S3ListingSection from "./S3ListingSection";
import { properties, TOTAL_PAGES } from "./constants";
import PropertyCard from "./PropertyCard";
import Pagination from "./Pagination";
import CommentsSection from "./CommentsSection";

/* ─── App ─────────────────────────────────────────────── */
export default function SingleFastReserve() {
  const [page, setPage] = useState(1);

  return (
    <div>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* ── Section 1: Property Header + Gallery ── */}
        <PropertyHeader />

        {/* ── Section 2: Description + Sidebar ── */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="flex-1 min-w-0 space-y-4">
            <DescriptionSection />
            <CommentsSection />
          </div>
          <div className="w-full lg:w-72 xl:w-80 shrink-0">
            <BookingSidebar />
            <AmenitiesGrid />
          </div>
        </div>

        {/* ── Section 3: S3 Compact Cards (S3.JPG) ── */}
        <S3ListingSection />

        {/* ── Section 4: Full Listing Grid ── */}
        {/* <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-1">
            آگهی‌های اجاره ملک
          </h2>
          <p className="text-sm text-gray-500">{`صفحه ${page} از ${TOTAL_PAGES} — نمایش ${properties.length} ملک`}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div> */}
        {/* <Pagination current={page} total={TOTAL_PAGES} onChange={setPage} /> */}
      </div>
    </div>
  );
}
