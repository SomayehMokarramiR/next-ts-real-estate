"use client";

import {
  CalendarDays,
  ChevronLeft,
  Home,
  Minus,
  Plus,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

/* ─── Booking Sidebar ─────────────────────────────────── */
export default function BookingSidebar() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-primary500 px-5 py-3.5 flex items-center justify-center gap-2">
        <Home className="w-4 h-4 text-white" />
        <span className="text-white font-semibold text-sm ">
          رزرو خونه برای
        </span>
      </div>

      {/* Host */}
      <div className="px-5 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary500/50 flex items-center justify-center">
            <User className="w-5 h-5 text-primary700" />
          </div>

          <div>
            <p className="font-semibold text-gray-900 text-sm">
              امیر محمد خیابانی
            </p>

            <p className="text-xs text-gray-400 mt-0.5">میزبان تأیید شده</p>
          </div>
        </div>
      </div>

      {/* Date Picker + Guests */}
      {/* Date Picker + Guests */}
      <div className="px-5 py-4 space-y-4 border-b border-gray-100">
        {/* Check in */}
        <div>
          <label className="block text-sm font-semibold text-[#1E2022] mb-2">
            تاریخ ورود
          </label>

          <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3">
            <CalendarDays className="w-5 h-5 text-primary700" />

            <span className="text-sm text-[#8B8D98]">۳ تیر ۱۴۰۴</span>
          </div>
        </div>

        {/* Check out */}
        <div>
          <label className="block text-sm font-semibold text-[#1E2022] mb-2">
            تاریخ برگشت
          </label>

          <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3">
            <CalendarDays className="w-5 h-5 text-primary700" />

            <span className="text-sm text-[#8B8D98]">۱۰ تیر ۱۴۰۴</span>
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-sm font-semibold text-[#1E2022] mb-2">
            تعداد مسافران
          </label>

          <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3">
            <User className="w-5 h-5 text-primary700" />

            <span className="text-sm text-[#8B8D98]">
              تعداد مسافران را وارد کنید
            </span>
          </div>
        </div>
      </div>
      {/* Reserved Prices */}
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 text-sm mb-5 text-center">
          قیمت‌های رزرو شده
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#1E2022] font-semibold">۵ شب</span>

            <span className="font-bold text-[#1E2022]">۱۷٬۰۰۰٬۰۰۰ ت</span>

            <span className="font-bold text-[#1E2022]">۱۸٬۰۰۰٬۰۰۰ ت</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-[#1E2022] font-semibold">۳ شب</span>

            <span className="font-bold text-[#1E2022]">۱۷٬۰۰۰٬۰۰۰ ت</span>

            <span className="font-bold text-[#1E2022]">۱۸٬۰۰۰٬۰۰۰ ت</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-[#1E2022] font-semibold">۷ شب</span>

            <span className="font-bold text-[#1E2022]">۱۷٬۰۰۰٬۰۰۰ ت</span>

            <span className="font-bold text-[#1E2022]">۱۸٬۰۰۰٬۰۰۰ ت</span>
          </div>
        </div>
      </div>

      {/* Discount Box */}
      <div className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-400 text-white text-xs font-bold rounded-full px-3 py-2 ">
            15%
          </div>
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary500 line-through">
                ۲۰٬۰۰۰٬۰۰۰ ت
              </span>

              <span className="font-bold text-gray-900 text-sm">
                ۱۷٬۰۰۰٬۰۰۰ ت
              </span>
            </div>

            {/* <p className="text-xs text-gray-400 mt-1">قیمت بعد از تخفیف</p> */}
          </div>
        </div>

        {/* Reserve Button */}
        <button
          className="
            mt-4
            w-full
            flex
            items-center
            justify-center
            gap-2
            bg-primary500
            hover:bg-primary600
            text-white
            rounded-full
            py-3
            text-sm
            font-bold
            transition
          "
        >
          همین الان رزرو کن
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
