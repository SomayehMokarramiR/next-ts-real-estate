import { Home, MapPin, Ruler, ShowerHead, Star, UserRound } from "lucide-react";
import { ListingItem } from "./types";

export default function Card({ item }: { item: ListingItem }) {
  return (
    <div className="bg-white dark:bg-[#272727] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
      {/* Image area */}
      <div className="relative">
        <img
          src={item.image}
          alt={`ملک ${item.address}`}
          className="w-full h-44 object-cover"
        />

        {/* Top-right badges */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
          <span className="bg-primary500 text-white text-[11px] font-semibold px-2 py-1 rounded-full flex items-center gap-1">
            <Star
              size={18}
              className="fill-primary500 text-white"
              strokeWidth={2}
            />
            {item.rating}
          </span>
          {item.discount && (
            <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-1 rounded-full">
              %{item.discount}
            </span>
          )}
        </div>

        {/* Bottom overlay: address + pin */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-3 py-2 bg-gradient-to-t from-black/40 to-transparent">
          <span className="text-white text-xs font-bold">{item.address}</span>
          <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <MapPin size={13} className="text-white" />
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="px-3 pt-3 pb-3 space-y-2.5">
        {/* Feature row */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Home size={13} className="text-gray-400" />
            {item.beds}
          </span>
          <span className="flex items-center gap-1">
            <UserRound size={13} className="text-gray-400" />
            {item.guests}
          </span>
          <span className="flex items-center gap-1">
            <ShowerHead size={13} className="text-gray-400" />
            {item.baths}
          </span>
          <span className="flex items-center gap-1">
            <Ruler size={13} className="text-gray-400" />
            {item.area}
          </span>
        </div>

        {/* Price row */}
        {/* <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-100 rounded-full px-3 py-1.5 flex items-center gap-1">
            <span className="text-gray-400 text-xs">/</span>
            <span className="text-sm font-bold text-gray-800 tracking-wide">
              {item.price.toLocaleString("fa-IR")}
            </span>
          </div>
          {item.originalPrice && (
            <span className="text-xs text-red-400 line-through whitespace-nowrap font-medium">
              {item.originalPrice.toLocaleString("fa-IR")}
            </span>
          )}
        </div> */}

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
                {item.discount && (
                  <span className="text-xs text-red-600 line-through">
                    {item.price.toLocaleString("fa-IR")}
                  </span>
                )}

                <span className="text-sm font-bold text-blue-600">
                  {item.discount
                    ? (
                        item.price -
                        (item.price * item.discount) / 100
                      ).toLocaleString("fa-IR")
                    : item.price.toLocaleString("fa-IR")}
                </span>
                <span className="text-xs text-black dark:text-white">
                  تومان
                </span>
              </div>
            </div>

            <span className="text-[11px] text-gray-400 dark:text-white">
              /هر شب
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
