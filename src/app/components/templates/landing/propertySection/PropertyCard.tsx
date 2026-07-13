import { ArrowLeft } from "lucide-react";
import { PROPERTIES } from "./constants";

export default function PropertyCard({
  property,
  active,
}: {
  property: (typeof PROPERTIES)[0];
  active?: boolean;
}) {
  return (
    <div className="relative shrink-0 w-[170px] sm:w-[190px] md:w-[210px] lg:w-[220px] rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="h-56 sm:h-64 md:h-72 lg:h-80 bg-gray-200">
        <img
          src={property.img}
          alt={property.alt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-[26px] left-5 right-5 bg-white rounded-xl px-3 py-2.5 flex items-center justify-between gap-2">
        <span className="text-gray-800 text-sm font-semibold">
          {property.label}
        </span>

        <button
          className="
            w-8
            h-8
            rounded-full
            flex
            items-center
            justify-center
            shrink-0
            bg-[#FFFFFA]
            border
            border-primary500
            text-primary500
            transition-all
            duration-300
            hover:bg-primary500
            hover:text-white
          "
          aria-label="مشاهده جزئیات"
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
