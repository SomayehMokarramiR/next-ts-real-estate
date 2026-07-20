import { ChevronLeft } from "lucide-react";

/* ─── Breadcrumb ──────────────────────────────────────── */
export default function Breadcrumb() {
  const crumbs = [
    "خانه",
    "رهن و اجاره",
    "رزرو هتل رشت",
    "رزرو هتل رشت سراوان رایان",
  ];

  return (
    <nav className="flex items-center justify-center gap-1 text-xs text-gray-500 flex-wrap">
      {crumbs.map((crumb, i) => (
        <span key={crumb} className="flex items-center gap-1">
          {i !== crumbs.length - 1 ? (
            <>
              <button className="hover:text-blue-600 transition-colors max-[450px]:text-[11px]">
                {crumb}
              </button>

              <ChevronLeft size={12} className="text-gray-300 flex-shrink-0" />
            </>
          ) : (
            <span className="font-medium text-primary500 max-[450px]:text-[11px]">
              {crumb}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
