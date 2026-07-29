"use client";

import { useEffect, useState } from "react";
import { Home, User } from "lucide-react";
import Logo from "../../modules/logo/Logo";

const HOUSE_IMAGES = [
  "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  "https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
  "https://images.unsplash.com/photo-1722421492323-eaf9c401befe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
];

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<"register" | "login">("register");

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) =>
        prev === HOUSE_IMAGES.length - 1 ? 0 : prev + 1,
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      dir="rtl"
      className="
      flex
      items-center
      justify-center
      p-4
      sm:p-6
      lg:p-8
      "
    >
      <div
        className="
        w-full
        max-w-5xl
        bg-white
        dark:bg-[#272727]
        rounded-2xl
        shadow-2xl
        overflow-hidden
        flex
        flex-col-reverse
        md:flex-row
        "
      >
        {/* FORM SIDE */}

        <div
          className="
          w-full
          md:w-[40%]
          flex
          flex-col
          justify-center
          px-5
          py-10
          sm:px-8
          lg:px-12
          "
        >
          {/* Logo */}

          <Logo />

          <h1
            className="
            text-xl
            font-semibold
            text-center
            text-[#1a1a2e]
            dark:text-white
            mb-6
            mt-8
            "
          >
            ایجاد حساب کاربری
          </h1>

          {/* Tabs */}

          <div
            className="
            flex
            bg-[#f0f2f5]
            dark:bg-[#353535]
            rounded-full
            p-1
            mb-7
            gap-1
            "
          >
            <button
              type="button"
              onClick={() => setActiveTab("register")}
              className={`
              flex-1
              flex
              items-center
              justify-center
              gap-2
              py-2.5
              px-2
              rounded-full
              font-medium
              whitespace-nowrap
              transition-all

              text-sm

              min-[760px]:max-[872px]:text-xs
              min-[760px]:max-[872px]:gap-1

              ${
                activeTab === "register"
                  ? "bg-[#2A52BE] text-white"
                  : "text-gray-500 hover:text-gray-700"
              }
              `}
            >
              <User
                size={16}
                className="
                shrink-0
                min-[760px]:max-[872px]:w-3.5
                min-[760px]:max-[872px]:h-3.5
                "
              />

              <span>ساخت حساب کاربری</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className={`
              flex-1
              flex
              items-center
              justify-center
              gap-2
              py-2.5
              px-2
              rounded-full
              font-medium
              whitespace-nowrap
              transition-all
              text-sm
              min-[760px]:max-[872px]:text-xs
              min-[760px]:max-[872px]:gap-1

              ${
                activeTab === "login"
                  ? "bg-[#2A52BE] dark:bg-white text-white"
                  : "text-gray-500 dark:text-white hover:text-gray-700 dark:hover:text-gray-400"
              }
              `}
            >
              <User
                size={16}
                className="
                shrink-0
                min-[760px]:max-[872px]:w-3.5
                min-[760px]:max-[872px]:h-3.5
                "
              />

              <span>ورود</span>
            </button>
          </div>

          {children}
        </div>

        {/* IMAGE SLIDER SIDE */}

        <div
          className="
          relative
          w-full
          md:w-[60%]
          min-h-[280px]
          sm:min-h-[360px]
          md:min-h-[520px]
          "
        >
          <img
            src={HOUSE_IMAGES[activeSlide]}
            alt="house"
            className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            transition-opacity
            duration-700
            "
          />

          <div
            className="
            absolute
            inset-0
            bg-black/20
            "
          />

          {/* Bullets */}

          <div
            className="
            absolute
            bottom-5
            left-1/2
            -translate-x-1/2
            flex
            items-center
            gap-2
            "
          >
            {HOUSE_IMAGES.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`
                rounded-full
                transition-all
                duration-300

                ${
                  activeSlide === index
                    ? "w-7 h-2.5 bg-primary500"
                    : "w-2.5 h-2.5 bg-white/80"
                }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
