"use client";

import { useState } from "react";

import PropertyCard from "./PropertyCard";
import { TOTAL_PAGES, properties } from "./constants";
import Pagination from "./Pagination";
import Search from "../../modules/search/Search";
import { SearchField } from "../../modules/search/types";
import Breadcrumb from "../../modules/breadcrumb/Breadcrumb";

export default function MortgageHouse() {
  const [page, setPage] = useState(1);

  const searchFields: SearchField[] = [
    {
      type: "input",
      label: "جستجو",
      placeholder: "جستجو کنید...",
    },

    {
      type: "select",
      label: "مرتب سازی براساس",
      placeholder: "انتخاب کنید",
      options: [],
    },

    {
      type: "select",
      label: "محل مورد نظر",
      placeholder: "انتخاب کنید",
      options: [],
    },

    {
      type: "select",
      label: "نوع معامله",
      placeholder: "انتخاب کنید",
      options: [],
    },

    {
      type: "select",
      label: "حداقل قیمت",
      placeholder: "انتخاب کنید",
      options: [],
    },

    {
      type: "select",
      label: "حداقل اجاره",
      placeholder: "انتخاب کنید",
      options: [],
    },

    {
      type: "select",
      label: "حداکثر اجاره",
      placeholder: "انتخاب کنید",
      options: [],
    },

    {
      type: "select",
      label: "حداقل متراژ",
      placeholder: "انتخاب کنید",
      options: [],
    },

    {
      type: "select",
      label: "حداکثر متراژ",
      placeholder: "انتخاب کنید",
      options: [],
    },

    {
      type: "button",
      label: "اعمال فیلتر",
    },
  ];

  return (
    <div>
      <div
        className="
          max-w-[1200px]
          mx-auto
          px-4
          py-8
        "
      >
        <div className="py-12">
          <Breadcrumb />
        </div>

        <Search fields={searchFields} variant="mortgage" />

        <div className="mb-6 mt-8">
          <p className="text-sm text-gray-500">
            {`صفحه ${page} از ${TOTAL_PAGES} — نمایش ${properties.length} ملک`}
          </p>
        </div>

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
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <Pagination current={page} total={TOTAL_PAGES} onChange={setPage} />
      </div>
    </div>
  );
}
