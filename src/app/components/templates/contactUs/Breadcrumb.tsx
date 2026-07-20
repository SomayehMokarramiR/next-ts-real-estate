import { Home, ChevronLeft } from "lucide-react";
export default function Breadcrumb() {
  return (
    <nav
      className="flex items-center justify-center gap-1.5 text-sm text-gray-500 mb-8"
      aria-label="مسیر صفحه"
    >
      <a
        href="#"
        className="flex items-center gap-1 hover:text-primary500 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        خانه
      </a>
      <ChevronLeft className="w-3.5 h-3.5 text-gray-300" />
      <span className="text-primary500 font-medium">ارتباط با ما</span>
    </nav>
  );
}
