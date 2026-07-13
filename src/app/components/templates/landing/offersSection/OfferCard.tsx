import { Bath, Bed, Car, MapPin, Star, Users } from "lucide-react";
import { OFFERS } from "./constants";

export default function OfferCard({ offer }: { offer: (typeof OFFERS)[0] }) {
  const fmt = (n: number) => n.toLocaleString("fa-IR");

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-52 bg-gray-200 shrink-0">
        <img
          src={offer.img}
          alt={offer.title}
          className="w-full h-full object-cover"
        />

        {/* Discount badge — top right */}
        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
          %{offer.discount}
        </div>

        {/* Rating badge — next to discount */}
        <div className="absolute top-3 right-14 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
          <Star size={11} fill="white" strokeWidth={0} />
          {offer.rating}
        </div>

        {/* Location overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-3">
          <div className="flex items-center gap-1.5 justify-end">
            <span className="text-white text-xs leading-relaxed line-clamp-1">
              {offer.location}
            </span>
            <MapPin size={13} className="text-white shrink-0" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Title */}
        <h3 className="text-gray-900 text-base font-bold text-right leading-snug">
          {offer.title}
        </h3>

        {/* Features row */}
        <div className="flex items-center justify-end gap-4 text-gray-500 text-xs border-t border-gray-100 pt-3">
          <span className="flex items-center gap-1">
            <span>{offer.parking} پارکینگ</span>
            <Car size={14} className="text-gray-400" />
          </span>
          <span className="flex items-center gap-1">
            <span>{offer.guests} نفر</span>
            <Users size={14} className="text-gray-400" />
          </span>
          <span className="flex items-center gap-1">
            <span>{offer.baths} حمام</span>
            <Bath size={14} className="text-gray-400" />
          </span>
          <span className="flex items-center gap-1">
            <span>{offer.beds} خواب</span>
            <Bed size={14} className="text-gray-400" />
          </span>
        </div>

        {/* Price row */}
        <div
          className="
    flex
    items-center
    justify-end
    gap-2
    flex-wrap
    bg-[#EDEDED]
    rounded-full
    px-3
    py-1.5
  "
        >
          <span className="text-red-500 line-through text-xs font-medium">
            {fmt(offer.originalPrice)} تومان
          </span>
          <span className="text-gray-900 font-bold text-sm">
            {fmt(offer.price)} تومان
          </span>
          <span className="text-gray-400 text-xs">/ هر شب</span>
        </div>
      </div>
    </div>
  );
}
