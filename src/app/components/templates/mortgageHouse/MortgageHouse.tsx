"use client";

import { useState } from "react";

import PropertyCard from "./PropertyCard";
import { ITEMS_PER_PAGE } from "./constants";
import { TOTAL_PAGES } from "./constants";
import { properties } from "./constants";
import Pagination from "./Pagination";

export default function MortgageHouse() {
  const [page, setPage] = useState(1);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const visibleProperties = properties.slice(
    start % properties.length,
    (start % properties.length) + ITEMS_PER_PAGE > properties.length
      ? properties.length
      : (start % properties.length) + ITEMS_PER_PAGE,
  );
  // always show all 9 for demo
  const display = properties;

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mt-1">
            {`صفحه ${page} از ${TOTAL_PAGES} — نمایش ${display.length} ملک`}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {display.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination current={page} total={TOTAL_PAGES} onChange={setPage} />
      </div>
    </div>
  );
}
