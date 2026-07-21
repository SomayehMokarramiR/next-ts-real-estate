import { Star, Car, BedDouble, Bath, Maximize2, MapPin } from "lucide-react";
import { Property } from "./constants";

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white dark:bg-[#272727] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-[#272727] hover:shadow-md transition-shadow duration-200 flex flex-col">
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
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white leading-snug line-clamp-1">
          {property.title}
        </h3>

        {/* Features */}
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-white">
          <span className="flex items-center gap-1">
            <BedDouble size={13} className="text-gray-400 dark:text-white" />
            {property.beds} خواب
          </span>
          <span className="flex items-center gap-1">
            <Bath size={13} className="text-gray-400 dark:text-white" />
            {property.baths} سرویس
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 size={13} className="text-gray-400 dark:text-white" />
            {property.area} متر
          </span>
          <span className="flex items-center gap-1">
            <Car size={13} className="text-gray-400 dark:text-white" />
            {property.parking} پارکینگ
          </span>
        </div>
        {/* Price */}
        <div
          className="
          flex
          items-center
          justify-between
          flex-nowrap
          bg-[#EDEDED]
          dark:bg-[#353535]
          rounded-xl
          px-3
          sm:px-5
          md:px-3
          lg:px-4
          gap-2
          "
        >
          <span className="text-[11px] py-3 text-[#8B8D98] dark:text-white whitespace-nowrap">
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
                <span className="text-xs text-black dark:text-white ">
                  تومان
                </span>
              </div>
            </div>

            <span className="text-[11px] text-gray-400 dark:text-white ">
              /هر شب
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
