import { AMENITIES } from "./constants";

export default function AmenitiesGrid() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 mt-4">
      <h3 className="text-sm font-bold text-gray-800 mb-3">امکانات</h3>
      <div className="grid grid-cols-3 gap-3">
        {AMENITIES.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1.5 p-2 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors"
          >
            <Icon size={20} className="text-blue-500" />
            <span className="text-[11px] text-gray-600 text-center leading-tight">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
