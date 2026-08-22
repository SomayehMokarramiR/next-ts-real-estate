import Link from "next/link";
import { Construction } from "lucide-react";

export default function MaintenancePage() {
  return (
    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-background
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          bg-white
          dark:bg-[#353535]
          p-8
          text-center
          shadow-xl
        "
      >
        {/* Maintenance Icon */}
              <div
          className="
            mx-auto
            mb-6
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-primary500
            text-4xl
            text-white
          "
        >
          🛠
        </div>
        <h1
          className="
            mb-3
            text-2xl
            font-bold
            text-gray-900
            dark:text-white
          "
        >
          سایت در حال بروزرسانی است
        </h1>

        <p
          className="
            mb-6
            text-sm
            leading-7
            text-gray-600
            dark:text-gray-300
          "
        >
          ما در حال انجام تغییرات و بهبود سامانه هستیم. لطفاً کمی بعد دوباره
          مراجعه کنید.
        </p>

        <Link
          href="/admin/login"
          className="
            inline-flex
            items-center
            justify-center
            rounded-xl
            bg-primary500
            px-6
            py-3
            text-sm
            font-medium
            text-white
            transition
            hover:opacity-90
          "
        >
          ورود مدیر سایت
        </Link>

        <div
          className="
            mt-6
            text-xs
            text-gray-400
          "
        >
          املاک آدا
        </div>
      </div>
    </main>
  );
}
