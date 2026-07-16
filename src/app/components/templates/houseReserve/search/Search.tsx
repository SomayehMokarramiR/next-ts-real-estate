"use client";
import { ChevronLeft, SlidersHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import SelectField from "./SelectField";
export default function Search() {
  const [resultCount] = useState(33);
  return (
    <div>
      <div className="mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-6">
          <span className="hover:text-blue-600 cursor-pointer">خانه</span>
          <ChevronLeft size={14} className="text-gray-400 shrink-0" />
          <span className="hover:text-blue-600 cursor-pointer">رزرو هتل</span>
          <ChevronLeft size={14} className="text-gray-400 shrink-0" />
          <span className="text-primary500 font-medium">رزرو هتل رشت</span>
        </nav>
        {/* Filter Card */}
        <div className="bg-white p-4 sm:p-6 flex flex-col gap-5">
          {/* Row 1 */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            {/* Search input */}
            <div className="flex flex-col gap-1 w-full sm:flex-1 sm:min-w-[160px]">
              <label className="text-sm font-medium text-gray-700 text-right">
                جستجو
              </label>
              <div className=" flex items-center bg-[#F0F0F3] border border-gray-200 rounded-[40px] px-3 py-2.5 gap-2 hover:border-blue-400 transition-colors ">
                <input
                  type="text"
                  placeholder="نام هتل مورد نظر ...."
                  className=" flex-1 text-sm text-gray-400 bg-transparent outline-none text-right placeholder:text-gray-400 "
                />
              </div>
            </div>
            <SelectField label="مقصد یا هتل شما" />
            <SelectField label="مرتب سازی بر اساس" />
            <SelectField label="امکانات هتل" />
            <SelectField label="امتیاز هتل" />
          </div>
          {/* Divider */} <div className="border-t border-gray-100" />
          {/* Row 2 */}
          <div className=" flex flex-col sm:flex-row flex-wrap items-stretch sm:items-end gap-4 ">
            {/* Min price */}
            <div className="flex flex-col gap-1 w-full sm:flex-1 sm:min-w-[150px] sm:max-w-[200px]">
              <label className="text-sm font-medium text-gray-700 text-right">
                حداقل قیمت
              </label>
              <button className=" flex items-center justify-between gap-2 bg-[#F0F0F3] border border-gray-200 rounded-[40px] px-3 py-2.5 text-sm text-gray-400 w-full ">
                <span>قیمت مورد نظر</span> <ChevronLeft size={16} />
              </button>
            </div>
            {/* Max price */}
            <div className="flex flex-col gap-1 w-full sm:flex-1 sm:min-w-[150px] sm:max-w-[200px]">
              <label className="text-sm font-medium text-gray-700 text-right">
                حداکثر قیمت
              </label>
              <button className=" flex items-center justify-between gap-2 bg-[#F0F0F3] border border-gray-200 rounded-[40px] px-3 py-2.5 text-sm text-gray-400 w-full ">
                <span>قیمت مورد نظر</span> <ChevronLeft size={16} />
              </button>
            </div>
            {/* Spacer */} <div className="hidden sm:flex flex-1" />
            {/* Buttons */}
            <div className=" flex flex-wrap items-center justify-center sm:justify-start gap-3 w-full sm:w-auto ">
              <button className=" flex items-center gap-2 bg-primary500 text-white text-sm px-4 py-2.5 rounded-full ">
                <ChevronLeft size={16} /> {resultCount} آگهی پیدا شد
              </button>
              <button className=" flex items-center gap-2 bg-primary500 text-white text-sm px-4 py-2.5 rounded-full ">
                <SlidersHorizontal size={16} /> اعمال فیلتر
              </button>
              <button className=" flex items-center gap-2 bg-red-500 text-white text-sm px-4 py-2.5 rounded-full ">
                <Trash2 size={16} /> حذف فیلتر
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
