"use client";

import { useState } from "react";
import Breadcrumb from "./Breadcrumb";
import { Bookmark, MapPin, Share2, Star } from "lucide-react";
import PhotoGallery from "./PhotoGallery";

/* ─── Property Header ─────────────────────────────────── */
export default function PropertyHeader() {
  const [saved, setSaved] = useState(false);
  return (
    <section className="mb-6">
      <div className="mb-4">
        <Breadcrumb />
      </div>
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-2 shrink-0 pt-1">
          <button
            onClick={() => setSaved((s) => !s)}
            className={`w-9 h-9 flex items-center justify-center rounded-full border transition-colors ${saved ? "border-blue-500 text-blue-500 bg-blue-50" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}
          >
            <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            <Share2 size={16} />
          </button>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-right leading-tight">
          خانه ویلایی با پارکینگ اختصاصی
        </h1>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin size={14} className="text-blue-500 flex-shrink-0" />
          <span>خیابان ۴۰۴ بروکلین کالیفورنیا نیویورک</span>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
          <Star size={14} className="text-amber-400 fill-amber-400" />
          <span className="text-sm font-semibold text-amber-700">
            ۴.۵ ستاره
          </span>
        </div>
      </div>
      <PhotoGallery />
    </section>
  );
}
