import { Bath, BedDouble, Car, MapPin, Maximize2, Star } from "lucide-react";
import { Property } from "./types";

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

/* ─── Property Card ───────────────────────────────────── */
export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-44 object-cover"
        />
        <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {property.type}
        </span>
        <span className="absolute top-2 left-2 bg-primary500 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
          <Star size={11} className="text-amber-400 fill-amber-400" />
          {property.rating}
        </span>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
          <div className="flex items-center gap-1 text-white text-xs">
            <MapPin size={11} />
            <span>{`متراژ ${property.area} | ${property.location}`}</span>
          </div>
        </div>
      </div>
      <div className="p-3 flex flex-col flex-1 gap-2">
        <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-1">
          {property.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
          <span className="flex items-center gap-1">
            <BedDouble size={13} className="text-gray-400" />
            {property.beds} خواب
          </span>
          <span className="flex items-center gap-1">
            <Bath size={13} className="text-gray-400" />
            {property.baths} سرویس
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 size={13} className="text-gray-400" />
            {property.area} متر
          </span>
          <span className="flex items-center gap-1">
            <Car size={13} className="text-gray-400" />
            {property.parking} پارکینگ
          </span>
        </div>
        <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-blue-600">
                {formatPrice(property.price)}
              </span>
              <span className="text-xs text-gray-400">تومان</span>
              {property.discountPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(property.discountPrice)}
                </span>
              )}
            </div>
            {property.discountPrice && (
              <span className="inline-block bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded mt-0.5">
                تخفیف
              </span>
            )}
          </div>
          <button className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
            {property.priceType === "monthly" ? "اجاره ماهانه" : "بر شب"}
          </button>
        </div>
      </div>
    </div>
  );
}
