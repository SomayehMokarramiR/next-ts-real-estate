"use client";

import { useState } from "react";
import { MOSQUE_IMAGE } from "./constants";
import { ChevronDown } from "lucide-react";

/* ─── Description Section ─────────────────────────────── */
export default function DescriptionSection() {
  const [expanded, setExpanded] = useState(false);
  const short = `چرا هتل همایون رو انتخاب کنیم؟ این هتل با امکانات کامل و موقعیت مکانی بی‌نظیر، یکی از بهترین گزینه‌ها برای اقامت در رشت است. این هتل با دسترسی آسان به مراکز خرید، رستوران‌ها و جاذبه‌های گردشگری، انتخاب ایده‌آلی برای مسافران است.`;
  const full = `${short} هتل همایون رشت با بیش از دو دهه سابقه، یکی از شناخته‌شده‌ترین مراکز اقامتی استان گیلان محسوب می‌شود. اتاق‌های مجهز و تمیز، صبحانه رایگان، پارکینگ اختصاصی و خدمات ۲۴ ساعته از جمله ویژگی‌های برجسته این هتل هستند. موقعیت مرکزی هتل در قلب شهر رشت، دسترسی به تمامی جاذبه‌های دیدنی این شهر زیبا را برای مهمانان آسان می‌کند.`;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <h2 className="text-base font-bold text-gray-900 mb-3">
        چرا هتل همایون رو انتخاب کنیم؟
      </h2>
      <p className="text-sm text-gray-600 leading-7">
        {expanded ? full : short}
      </p>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-2 text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline"
      >
        {expanded ? "نمایش کمتر" : "نمایش بیشتر"}
        <ChevronDown
          size={13}
          className={`transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {/* Inline image */}
      <div className="mt-4 rounded-xl overflow-hidden">
        <img
          src={MOSQUE_IMAGE}
          alt="جاذبه گردشگری"
          className="w-full h-48 object-cover"
        />
      </div>

      <p className="text-sm text-gray-600 leading-7 mt-4">
        این ملک در موقعیتی استثنایی قرار داشته و از امکانات رفاهی کامل برخوردار
        است. با دسترسی سریع به مراکز درمانی، آموزشی و تجاری، یک انتخاب هوشمندانه
        برای سکونت یا سرمایه‌گذاری به شمار می‌رود.
      </p>
    </div>
  );
}
