"use client";
import { useState } from "react";
import Breadcrumb from "@/app/components/modules/breadcrumb/Breadcrumb";
import FilterBar from "./FilterBar";
import PropertyCard from "./PropertyCard";
import Pagination from "./Pagination";
import { POSTS_PER_PAGE, PROPERTIES } from "./constants";

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function CategoryBlog() {
  const [sort, setSort] = useState("اخرین بروز رسانی");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const filtered = PROPERTIES.filter((p) => {
    const matchSearch = search === "" || p.title.includes(search);
    const matchCat = category === "" || p.type === category;
    return matchSearch && matchCat;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <div>
      <Breadcrumb />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <FilterBar
          sort={sort}
          setSort={setSort}
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
        />

        {/* Results count */}
        <div className="flex items-center justify-between mb-4" dir="rtl">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-800">
              {filtered.length}
            </span>
            آگهی یافت شد
          </p>
          <p className="text-xs text-gray-400">
            صفحه {currentPage} از {totalPages}
          </p>
        </div>

        {/* Grid 3 × 4 */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((prop) => (
              <PropertyCard key={prop.id} prop={prop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-400 text-sm" dir="rtl">
            آگهی‌ای یافت نشد. فیلترها را تغییر دهید.
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            current={currentPage}
            total={totalPages}
            onChange={(p) => {
              setPage(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </main>
    </div>
  );
}
