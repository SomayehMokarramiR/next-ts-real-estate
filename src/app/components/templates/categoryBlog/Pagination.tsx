import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  current,
  total,
  onChange,
}: PaginationProps) {
  if (total <= 1) {
    return null;
  }

  const pages = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <div
      className="flex items-center justify-center gap-2 mt-10 mb-2"
      dir="rtl"
    >
      {/* Next */}
      <button
        type="button"
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="
          flex
          items-center
          gap-1
          px-3
          py-2
          text-sm
          text-gray-600
          dark:text-white
          hover:bg-primary500/10
          hover:border-primary700/50
          disabled:opacity-40
          disabled:cursor-not-allowed
          transition-all
          rounded-lg
        "
      >
        بعدی
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Pages */}
      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onChange(page)}
            className={`
              w-9
              h-9
              rounded-xl
              text-sm
              font-medium
              transition-all
              ${
                page === current
                  ? "bg-primary500 text-white shadow-sm"
                  : `
                    border
                    border-gray-200
                    dark:border-[#444]
                    text-gray-600
                    dark:text-white
                    hover:bg-primary500/10
                    hover:border-primary700/50
                  `
              }
            `}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Previous */}
      <button
        type="button"
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="
          flex
          items-center
          gap-1
          px-3
          py-2
          text-sm
          text-gray-600
          dark:text-white
          hover:bg-primary500/10
          hover:border-primary700/50
          disabled:opacity-40
          disabled:cursor-not-allowed
          transition-all
          rounded-lg
        "
      >
        <ChevronLeft className="w-4 h-4" />
        قبلی
      </button>
    </div>
  );
}
