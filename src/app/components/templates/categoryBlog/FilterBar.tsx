import { Search, ChevronDown, Filter } from "lucide-react";

import { BLOG_CATEGORIES, SORT_OPTIONS } from "./constants";

interface FilterBarProps {
  sort: string;
  setSort: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  onReset: () => void;
}

export default function FilterBar({
  sort,
  setSort,
  search,
  setSearch,
  category,
  setCategory,
  onReset,
}: FilterBarProps) {
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
      {/* Search + Category */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Search */}
        <div className="flex-[2]">
          <label className="text-xs text-gray-500 dark:text-white mb-1.5 block font-medium">
            جستجو
          </label>

          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="عنوان یا توضیحات مقاله را جستجو کنید"
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
                dark:placeholder:text-gray-500
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

        {/* Category */}
        <div className="flex-1">
          <label className="text-xs text-gray-500 dark:text-white mb-1.5 block font-medium">
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

              {BLOG_CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
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

      {/* Sort */}
      <div className="flex items-center gap-2 flex-wrap">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setSort(option)}
            className={`
              px-4
              py-1.5
              rounded-full
              text-sm
              transition-all
              font-medium
              ${
                sort === option
                  ? "bg-primary500 text-white shadow-sm"
                  : "border border-gray-200 dark:border-primary700 text-gray-600 dark:text-primary500 hover:border-primary700/50 hover:text-primary600"
              }
            `}
          >
            {option}
          </button>
        ))}

        {/* Reset */}
        <button
          type="button"
          onClick={onReset}
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
  );
}
