"use client";

import { useState } from "react";

import Search from "@/app/components/modules/search/Search";
import ContentReseve from "../components/templates/houseReserve/contentReseve/ContentReseve";
import MainLayout from "../components/layout/MainLayout";

export default function Page() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [resetKey, setResetKey] = useState(0);

  const clearFilters = () => {
    setFilters({});
    setResetKey((prev) => prev + 1);
  };

  return (
    <MainLayout>
      <div className="mt-20">
        <Search
          key={resetKey}
          variant="houseReserve"
          onSearch={(data) => {
            const apiFilters = {
              search: data["جستجو"] || "",

              city: data["مقصد یا هتل شما"] || "",

              sort: data["مرتب سازی براساس"] || "",

              facility: data["امکانات هتل"] || "",

              rating: data["امتیاز هتل"] || "",

              minPrice: data["حداقل قیمت"] || "",

              maxPrice: data["حداکثر قیمت"] || "",
            };
            console.log("API FILTERS ===>", apiFilters);

            setFilters(apiFilters);
          }}
          fields={[
            {
              type: "input",
              label: "جستجو",
              placeholder: "نام ویلا یا شهر مورد نظر",
            },

            {
              type: "select",
              label: "مقصد یا هتل شما",
              placeholder: "انتخاب شهر",
              options: ["محمودآباد", "رشت", "گیلان"],
            },

            {
              type: "select",
              label: "مرتب سازی براساس",
              placeholder: "انتخاب کنید",
              options: ["محبوب‌ترین", "ارزان‌ترین"],
            },

            {
              type: "select",
              label: "امکانات هتل",
              placeholder: "انتخاب امکانات",
              options: ["استخر", "پارکینگ"],
            },

            {
              type: "select",
              label: "امتیاز هتل",
              placeholder: "انتخاب امتیاز",
              options: ["5 ستاره", "4 ستاره"],
            },

            {
              type: "input",
              label: "حداقل قیمت",
              placeholder: "حداقل قیمت",
            },

            {
              type: "input",
              label: "حداکثر قیمت",
              placeholder: "حداکثر قیمت",
            },

            {
              type: "button",
              label: "اعمال فیلتر",
            },

            {
              type: "button",
              label: "حذف فیلتر",
            },

            {
              type: "button",
              label: "۳۳ آگهی پیدا شد",
            },
          ]}
        />

        <ContentReseve filters={filters} />
      </div>
    </MainLayout>
  );
}
