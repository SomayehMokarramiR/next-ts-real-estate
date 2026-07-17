import { Images } from "lucide-react";
import { MAIN_IMAGE, THUMB_IMAGES } from "./constants";

export default function PhotoGallery() {
  return (
    <div className="flex gap-2 h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden">
      <div className="hidden sm:grid grid-cols-2 gap-2 w-2/5">
        {THUMB_IMAGES.map((src, i) => (
          <div key={i} className="relative overflow-hidden rounded-xl">
            <img
              src={src}
              alt={`تصویر ${i + 2}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
            {i === THUMB_IMAGES.length - 1 && (
              <button className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm font-bold hover:bg-black/60 transition-colors">
                <span className="flex items-center gap-1">
                  <Images size={16} />
                  +۵ مشاهده بیشتر
                </span>
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="relative flex-1 rounded-xl overflow-hidden">
        <img
          src={MAIN_IMAGE}
          alt="تصویر اصلی ملک"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
        />
        <button className="sm:hidden absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow">
          <Images size={14} />
          مشاهده همه تصاویر (+۵)
        </button>
      </div>
    </div>
  );
}
