import { ChevronLeft, ChevronRight } from "lucide-react";
export default function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (p: number) => void;
}) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div
      className="flex items-center justify-center gap-2 mt-10 mb-2"
      dir="rtl"
    >
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 dark:text-white hover:bg-primay500/50 hover:border-primay700/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        بعدی
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
              p === current
                ? "bg-primary500 text-white shadow-sm"
                : "border border-gray-200 text-gray-600 hover:bg-primay500/50 hover:border-primay700/50"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="flex items-center gap-1 px-3 py-2  text-sm text-gray-600 dark:text-white hover:bg-primay500/50 hover:border-primay700/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-4 h-4" />
        قبلی
      </button>
    </div>
  );
}
