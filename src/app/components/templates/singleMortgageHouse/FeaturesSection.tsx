import { useState } from "react";

// SVG icons
const IcHome = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <path d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
    <path d="M9 22V12h6v10" />
  </svg>
);
const IcDoc = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M9 7h6M9 11h6M9 15h4" />
  </svg>
);
const IcBuild = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <rect x="3" y="3" width="18" height="18" rx="1" />
    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
  </svg>
);
const IcCal = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const IcArea = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <path d="M3 3h7M3 3v7M21 21h-7M21 21v-7M3 21h7M3 21v-7M21 3h-7M21 3v7" />
  </svg>
);
const IcFloor = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <rect x="2" y="14" width="20" height="7" rx="1" />
    <rect x="5" y="8" width="14" height="6" rx="1" />
    <rect x="8" y="3" width="8" height="5" rx="1" />
  </svg>
);
const IcHeat = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <path d="M12 2a5 5 0 015 5c0 2.5-2 4-2 6.5a3 3 0 01-6 0C9 11 7 9.5 7 7a5 5 0 015-5z" />
  </svg>
);
const IcPark = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 17V7h4a3 3 0 010 6H9" />
  </svg>
);
const IcClock = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);
const IcCheck = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <path d="M9 12l2 2 4-4" />
    <circle cx="12" cy="12" r="9" />
  </svg>
);
const IcFacade = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <rect x="2" y="6" width="20" height="15" rx="1" />
    <path d="M2 10h20M7 6V3M12 6V3M17 6V3" />
  </svg>
);
const IcKitchen = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <rect x="2" y="8" width="20" height="13" rx="1" />
    <path d="M2 12h20M6 8V5a2 2 0 014 0v3M14 8V5a2 2 0 014 0v3" />
  </svg>
);
const IcPhone = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <path d="M6.6 10.8a15.4 15.4 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.6 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.4 11.4 0 00.6 3.6 1 1 0 01-.25 1L6.6 10.8z" />
  </svg>
);
const IcBath = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <path d="M4 12h16v3a5 5 0 01-10 0v0a5 5 0 01-6 0v-3z" />
    <path d="M4 12V5a2 2 0 014 0v7" />
  </svg>
);
const IcGas = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <rect x="3" y="11" width="18" height="10" rx="1" />
    <path d="M3 15h18M7 11V7M12 11V7M17 11V7" />
    <circle cx="7" cy="7" r="1" fill="currentColor" />
    <circle cx="12" cy="7" r="1" fill="currentColor" />
    <circle cx="17" cy="7" r="1" fill="currentColor" />
  </svg>
);
const IcBalcony = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <rect x="3" y="13" width="18" height="3" rx="1" />
    <path d="M7 13V8M12 13V8M17 13V8M3 16v3M21 16v3" />
    <rect x="3" y="5" width="18" height="3" rx="1" />
  </svg>
);
const IcAC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <rect x="2" y="5" width="20" height="9" rx="2" />
    <path d="M7 14v5M12 14v3M17 14v5M2 9h20" />
  </svg>
);
const IcBed = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <path d="M3 7v13M21 7v13M3 13h18M3 7a4 4 0 014-4h10a4 4 0 014 4" />
    <rect x="7" y="9" width="4" height="4" rx="1" />
    <rect x="13" y="9" width="4" height="4" rx="1" />
  </svg>
);
const IcElev = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M12 2v20M8 8l4-4 4 4M8 16l4 4 4-4" />
  </svg>
);
const IcCompass = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    <path d="M15 9l-3 3-3-3 3-6 3 6z" fill="currentColor" stroke="none" />
  </svg>
);
const IcStorage = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    className="w-5 h-5 sm:w-6 sm:h-6"
  >
    <rect x="2" y="7" width="20" height="14" rx="1" />
    <path d="M2 11h20M9 7V4M15 7V4M9 15h6" />
  </svg>
);

const features = [
  {
    id: "units",
    icon: <IcHome />,
    title: "تعداد واحد",
    value: "۲ واحد",
    active: true,
  },
  { id: "deed", icon: <IcDoc />, title: "سند", value: "تک برگ" },
  { id: "floors", icon: <IcBuild />, title: "تعداد طبقات", value: "۱۴ طبقه" },
  { id: "year", icon: <IcCal />, title: "سال ساخت", value: "۱۹۹۹ سال" },
  { id: "area", icon: <IcArea />, title: "متراژ ملک", value: "۱۲۰ متر" },
  { id: "floor", icon: <IcFloor />, title: "کف‌پوش", value: "سنگی" },
  { id: "heat", icon: <IcHeat />, title: "گرمایش", value: "پکیج" },
  { id: "parking", icon: <IcPark />, title: "پارکینگ", value: "دارد" },
  { id: "age", icon: <IcClock />, title: "سن بنا", value: "نوساز" },
  { id: "status", icon: <IcCheck />, title: "وضعیت ملک", value: "در دسترس" },
  { id: "facade", icon: <IcFacade />, title: "نوع نما", value: "ایرانی" },
  { id: "kitchen", icon: <IcKitchen />, title: "اوپن", value: "سرامیک" },
  { id: "phone", icon: <IcPhone />, title: "خط تلفن", value: "دارد" },
  { id: "bath", icon: <IcBath />, title: "حمام", value: "۲ حمام" },
  { id: "gas", icon: <IcGas />, title: "اجاق گاز", value: "دارد" },
  { id: "balcony", icon: <IcBalcony />, title: "بالکن", value: "دارد" },
  { id: "ac", icon: <IcAC />, title: "سرمایش", value: "کولر گازی" },
  { id: "bed", icon: <IcBed />, title: "اتاق خواب", value: "۳ خواب" },
  { id: "elevator", icon: <IcElev />, title: "آسانسور", value: "دارد" },
  { id: "compass", icon: <IcCompass />, title: "طرق بنا", value: "جنوبی" },
  { id: "storage", icon: <IcStorage />, title: "انبار", value: "دارد" },
];

export default function FeaturesSection() {
  const [activeId, setActiveId] = useState("units");
  return (
    <section className="bg-white dark:bg-[#272727] rounded-2xl border border-gray-100 dark:border-[#353535] shadow-sm p-4 sm:p-6">
      <div
        className=" grid 
    grid-cols-2 
    sm:grid-cols-3 
    md:grid-cols-4 
    lg:grid-cols-5 
    xl:grid-cols-7 
    gap-2 
    sm:gap-3"
      >
        {features.map((f) => {
          const isActive = f.id === activeId;
          return (
            <button
              key={f.id}
              onClick={() => setActiveId(f.id)}
              className={[
                "flex flex-col items-center justify-center gap-1.5 rounded-xl border px-1.5 py-3 sm:py-4 transition-all duration-200 cursor-pointer text-center",
                isActive
                  ? "bg-primary600 border-primary600 text-white shadow-md shadow-[#3361f8]"
                  : "bg-white dark:bg-[#353535] border-gray-200 dark:border-[#353535] text-gray-700 hover:border-[#3361f8] hover:bg-[#3361f8]/40",
              ].join(" ")}
            >
              <span className={isActive ? "text-white" : "text-[#335be2]"}>
                {f.icon}
              </span>
              <span className="font-bold text-[10px] sm:text-xs leading-tight dark:text-white">
                {f.title}
              </span>
              <span
                className={[
                  "text-[9px] sm:text-[11px] leading-tight",
                  isActive
                    ? "text-indigo-100 dark:text-gray-50"
                    : "text-gray-400",
                ].join(" ")}
              >
                {f.value}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex justify-start mt-5">
        <button className="border border-gray-300 dark:border-white text-gray-600 dark:text-white text-xs sm:text-sm rounded-full px-5 py-2 hover:border-primary500 hover:text-primary600 transition-colors">
          نظرات کاربران
        </button>
      </div>
    </section>
  );
}
