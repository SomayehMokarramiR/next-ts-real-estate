import { ChevronLeft } from "lucide-react";

/* ─── Breadcrumb ──────────────────────────────────────── */
export default function Breadcrumb() {
  const crumbs = ["خانه", "رهن و اجاره", "رزرو هتل رشت", "هتل همایون رشت"];
  return (
    <nav className="flex items-center justify-center gap-1 text-xs text-gray-500 flex-wrap">
      {crumbs.map((crumb, i) => (
        <span key={crumb} className="flex items-center gap-1">
          {i < crumbs.length - 1 ? (
            <>
              <button className="hover:text-blue-600 transition-colors">
                {crumb}
              </button>
              <ChevronLeft size={12} className="text-gray-300 flex-shrink-0" />
            </>
          ) : (
            <span className="text-gray-800 font-medium">{crumb}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
