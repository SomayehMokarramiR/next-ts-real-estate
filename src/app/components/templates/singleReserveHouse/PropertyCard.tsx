import { MapPin, Star, CalendarDays, Pencil } from "lucide-react";

import { Property } from "../../../../hooks/useProperties";

type Props = {
  property: Property;
};

export default function PropertyCard({ property }: Props) {
  if (!property) {
    return (
      <div
        className="
        bg-white
        dark:bg-[#272727]
        rounded-2xl
        p-5
      "
      >
        در حال دریافت اطلاعات اقامتگاه...
      </div>
    );
  }

  const hasDiscount = property.pricing?.discount && property.pricing?.oldPrice;

  return (
    <div
      className="
      bg-white
      dark:bg-[#272727]
      rounded-2xl
      overflow-hidden
      border
      border-gray-200
      dark:border-[#353535]
      shadow-sm
      "
    >
      {/* Image */}

      <div
        className="
        relative
        h-56
        bg-gray-200
        dark:bg-[#353535]
        "
      >
        {property.images?.[0] ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="
            w-full
            h-full
            object-cover
            "
          />
        ) : (
          <div
            className="
            w-full
            h-full
            flex
            items-center
            justify-center
            text-gray-400
            "
          >
            تصویر موجود نیست
          </div>
        )}

        {/* Discount badge */}

        {hasDiscount && (
          <span
            className="
            absolute
            top-3
            right-3
            bg-red-500
            text-white
            text-xs
            font-bold
            px-2
            py-1
            rounded-full
            "
          >
            % {property.pricing.discount}
          </span>
        )}

        {/* Rating */}

        <div
          className="
          absolute
          top-3
          left-3
          bg-white/90
          dark:bg-[#272727]
          rounded-full
          px-2
          py-1
          flex
          items-center
          gap-1
          text-xs
          font-semibold
          "
        >
          <Star size={14} className="text-yellow-500 fill-yellow-500" />

          {property.rating ?? 0}
        </div>

        {/* Location */}

        <div
          className="
          absolute
          bottom-3
          right-3
          left-3
          bg-black/40
          backdrop-blur-sm
          text-white
          rounded-full
          px-3
          py-2
          flex
          items-center
          gap-1
          text-xs
          "
        >
          <MapPin size={14} />

          {property.location?.address}
        </div>
      </div>

      {/* Details */}

      <div className="p-4">
        <h2
          className="
          font-bold
          text-gray-900
          dark:text-white
          text-base
          mb-3
          leading-6
          "
        >
          {property.title}
        </h2>

        <div
          className="
          space-y-2
          text-sm
          mb-4
          "
        >
          <div
            className="
            flex
            items-center
            justify-between
            "
          >
            <span
              className="
              text-gray-400
              dark:text-gray-100
              text-xs
              "
            >
              تاریخ ورود به هتل
            </span>

            <span
              className="
              flex
              items-center
              gap-1.5
              font-medium
              dark:text-gray-100
              "
            >
              <CalendarDays
                className="
                w-3.5
                h-3.5
                text-primary500
                "
              />
              ۱۴۰۵/۰۵/۲۰
            </span>
          </div>

          <div
            className="
            flex
            items-center
            justify-between
            "
          >
            <span
              className="
              text-gray-400
              dark:text-gray-100
              text-xs
              "
            >
              تعداد شب
            </span>

            <span
              className="
              font-medium
              dark:text-gray-100
              "
            >
              ۳ شب
            </span>
          </div>
        </div>

        {/* Price */}

        <div
          className="
          bg-[#EDEDED]
          dark:bg-[#353535]
          rounded-full
          px-3
          py-2.5
          mb-4
          flex
          items-center
          justify-between
          "
        >
          <div className="flex items-center gap-2">
            {hasDiscount && (
              <>
                <span
                  className="
                  bg-red-500
                  text-white
                  text-xs
                  font-bold
                  px-1.5
                  py-0.5
                  rounded
                  "
                >
                  % {property.pricing.discount}
                </span>

                <span
                  className="
                  text-xs
                  text-gray-400
                  line-through
                  "
                >
                  {property.pricing.oldPrice?.toLocaleString("fa-IR")}
                </span>
              </>
            )}
          </div>

          <span
            className="
            font-bold
            text-primary600
            dark:text-[#3361f8]
            text-base
            "
          >
            {property.pricing.daily.toLocaleString("fa-IR")}

            <span
              className="
              text-xs
              font-normal
              dark:text-gray-100
              "
            >
              {" "}
              تومان
            </span>
          </span>
        </div>

        <button
          className="
          w-full
          border-2
          border-primary500
          bg-primary500
          text-white
          hover:bg-primary600
          font-medium
          text-sm
          py-2.5
          rounded-full
          transition-colors
          flex
          items-center
          justify-center
          gap-2
          "
        >
          <Pencil className="w-3.5 h-3.5" />
          تغییر هتل
        </button>
      </div>
    </div>
  );
}
