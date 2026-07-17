"use client";

import { useState } from "react";

import PropertyHeader from "./PropertyHeader";
import DescriptionSection from "./DescriptionSection";
import BookingSidebar from "./BookingSidebar";
import AmenitiesGrid from "./AmenitiesGrid";
import FeaturesSection from "./FeaturesSection";
import S3ListingSection from "./S3ListingSection";
import Pagination from "./Pagination";
import CommentsSection from "./CommentsSection";
import CommentsSection2 from "./CommentsSection2";

/* ─── App ─────────────────────────────────────────────── */
export default function SingleFastReserve() {
  const [page, setPage] = useState(1);

  return (
    <div>
      <div className="mx-auto px-4 py-8">
        {/* ── Section 1: Property Header + Gallery ── */}
        <PropertyHeader />

        {/* ── Section 2: Description + Sidebar ── */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="flex-1 min-w-0 space-y-4">
            <DescriptionSection />
            {/* <CommentsSection /> */}
            <CommentsSection2 />
          </div>
          <div className="w-full lg:w-72 xl:w-80 shrink-0">
            <BookingSidebar />
            {/* <AmenitiesGrid /> */}
            <FeaturesSection />
          </div>
        </div>

        <S3ListingSection />
      </div>
    </div>
  );
}
