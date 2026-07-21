import { Calendar, Clock } from "lucide-react";
import { PROPERTIES } from "./constants";

export default function PropertyCard({
  prop,
}: {
  prop: (typeof PROPERTIES)[0];
}) {
  return (
    <div className="bg-white dark:bg-[#272727]  rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={prop.image}
          alt={prop.title}
          className="w-full h-44 sm:h-48 object-cover hover:scale-105 transition-transform duration-500"
        />
        {/* Badges on image */}
        <div className="absolute top-3 right-3 flex gap-1.5" dir="rtl">
          <span className="bg-white/90  backdrop-blur-sm text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 shadow-sm">
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

        <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-6 mb-2 line-clamp-1">
          {prop.title}
        </h3>

        <p className="text-gray-500 dark:text-[#CDCED6] text-xs leading-5 mb-4 line-clamp-3 flex-1">
          {prop.description}
        </p>

        <button className="w-full bg-primary500 hover:bg-primary600 active:bg-primay700 text-white text-sm font-medium py-2.5 rounded-xl transition-colors duration-200 mt-auto">
          مشاهده جزییات
        </button>
      </div>
    </div>
  );
}
