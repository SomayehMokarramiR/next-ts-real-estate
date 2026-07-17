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
  const pages = () => {
    const result: (number | "...")[] = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) result.push(i);
    } else {
      result.push(1);
      if (current > 3) result.push("...");
      for (
        let i = Math.max(2, current - 1);
        i <= Math.min(total - 1, current + 1);
        i++
      )
        result.push(i);
      if (current < total - 2) result.push("...");
      result.push(total);
    }
    return result;
  };

  return (
    <div className="flex items-center justify-center gap-1 mt-8 select-none">
      {/* Prev (RTL: visually right = "prev" in Persian) */}
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={16} />
      </button>

      {pages().map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              current === p
                ? "bg-blue-600 text-white shadow-sm"
                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {p}
          </button>
        ),
      )}
      {/* Next (RTL: visually left = "next" in Persian) */}
      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
      </button>
    </div>
  );
}
