import { Star, Car, BedDouble, Bath, Maximize2, MapPin } from "lucide-react";
import { Property } from "./constants";

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-44 object-cover"
        />

        {/* Rating badge */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-[5px] rounded-full text-white bg-primary500 text-xs font-bold bg-primary500">
          <Star
            size={18}
            className="text-white"
            fill="none"
            stroke="white"
            strokeWidth={2}
          />
          <span>{property.rating}</span>
        </div>

        {/* Location overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
          <div className="flex items-center gap-1 text-white text-xs">
            <MapPin size={11} />
            <span>{`متراژ ${property.area} | مکان: ${property.location}`}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1 gap-2">
        <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-1">
          {property.title}
        </h3>

        {/* Features */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
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

        {/* Price */}
        {/* <div className="mt-auto pt-2 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
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
          <button className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium px-3 py-1.5 rounded-lg transition-colors">
            {property.priceType === "monthly" ? "اجاره ماهانه" : "بر شب"}
          </button>
        </div> */}

        {/* Price */}
        <div
          className="
          flex
          items-center
          justify-between
          flex-nowrap
          bg-[#EDEDED]
          rounded-xl
          px-3
          sm:px-5
          md:px-3
          lg:px-4
          gap-2
          "
        >
          <span className="text-[11px] py-3 text-[#8B8D98] whitespace-nowrap">
            اجاره ماهیانه
          </span>

          <div className="flex items-baseline gap-1 whitespace-nowrap">
            <div>
              <div className="flex items-center gap-2">
                {property.discountPrice && (
                  <span className="text-xs text-red-600 line-through">
                    {formatPrice(property.discountPrice)}
                  </span>
                )}

                <span className="text-sm font-bold text-blue-600">
                  {formatPrice(property.price)}
                </span>
                <span className="text-xs text-black">تومان</span>
              </div>
            </div>

            <span className="text-[11px] text-gray-400">/هر شب</span>
          </div>
        </div>
      </div>
    </div>
  );
}
