"use client";
import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import Breadcrumb from "@/app/components/modules/breadcrumb/Breadcrumb";

// ─── Data ───────────────────────────────────────────────────────────────────

const PROPERTY_TYPES = ["ویلایی", "آپارتمانی", "تجاری", "اداری"];

const PROPERTIES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: `بهترین کناطق گردشگری در سال 140...`,
  description:
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
  date: `12 مرداد / 1401 / 12:33`,
  minutes: 30,
  type: PROPERTY_TYPES[i % PROPERTY_TYPES.length],
  image: [
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=380&fit=crop",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=380&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=380&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=380&fit=crop",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&h=380&fit=crop",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&h=380&fit=crop",
  ][i % 6],
  isFree: i % 4 === 0,
}));

const SORT_OPTIONS = ["اخرین بروز رسانی", "جدیدترین", "پر بازدیدترین"];
const POSTS_PER_PAGE = 9;

// ─── Sub-components ──────────────────────────────────────────────────────────

// function Navbar() {
//   const [open, setOpen] = useState(false);
//   const links = ["خانه", "رهن و اجاره", "رزرو هتل رشت", "رزرو هتل ستاره‌ای"];

//   return (
//     <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
//       <div
//         className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between"
//         dir="rtl"
//       >
//         {/* Logo */}
//         <span className="font-bold text-base text-gray-900 shrink-0">
//           رزرو هتل رشت ستاره‌ای رایگان
//         </span>

//         {/* Desktop nav */}
//         <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
//           {links.map((l) => (
//             <a
//               key={l}
//               href="#"
//               className="hover:text-primary600 transition-colors whitespace-nowrap"
//             >
//               {l}
//             </a>
//           ))}
//           <span className="bg-primary500 text-white text-xs px-3 py-1 rounded-full font-medium">
//             رایگان
//           </span>
//         </nav>

//         {/* Mobile hamburger */}
//         <button className="md:hidden p-1" onClick={() => setOpen(!open)}>
//           <div className="w-5 h-0.5 bg-gray-700 mb-1" />
//           <div className="w-5 h-0.5 bg-gray-700 mb-1" />
//           <div className="w-5 h-0.5 bg-gray-700" />
//         </button>
//       </div>

//       {/* Mobile menu */}
//       {open && (
//         <div
//           className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-3"
//           dir="rtl"
//         >
//           {links.map((l) => (
//             <a
//               key={l}
//               href="#"
//               className="text-sm text-gray-700 hover:text-primary600"
//             >
//               {l}
//             </a>
//           ))}
//         </div>
//       )}
//     </header>
//   );
// }

// function Breadcrumb() {
//   return (
//     <div className="bg-gray-50 border-b border-gray-100" dir="rtl">
//       <div className="max-w-7xl mx-auto px-4 py-2.5">
//         <ol className="flex items-center gap-1.5 text-xs text-gray-500 flex-wrap">
//           <li className="flex items-center gap-1 hover:text-primary600 cursor-pointer">
//             <Home className="w-3 h-3" />
//             <span>خانه</span>
//           </li>
//           <li>
//             <ChevronLeft className="w-3 h-3 text-gray-300" />
//           </li>
//           <li className="hover:text-primary600 cursor-pointer">رهن و اجاره</li>
//           <li>
//             <ChevronLeft className="w-3 h-3 text-gray-300" />
//           </li>
//           <li className="text-primary600 font-medium">رزرو هتل رشت</li>
//         </ol>
//       </div>
//     </div>
//   );
// }

function FilterBar({
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
      className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 shadow-sm"
      dir="rtl"
    >
      {/* Top row — labels */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-[2]">
          <label className="text-xs text-gray-500 mb-1.5 block font-medium">
            جستجو
          </label>
          <div className="flex gap-2">
            <div className="relative">
              <select className="appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primay700/50 pr-9 h-full">
                <option>نام هتل مورد نظر</option>
                <option>قیمت</option>
                <option>منطقه</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="نام هتل مورد نظر"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary700/50 focus:border-transparent pl-10"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1.5 block font-medium">
            دسته بندی
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary700/50 focus:border-transparent pr-9"
            >
              <option value="">همه دسته‌ها</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Sort chips + filter button */}
      <div className="flex items-center gap-2 flex-wrap">
        <button className="flex items-center gap-1.5 border border-gray-300 rounded-xl px-3 py-1.5 text-sm text-gray-600 hover:border-primary700/50 hover:text-primary600 transition-colors">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          فیلتر
          <span className="bg-primary500 text-white text-xs px-1.5 py-0.5 rounded-full leading-none">
            رایگان
          </span>
        </button>

        <div className="h-5 w-px bg-gray-200 mx-1" />

        <div className="flex items-center gap-2 flex-wrap">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setSort(opt)}
              className={`px-4 py-1.5 rounded-xl text-sm transition-all font-medium ${
                sort === opt
                  ? "bg-primary500 text-white shadow-sm"
                  : "border border-gray-200 text-gray-600 hover:border-primary700/50 hover:text-primary600"
              }`}
            >
              {opt}
            </button>
          ))}

          <button
            onClick={() => {
              // منطق حذف فیلترها یا ریست
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#FF220C] text-white text-sm font-medium transition hover:opacity-90"
          >
            حذف
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function PropertyCard({ prop }: { prop: (typeof PROPERTIES)[0] }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={prop.image}
          alt={prop.title}
          className="w-full h-44 sm:h-48 object-cover hover:scale-105 transition-transform duration-500"
        />
        {/* Badges on image */}
        <div className="absolute top-3 right-3 flex gap-1.5" dir="rtl">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 shadow-sm">
            <Clock className="w-3 h-3 text-primary500" />
            {prop.minutes} دقیقه
          </span>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-primary500 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
            {prop.type}
          </span>
        </div>
        {prop.isFree && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-primary600/80 text-white text-xs px-2.5 py-1 rounded-full font-medium">
              رایگان
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1" dir="rtl">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
          <Calendar className="w-3.5 h-3.5 text-primay700/50" />
          <span>{prop.date}</span>
        </div>

        <h3 className="font-bold text-gray-900 text-sm leading-6 mb-2 line-clamp-1">
          {prop.title}
        </h3>

        <p className="text-gray-500 text-xs leading-5 mb-4 line-clamp-3 flex-1">
          {prop.description}
        </p>

        <button className="w-full bg-primary500 hover:bg-primary600 active:bg-primay700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors duration-200 mt-auto">
          مشاهده جزییات
        </button>
      </div>
    </div>
  );
}

function Pagination({
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
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-primay500/50 hover:border-primay700/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight className="w-4 h-4" />
        قبلی
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
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="flex items-center gap-1 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-primay500/50 hover:border-primay700/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        بعدی
        <ChevronLeft className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function CategoryBlog() {
  const [sort, setSort] = useState("اخرین بروز رسانی");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const filtered = PROPERTIES.filter((p) => {
    const matchSearch = search === "" || p.title.includes(search);
    const matchCat = category === "" || p.type === category;
    return matchSearch && matchCat;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <div>
      <Breadcrumb />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <FilterBar
          sort={sort}
          setSort={setSort}
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
        />

        {/* Results count */}
        <div className="flex items-center justify-between mb-4" dir="rtl">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-800">
              {filtered.length}
            </span>
            آگهی یافت شد
          </p>
          <p className="text-xs text-gray-400">
            صفحه {currentPage} از {totalPages}
          </p>
        </div>

        {/* Grid 3 × 4 */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((prop) => (
              <PropertyCard key={prop.id} prop={prop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-400 text-sm" dir="rtl">
            آگهی‌ای یافت نشد. فیلترها را تغییر دهید.
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            current={currentPage}
            total={totalPages}
            onChange={(p) => {
              setPage(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </main>
    </div>
  );
}
