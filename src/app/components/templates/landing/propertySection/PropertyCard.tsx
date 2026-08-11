import { ArrowLeft } from "lucide-react";
import { Property } from "@/hooks/useProperties";
import Image from "next/image";
import Link from "next/link";

export default function PropertyCard({
  property,
  active,
}: {
  property: Property;
  active?: boolean;
}) {
  return (
    <div className="relative shrink-0 w-[170px] sm:w-[190px] md:w-[210px] lg:w-[220px] rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 bg-gray-200">
        <Image
          src={property.images?.[0] || "/images/placeholder.jpg"}
          alt={property.title}
          fill
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-[26px] left-5 right-5 bg-white dark:bg-[#353535] rounded-xl px-3 py-2.5 flex items-center justify-between gap-2">
        <span
          className="
    text-gray-800
    dark:text-white

    text-xs
    md:text-sm

    font-semibold
    leading-5

    line-clamp-2

    min-h-[40px]
    md:min-h-[44px]

    overflow-hidden
  "
        >
          {property.title}
        </span>

        <Link
          href={`/properties/${property._id}`}
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
        </Link>
      </div>
    </div>
  );
}
