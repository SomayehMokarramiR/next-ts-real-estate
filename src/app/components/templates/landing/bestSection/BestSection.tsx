import PropertyCard from "./PropertyCard";
import { properties } from "./constants";

export default function BestSection() {
  return (
    <div
      className="bg-white flex items-center justify-center py-14 px-4"
      style={{ fontFamily: "'Vazirmatn', sans-serif" }}
      dir="rtl"
    >
      <div className="w-full max-w-5xl">
        {/* ── Section header ── */}
        <div className="text-center mb-8">
          <p className="text-sm font-medium mb-1 text-primary500">
            همه جا ما با شما هستیم
          </p>
          <h2 className="text-gray-900 font-extrabold text-[28px] md:text-3xl">
            بهترین اقامتگاه ها برای شما
          </h2>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {properties.map((p) => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>

        {/* ── More button ── */}
        <div className="flex justify-center">
          <button className="px-8 py-2 rounded-full border text-sm font-medium transition-colors hover:bg-teal-50 bg-primary500 text-white">
            مشاهده بیشتر
          </button>
        </div>
      </div>
    </div>
  );
}
