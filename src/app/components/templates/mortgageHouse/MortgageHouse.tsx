"use client";

import { useState } from "react";

import PropertyCard from "../../modules/property/PropertyCard";
import Pagination from "./Pagination";

import Search from "../../modules/search/Search";
import { SearchField } from "../../modules/search/types";
import Breadcrumb from "../../modules/breadcrumb/Breadcrumb";

import { useProperties } from "@/hooks/useProperties";

export default function MortgageHouse() {
  // ======================================
  // PAGINATION
  // ======================================

  const [page, setPage] = useState(1);

  const limit = 6;

  // ======================================
  // FILTERS
  // ======================================

  const [filters, setFilters] = useState<Record<string, string>>({});

  // ======================================
  // NORMALIZE FILTERS
  // ======================================

  const normalizeFilters = (values: Record<string, string>) => {
    const result: Record<string, string> = {};

    Object.entries(values).forEach(([key, value]) => {
      if (!value) return;

      // ======================================
      // TRANSACTION TYPE
      // ======================================

      if (key === "transactionType") {
        if (value === "رهن کامل") {
          result.transactionType = "mortgage";
        }

        if (value === "رهن و اجاره") {
          result.transactionType = "rent-mortgage";
        }

        if (value === "اجاره") {
          result.transactionType = "rent";
        }

        return;
      }

      // ======================================
      // RENT / MORTGAGE / AREA NUMBERS
      // ======================================

      if (
        key === "minRent" ||
        key === "maxRent" ||
        key === "minMortgage" ||
        key === "maxMortgage" ||
        key === "minArea" ||
        key === "maxArea"
      ) {
        const number = Number(value.replace(/[^\d]/g, ""));

        if (!Number.isNaN(number)) {
          result[key] = String(number);
        }

        return;
      }

      // ======================================
      // NORMAL VALUES
      // ======================================

      result[key] = value;
    });

    return result;
  };

  // ======================================
  // SEARCH FIELDS
  // ======================================

  const searchFields: SearchField[] = [
    // ======================================
    // SEARCH
    // ======================================

    {
      type: "input",
      label: "جستجو",
      placeholder: "جستجو کنید...",
      key: "search",
    },

    // ======================================
    // SORT
    // ======================================

    {
      type: "select",
      label: "مرتب سازی براساس",
      placeholder: "انتخاب کنید",
      key: "sort",
      options: [
        "محبوب‌ترین",
        "کمترین اجاره",
        "بیشترین اجاره",
        "کمترین رهن",
        "بیشترین رهن",
        "کمترین متراژ",
        "بیشترین متراژ",
      ],
    },

    // ======================================
    // CITY
    // ======================================

    {
      type: "select",
      label: "محل مورد نظر",
      placeholder: "انتخاب کنید",
      key: "city",
      options: ["محمودآباد", "ساری", "بابلسر", "نوشهر", "چالوس", "آمل"],
    },

    // ======================================
    // TRANSACTION TYPE
    // ======================================

    {
      type: "select",
      label: "نوع معامله",
      placeholder: "انتخاب کنید",
      key: "transactionType",
      options: ["رهن کامل", "رهن و اجاره", "اجاره"],
    },

    // ======================================
    // MIN MORTGAGE
    // ======================================

    {
      type: "select",
      label: "حداقل رهن",
      placeholder: "انتخاب کنید",
      key: "minMortgage",
      options: [
        "100 میلیون",
        "200 میلیون",
        "300 میلیون",
        "400 میلیون",
        "500 میلیون",
        "700 میلیون",
        "1 میلیارد",
      ],
    },

    // ======================================
    // MAX MORTGAGE
    // ======================================

    {
      type: "select",
      label: "حداکثر رهن",
      placeholder: "انتخاب کنید",
      key: "maxMortgage",
      options: [
        "200 میلیون",
        "300 میلیون",
        "400 میلیون",
        "500 میلیون",
        "700 میلیون",
        "1 میلیارد",
        "2 میلیارد",
      ],
    },

    // ======================================
    // MIN RENT
    // ======================================

    {
      type: "select",
      label: "حداقل اجاره",
      placeholder: "انتخاب کنید",
      key: "minRent",
      options: [
        "1 میلیون",
        "5 میلیون",
        "10 میلیون",
        "20 میلیون",
        "30 میلیون",
        "50 میلیون",
        "100 میلیون",
      ],
    },

    // ======================================
    // MAX RENT
    // ======================================

    {
      type: "select",
      label: "حداکثر اجاره",
      placeholder: "انتخاب کنید",
      key: "maxRent",
      options: [
        "5 میلیون",
        "10 میلیون",
        "20 میلیون",
        "30 میلیون",
        "50 میلیون",
        "100 میلیون",
        "200 میلیون",
      ],
    },

    // ======================================
    // MIN AREA
    // ======================================

    {
      type: "select",
      label: "حداقل متراژ",
      placeholder: "انتخاب کنید",
      key: "minArea",
      options: ["50", "100", "150", "200", "300", "500"],
    },

    // ======================================
    // MAX AREA
    // ======================================

    {
      type: "select",
      label: "حداکثر متراژ",
      placeholder: "انتخاب کنید",
      key: "maxArea",
      options: ["100", "150", "200", "300", "500", "1000"],
    },

    // ======================================
    // APPLY
    // ======================================

    {
      type: "button",
      label: "اعمال فیلتر",
    },
  ];

  // ======================================
  // GET PROPERTIES
  // ======================================

  const { data, isLoading, error } = useProperties({
    // پیش‌فرض صفحه
    transactionType: filters.transactionType || "rent-mortgage",

    // pagination
    page: String(page),
    limit: String(limit),

    // filters
    ...filters,
  });

  // ======================================
  // API DATA
  // ======================================

  const properties = data?.properties ?? [];

  const total = data?.total ?? 0;

  const totalPages = data?.totalPages ?? 1;

  // ======================================
  // APPLY SEARCH
  // ======================================

  const handleSearch = (values: Record<string, string>) => {
    const normalized = normalizeFilters(values);

    console.log("SEARCH VALUES ===>", values);

    console.log("NORMALIZED FILTERS ===>", normalized);

    // برگشت به صفحه اول
    setPage(1);

    // اعمال فیلترها
    setFilters(normalized);
  };

  // ======================================
  // LOADING
  // ======================================

  if (isLoading) {
    return (
      <div
        className="
          w-full
          max-w-[1200px]
          mx-auto
          px-4
          pt-8
          pb-16
        "
      >
        <div className="mb-8">
          <Breadcrumb />
        </div>

        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-gray-500 dark:text-white">
            در حال دریافت اطلاعات املاک...
          </p>
        </div>
      </div>
    );
  }

  // ======================================
  // ERROR
  // ======================================

  if (error) {
    return (
      <div
        className="
          w-full
          max-w-[1200px]
          mx-auto
          px-4
          pt-8
          pb-16
        "
      >
        <div className="mb-8">
          <Breadcrumb />
        </div>

        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-red-500">خطا در دریافت اطلاعات املاک</p>
        </div>
      </div>
    );
  }

  // ======================================
  // PAGE
  // ======================================

  return (
    <div>
      <div
        className="
          w-full
          max-w-[1200px]
          mx-auto
          px-4
          pt-8
          pb-16
        "
      >
        {/* ======================================
            BREADCRUMB
        ====================================== */}

        <div className="mb-8">
          <Breadcrumb />
        </div>

        {/* ======================================
            SEARCH
        ====================================== */}

        <Search
          fields={searchFields}
          variant="mortgage"
          onSearch={handleSearch}
        />

        {/* ======================================
            RESULT COUNT
        ====================================== */}

        <div className="mb-6 mt-8">
          <p className="text-sm text-gray-500 dark:text-white">
            صفحه {page} — نمایش {properties.length} ملک از {total} ملک
          </p>
        </div>

        {/* ======================================
            PROPERTIES
        ====================================== */}

        {properties.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm text-gray-500 dark:text-white">
              ملکی برای رهن و اجاره پیدا نشد.
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-4
            "
          >
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}

        {/* ======================================
            PAGINATION
        ====================================== */}

        {totalPages > 1 && (
          <Pagination
            current={page}
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
      </div>
    </div>
  );
}
