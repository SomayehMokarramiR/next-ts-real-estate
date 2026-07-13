import { villas } from "./constants";

export default function VillaRentalSection() {
  return (
    <div
      dir="rtl"
      className=" bg-white flex items-center justify-center px-4 py-16"
    >
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-blue-500 text-sm font-medium mb-2">
            ویلا را با ما انتخاب کنید
          </p>
          <h2 className="text-3xl font-bold text-gray-900">
            اجاره ویلا در محبوب ترین مقاصد ایران
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {villas.map((villa) => (
            <div
              key={villa.id}
              className="
      relative
      rounded-2xl
      overflow-hidden
      cursor-pointer
      group
      "
            >
              <img
                src={villa.image}
                alt={villa.title}
                className="
        w-full
        h-52
        object-cover
        transition-transform
        duration-300
        group-hover:scale-105
        "
              />

              {/* Badge */}

              <div
                className="
        absolute
        bottom-3
        right-3
        left-3

        flex
        items-center
        justify-between
        gap-2

        bg-white/90
        backdrop-blur-sm

        rounded-full
        max-[552px]:rounded-xl

        px-3
        max-[552px]:px-2

        py-1.5
        max-[552px]:py-2

        shadow-sm
        "
              >
                {/* Title */}

                <span
                  className="
          text-gray-800
          text-xs
          font-medium

          truncate
          max-[552px]:max-w-[45%]
          "
                >
                  {villa.title}
                </span>

                {/* Count */}

                <span
                  className="
          bg-blue-500
          text-white

          text-xs
          font-semibold

          rounded-full

          px-2.5
          max-[552px]:px-2

          py-0.5

          whitespace-nowrap
          shrink-0
          "
                >
                  {villa.count} مورد
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* More Button */}
        <div className="flex justify-center mt-8">
          <button className="border border-primary500 rounded-full px-8 py-2.5 text-sm text-primary500 hover:border-primary600 hover:text-primary500 transition-colors duration-200">
            مشاهده بیشتر
          </button>
        </div>
      </div>
    </div>
  );
}
