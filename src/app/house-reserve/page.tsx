"use client";

import { useState } from "react";

import Search from "@/app/components/modules/search/Search";
import ContentReseve from "../components/templates/houseReserve/contentReseve/ContentReseve";
import MainLayout from "../components/layout/MainLayout";
import { useProperties, type PropertiesResponse } from "@/hooks/useProperties";

type ReserveFilters = Record<string, string>;

export default function Page() {
  const [filters, setFilters] = useState<ReserveFilters>({});
  const [resetKey, setResetKey] = useState(0);
  const { data } = useProperties({
    limit: "100",
  });
  const properties = (data as PropertiesResponse | undefined)?.properties ?? [];

  const reserveProperties = properties.filter((property) => {
    const dailyPrice = Number(property.pricing?.daily ?? 0);

    return dailyPrice > 0 && property.status !== "inactive";
  });

  const cityOptions = Array.from(
    new Set(
      reserveProperties
        .map((property) => property.location?.city)
        .filter(Boolean),
    ),
  );

  const clearFilters = () => {
    setFilters({});
    setResetKey((prev) => prev + 1);
  };

  return (
    <MainLayout>
      <div className="mt-30 mb-10 w-full px-6">
        <Search
          key={resetKey}
          variant="houseReserve"
          onSearch={(data) => {
            const apiFilters: ReserveFilters = {
              search: data["جستجو"] ?? "",
              city: data["مقصد یا هتل شما"] ?? "",
              sort: data["مرتب سازی براساس"] ?? "",
              facilities: data["امکانات هتل"] ?? "",
              rating: data["امتیاز هتل"] ?? "",
              minPrice: data["حداقل قیمت"] ?? "",
              maxPrice: data["حداکثر قیمت"] ?? "",

              // فقط اقامتگاه‌های قابل رزرو
              bookingType: "reserve",

              // برای جلوگیری از کم آمدن نتایج رزرو
              limit: "100",
            };

            console.log("RESERVE FILTERS ===>", apiFilters);

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
              options: cityOptions,
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
              options: [
                "5 ستاره به بالا",
                "4 ستاره به بالا",
                "3 ستاره به بالا",
                "2 ستاره به بالا",
                "1 ستاره به بالا",
              ],
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
          ]}
        />

        <ContentReseve filters={filters} />
      </div>
    </MainLayout>
  );
}
