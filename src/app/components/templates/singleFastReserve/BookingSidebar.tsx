"use client";

import { CalendarDays, Minus, Plus, Users } from "lucide-react";
import { useState } from "react";

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

/* ─── Booking Sidebar ─────────────────────────────────── */
export default function BookingSidebar() {
  const [guests, setGuests] = useState(2);
  const nightlyRate = 4500000;
  const nights = 3;
  const discount = 900000;
  const total = nightlyRate * nights - discount;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden sticky top-6">
      {/* Header */}
      <div className="bg-blue-600 px-4 py-3">
        <p className="text-white text-sm font-semibold text-center">
          رزرو برای همین جا
        </p>
      </div>

      <div className="p-4 space-y-3">
        {/* Check-in / Check-out */}
        <div className="grid grid-cols-2 gap-2">
          <div className="border border-gray-200 rounded-xl p-3 cursor-pointer hover:border-blue-400 transition-colors">
            <p className="text-[10px] text-gray-400 mb-1">ورود</p>
            <div className="flex items-center gap-1">
              <CalendarDays size={13} className="text-blue-500" />
              <span className="text-xs font-medium text-gray-700">
                ۱۴۰۳/۰۴/۱۵
              </span>
            </div>
          </div>
          <div className="border border-gray-200 rounded-xl p-3 cursor-pointer hover:border-blue-400 transition-colors">
            <p className="text-[10px] text-gray-400 mb-1">خروج</p>
            <div className="flex items-center gap-1">
              <CalendarDays size={13} className="text-blue-500" />
              <span className="text-xs font-medium text-gray-700">
                ۱۴۰۳/۰۴/۱۸
              </span>
            </div>
          </div>
        </div>

        {/* Guests */}
        <div className="border border-gray-200 rounded-xl p-3">
          <p className="text-[10px] text-gray-400 mb-1">مهمان</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Users size={13} className="text-blue-500" />
              <span className="text-xs font-medium text-gray-700">
                {guests} نفر
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Minus size={11} />
              </button>
              <span className="text-xs font-bold text-gray-800 w-4 text-center">
                {guests}
              </span>
              <button
                onClick={() => setGuests((g) => Math.min(10, g + 1))}
                className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Plus size={11} />
              </button>
            </div>
          </div>
        </div>

        {/* Price breakdown */}
        <div className="bg-gray-50 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>
              {formatPrice(nightlyRate)} × {nights} شب
            </span>
            <span className="font-medium">
              {formatPrice(nightlyRate * nights)} تومان
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-red-500 flex items-center gap-1">
              <span className="bg-red-100 text-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded">
                تخفیف
              </span>
              تخفیف ویژه
            </span>
            <span className="text-red-500 font-medium">
              - {formatPrice(discount)} تومان
            </span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-800">جمع کل</span>
            <span className="text-sm font-bold text-blue-600">
              {formatPrice(total)} تومان
            </span>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-xl transition-colors shadow-sm shadow-blue-200">
          ثبت درخواست رزرو
        </button>
      </div>
    </div>
  );
}
