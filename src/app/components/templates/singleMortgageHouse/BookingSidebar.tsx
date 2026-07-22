import { CalendarDays, Home, MessageCircle, Phone, User } from "lucide-react";

export default function BookingSidebar({
  showPhone,
  onTogglePhone,
}: {
  showPhone: boolean;
  onTogglePhone: () => void;
}) {
  return (
    <div className="bg-white dark:bg-[#272727] rounded-2xl shadow-sm border border-gray-100 dark:border-[#353535] overflow-hidden  top-20">
      <div className="bg-primary500 px-5 py-3.5 flex items-center justify-center gap-2">
        <Home className="w-4 h-4 text-white" />
        <span className="text-white font-semibold text-sm">رزرو خونه برای</span>
      </div>
      <div className="px-5 pt-4 pb-3 border-b border-gray-100 dark:border-[#353535] ">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary500/50 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-primary700" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">
              امیر محمد خیابانی
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-100 mt-0.5">
              میزبان تأیید شده
            </p>
          </div>
        </div>
      </div>
      <div className="px-5 py-3 border-b border-gray-100 dark:border-[#353535]  flex items-center gap-2 text-sm text-gray-700 dark:text-gray-400">
        <CalendarDays className="w-4 h-4 text-primary700 flex-shrink-0" />
        <span className="font-medium">۳ تیر ۱۴۰۴</span>
        <span className="text-gray-400 dark:text-gray-100 mx-1">—</span>
        <span className="font-medium">۱۰/۱۰</span>
      </div>
      <div className="px-5 py-4 space-y-3 border-b border-gray-100 dark:border-[#353535] ">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-200 mb-2">
          قیمت
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            قیمت رهن از
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-bold text-gray-900 dark:text-white">
              ۴٬۵۰۰٬۰۰۰
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-100">
              تومان
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            قیمت اجاره از
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-bold text-gray-900 dark:text-white">
              ۴٬۵۰۰٬۰۰۰
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-100">
              تومان{" "}
            </span>
          </div>
        </div>
      </div>
      <div className="px-5 pt-4 pb-5 space-y-2">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-200 mb-3">
          ارتباط با فروشنده
        </p>
        <button
          onClick={onTogglePhone}
          className="w-full flex items-center justify-center gap-2 border-2 border-primary700 text-primary500 rounded-xl py-2.5 text-sm font-semibold hover:bg-primary500/50 dark:hover:text-white transition-colors"
        >
          <Phone className="w-4 h-4" />
          {showPhone ? "۰۹۳۸****۳۵۳" : "نمایش شماره تماس"}
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-primary500 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-primary600 transition-colors">
          <MessageCircle className="w-4 h-4" />
          گفت‌وگو با فروشنده
        </button>
        <p className="text-xs text-gray-400 dark:text-gray-100 text-center pt-1">
          پاسخگویی سریع · معمولاً ظرف یک ساعت
        </p>
      </div>
    </div>
  );
}
