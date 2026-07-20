


import {
  MapPin,
  Star,
  CalendarDays,
  Pencil,
} from "lucide-react";

export default function PropertyCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Image */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=340&fit=crop"
          alt="خانه ویلایی با پارکینگ اختصاصی"
          className="w-full h-44 object-cover"
        />
        {/* Discount badge */}
        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
          %۱۵
        </div>
        {/* Rating */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary500 text-xs font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          ۴.۵
        </div>
        {/* Location overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
          <p className="text-white text-xs flex items-center gap-1">
            <MapPin className="w-3 h-3 shrink-0" />
            خیابان ۴۰۴ بروکلین کالیفرنیا نیویورک
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <h2 className="font-bold text-gray-900 text-base mb-3 leading-6">
          خانه ویلایی با پارکینگ اختصاصی
        </h2>

        <div className="space-y-2 text-sm mb-4">
          <div className="flex items-center justify-between text-gray-600">
            <span className="text-gray-400 text-xs">تاریخ ورود به هتل</span>
            <span className="flex items-center gap-1.5 font-medium">
              <CalendarDays className="w-3.5 h-3.5 text-primary500" />
              ۱۴۰۴/۰۶/۱۶
            </span>
          </div>
          <div className="flex items-center justify-between text-gray-600">
            <span className="text-gray-400 text-xs">تاریخ خروج از هتل</span>
            <span className="flex items-center gap-1.5 font-medium">
              <CalendarDays className="w-3.5 h-3.5 text-primary500" />
              ۱۴۰۵/۰۴/۳
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="bg-[#EDEDED] border border-amber-100 rounded-full px-3 py-2.5 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
              %۱۵
            </span>
            <span className="text-xs text-gray-400 line-through">
              ۵,۵۰۰,۰۰۰
            </span>
          </div>
          <span className="font-bold text-primary600 text-base">
            ۴,۵۰۰,۰۰۰ <span className="text-xs font-normal">تومان</span>
          </span>
        </div>

        <button className="w-full border-2 border-primary500 bg-primary500 text-white hover:bg-primary600 font-medium text-sm py-2.5 rounded-full transition-colors flex items-center justify-center gap-2">
          <Pencil className="w-3.5 h-3.5" />
          تغییر هتل
        </button>
      </div>
    </div>
  );
}
