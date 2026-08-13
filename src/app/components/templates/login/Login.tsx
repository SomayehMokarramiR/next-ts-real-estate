"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

import Logo from "../../modules/logo/Logo";
import LoginForm from "./LoginForm";
import { HOUSE_IMAGES } from "./constants";

export default function Login() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"login">("login");

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <div className="flex items-center justify-center px-4 py-3 sm:px-6">
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
          flex-col
          md:flex-row
          md:h-[450px]
        "
      >
        {/* Form */}
        <div
          className="
            bg-white
            dark:bg-[#272727]
            w-full
            md:w-[45%]
            flex
            flex-col
            justify-center
            px-5
            py-7
            sm:px-8
            sm:py-7
            lg:px-10
          "
        >
          <Logo />

          <h1
            className="
              text-xl
              font-semibold
              text-center
              text-[#1a1a2e]
              dark:text-white
              mt-5
              mb-4
            "
          >
            ورود به حساب کاربری
          </h1>

          {/* Tabs */}
          <div
            className="
              flex
              bg-[#f0f2f5]
              dark:bg-[#353535]
              rounded-full
              p-1
              mb-3
              gap-1
            "
          >
            {/* Register */}
            <button
              type="button"
              onClick={handleRegister}
              className="
                flex-1
                h-10
                flex
                items-center
                justify-center
                gap-1.5
                rounded-full
                whitespace-nowrap
                text-xs
                sm:text-sm
                font-medium
                text-gray-500
                dark:text-white
                hover:text-gray-700
                dark:hover:text-gray-300
                transition-all
              "
            >
              <User className="w-4 h-4 shrink-0" />
              <span>ساخت حساب کاربری</span>
            </button>

            {/* Login */}
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className="
                flex-1
                h-10
                flex
                items-center
                justify-center
                gap-1.5
                rounded-full
                whitespace-nowrap
                text-xs
                sm:text-sm
                font-medium
                bg-primary500
                text-white
                shadow-md
                transition-all
              "
            >
              <User className="w-4 h-4 shrink-0" />
              <span>ورود به حساب کاربری</span>
            </button>
          </div>

          {activeTab === "login" && <LoginForm />}
        </div>

        {/* Slider */}
        <div
          className="
            relative
            w-full
            md:w-[55%]
            h-56
            md:h-full
            shrink-0
          "
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            loop
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            className="w-full h-full login-swiper"
          >
            {HOUSE_IMAGES.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt="تصویر خانه"
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-20
              bg-gradient-to-t
              from-black/40
              to-transparent
              pointer-events-none
              z-10
            "
          />
        </div>
      </div>
    </div>
  );
}
