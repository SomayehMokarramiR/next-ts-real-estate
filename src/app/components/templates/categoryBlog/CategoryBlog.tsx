"use client";

import { useState } from "react";

import Breadcrumb from "@/app/components/modules/breadcrumb/Breadcrumb";
import { useBlogs } from "@/hooks/useBlogs";

import FilterBar from "./FilterBar";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import { POSTS_PER_PAGE } from "./constants";

const SORT_MAP: Record<string, string> = {
  "آخرین بروزرسانی": "latest",
  جدیدترین: "newest",
  پربازدیدترین: "mostViewed",
};

const DEFAULT_SORT = "آخرین بروزرسانی";

export default function CategoryBlog() {
  const [sort, setSort] = useState(DEFAULT_SORT);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const sortValue = SORT_MAP[sort] ?? "latest";

  const { data, isLoading, isFetching, isError, error, refetch } = useBlogs({
    search: search.trim() || undefined,
    category: category || undefined,
    sort: sortValue,
    page,
    limit: POSTS_PER_PAGE,
  });

  const blogs = data?.blogs ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const currentPage = data?.currentPage ?? page;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setSort(DEFAULT_SORT);
    setPage(1);
  };

  return (
    <div>
      <Breadcrumb />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <FilterBar
          sort={sort}
          setSort={handleSortChange}
          search={search}
          setSearch={handleSearchChange}
          category={category}
          setCategory={handleCategoryChange}
          onReset={handleReset}
        />

        <div className="flex items-center justify-between mb-4" dir="rtl">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            <span className="font-semibold text-gray-800 dark:text-white">
              {total}
            </span>{" "}
            مقاله یافت شد
          </p>

          <div className="flex items-center gap-3">
            {isFetching && !isLoading && (
              <span className="text-xs text-primary500">
                در حال بروزرسانی...
              </span>
            )}

            <p className="text-xs text-gray-400">
              صفحه {currentPage} از {totalPages}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#272727] rounded-2xl overflow-hidden border border-gray-100 dark:border-[#353535] shadow-sm animate-pulse"
              >
                <div className="w-full h-44 sm:h-48 bg-gray-200 dark:bg-[#353535]" />

                <div className="p-4 space-y-3">
                  <div className="h-3 w-24 bg-gray-200 dark:bg-[#353535] rounded" />
                  <div className="h-4 w-4/5 bg-gray-200 dark:bg-[#353535] rounded" />
                  <div className="h-3 w-full bg-gray-200 dark:bg-[#353535] rounded" />
                  <div className="h-3 w-2/3 bg-gray-200 dark:bg-[#353535] rounded" />
                  <div className="h-10 w-full bg-gray-200 dark:bg-[#353535] rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-24 text-sm text-red-500" dir="rtl">
            <p className="mb-4">
              {error instanceof Error ? error.message : "خطا در دریافت مقالات"}
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="px-5 py-2 rounded-full bg-primary500 text-white text-sm"
            >
              تلاش مجدد
            </button>
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-400 text-sm" dir="rtl">
            مقاله‌ای یافت نشد. فیلترها را تغییر دهید.
          </div>
        )}

        {!isLoading && totalPages > 1 && (
          <Pagination
            current={currentPage}
            total={totalPages}
            onChange={(newPage) => {
              setPage(newPage);

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          />
        )}
      </main>
    </div>
  );
}
