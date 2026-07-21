import { MapPin, Bed, Bath, Users, Car, Star } from "lucide-react";
import { properties } from "./constants";

export default function PropertyCard({ p }: { p: (typeof properties)[0] }) {
  return (
    <div
      className="bg-white  rounded-2xl overflow-hidden flex flex-col"
      style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.09)" }}
    >
      {/* ── Image block ── */}
      <div className="relative">
        <img
          src={p.image}
          alt={p.title}
          className="w-full object-cover"
          style={{ height: "172px" }}
        />

        {/* Rating badge — top-right */}
        <div
          className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2.5 py-[5px] rounded-full text-white text-xs font-bold bg-primary500"
          // style={{ backgroundColor: primary500 }}
        >
          <Star size={11} className="text-white" fill="white" strokeWidth={0} />
          <span>{p.rating}</span>
        </div>

        {/* Address overlay — bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-end gap-1"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 100%)",
          }}
        >
          <p className="text-white text-[11px] leading-none truncate">
            {p.address}
          </p>
          <MapPin size={11} className="text-white shrink-0" />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-4 pt-3 pb-4 flex flex-col gap-3 bg-white dark:bg-[#353535] dark:border-[#353535]">
        {/* Title */}
        <h3 className="text-gray-900 dark:text-white font-bold text-[15px] text-right">
          {p.title}
        </h3>

        {/* Amenities — RTL: خواب | حمام | نفر | پارکینگ */}
        <div className="flex items-center justify-end gap-2 text-gray-500 dark:text-white text-[11px]">
          <span className="flex items-center gap-[3px]">
            <Bed size={12} className="text-gray-400" />
            <span>{p.beds} خواب</span>
          </span>
          <span className="text-gray-300 text-xs">|</span>
          <span className="flex items-center gap-[3px]">
            <Bath size={12} className="text-gray-400" />
            <span>{p.baths} حمام</span>
          </span>
          <span className="text-gray-300 text-xs">|</span>
          <span className="flex items-center gap-[3px]">
            <Users size={12} className="text-gray-400" />
            <span>{p.guests} نفر</span>
          </span>
          <span className="text-gray-300 text-xs">|</span>
          <span className="flex items-center gap-[3px]">
            <Car size={12} className="text-gray-400" />
            <span>{p.parking} پارکینگ</span>
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 " />

        {/* Price row */}
        <div
          className="
    flex
    flex-nowrap
    items-center
    justify-between
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
          {/* Rent type */}
          <span
            className="
      text-[11px]
      py-3
      text-[#8B8D98]
      dark:text-white
      whitespace-nowrap
      shrink-0
    "
          >
            اجاره ماهیانه
          </span>

          {/* Price */}
          <div
            className="
      flex
      items-baseline
      gap-1
      whitespace-nowrap
      shrink-0
    "
          >
            <span
              className="
        text-gray-800
        dark:text-white
        font-bold
        text-sm
        whitespace-nowrap
        min-[640px]:max-[770px]:text-[11px]
      "
            >
              {p.price} تومان
            </span>

            <span
              className="
        text-[11px]
        text-gray-400
        whitespace-nowrap
        min-[640px]:max-[770px]:text-[10px]
      "
            >
              /هر شب
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
