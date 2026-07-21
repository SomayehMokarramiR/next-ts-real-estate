import { Search, SlidersHorizontal, ChevronDown, Filter } from "lucide-react";
import { PROPERTY_TYPES, SORT_OPTIONS } from "./constants";

export default function FilterBar({
  sort,
  setSort,
  search,
  setSearch,
  category,
  setCategory,
}: {
  sort: string;
  setSort: (s: string) => void;
  search: string;
  setSearch: (s: string) => void;
  category: string;
  setCategory: (s: string) => void;
}) {
  return (
    <div
      className="
        bg-white
        dark:bg-[#272727]
        border
        border-gray-200
        dark:border-[#444]
        rounded-2xl
        p-4
        mb-6
        shadow-sm
      "
      dir="rtl"
    >
      {/* Top row */}

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* SEARCH */}

        <div className="flex-[2]">
          <label
            className="
              text-xs
              text-gray-500
              dark:text-white
              mb-1.5
              block
              font-medium
            "
          >
            جستجو
          </label>

          <div className="flex gap-2">
            <div className="relative">
              <select
                className="
                  appearance-none
                  border
                  border-gray-200
                  dark:border-[#444]
                  rounded-full
                  px-4
                  py-2.5
                  text-sm
                  text-gray-700
                  dark:text-white
                  bg-gray-50
                  dark:bg-[#353535]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary700/50
                  pr-9
                  h-full
                "
              >
                <option>نام هتل مورد نظر</option>
                <option>قیمت</option>
                <option>منطقه</option>
              </select>

              <ChevronDown
                className="
                  w-4
                  h-4
                  text-gray-400
                  dark:text-gray-300
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  pointer-events-none
                "
              />
            </div>

            <div className="relative flex-1">
              <input
                type="text"
                placeholder="نام هتل مورد نظر"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full
                  border
                  border-gray-200
                  dark:border-[#444]
                  rounded-full
                  px-4
                  py-2.5
                  text-sm
                  text-gray-700
                  dark:text-white
                  placeholder:text-gray-400
                  dark:placeholder:text-gray-700
                  bg-gray-50
                  dark:bg-[#353535]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary700/50
                  focus:border-transparent
                  pl-10
                "
              />

              <Search
                className="
                  w-4
                  h-4
                  text-gray-700
                  dark:text-white
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  pointer-events-none
                "
              />
            </div>
          </div>
        </div>

        {/* CATEGORY */}

        <div className="flex-1">
          <label
            className="
              text-xs
              text-gray-500
              dark:text-white
              mb-1.5
              block
              font-medium
            "
          >
            دسته بندی
          </label>

          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="
                w-full
                appearance-none
                border
                border-gray-200
                dark:border-[#444]
                rounded-full
                px-4
                py-2.5
                text-sm
                text-gray-700
                dark:text-white
                bg-gray-50
                dark:bg-[#353535]
                focus:outline-none
                focus:ring-2
                focus:ring-primary700/50
                focus:border-transparent
                pr-9
              "
            >
              <option value="">همه دسته‌ها</option>

              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <ChevronDown
              className="
                w-4
                h-4
                text-gray-400
                dark:text-gray-300
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                pointer-events-none
              "
            />
          </div>
        </div>
      </div>

      {/* SORT */}

      <div className="flex items-center gap-2 flex-wrap">
        {/* <button
          className="
            flex
            items-center
            gap-1.5
            border
            border-gray-300
            dark:border-[#555]
            rounded-full
            px-3
            py-1.5
            text-sm
            text-gray-600
            dark:text-white
            hover:border-primary700/50
            hover:text-primary600
            transition-colors
          "
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          فیلتر
          <span
            className="
              bg-primary500
              text-white
              text-xs
              px-1.5
              py-0.5
              rounded-full
              leading-none
            "
          >
            رایگان
          </span>
        </button> */}

        {/* <div className="h-5 w-px bg-gray-200 dark:bg-[#555] mx-1" /> */}

        <div className="flex items-center gap-2 flex-wrap">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setSort(opt)}
              className={`
                px-4
                py-1.5
                rounded-full
                text-sm
                transition-all
                font-medium

                ${
                  sort === opt
                    ? "bg-primary500 text-white shadow-sm"
                    : `
                      border
                      border-gray-200
                      dark:border-primary700
                      text-gray-600
                      dark:text-primary500
                      hover:border-primary700/50
                      hover:text-primary600
                    `
                }
              `}
            >
              {opt}
            </button>
          ))}

          <button
            className="
              flex
              items-center
              gap-1.5
              px-4
              py-1.5
              rounded-full
              bg-[#FF220C]
              text-white
              text-sm
              font-medium
              transition
              hover:opacity-90
            "
          >
            حذف
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
