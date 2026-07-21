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

  const pageTitle = "ورود به حساب کاربری";

  return (
    <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div
        className="
          w-full
          max-w-5xl
          bg-white
          rounded-2xl
          shadow-2xl
          overflow-hidden
          flex
          flex-col
          md:flex-row
        "
      >
        {/* Right - Form */}
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
            py-10
            sm:px-8
            sm:py-12
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
              mb-5
              mt-8
            "
          >
            {pageTitle}
          </h1>

          {/* Tabs */}
          <div
            className="
              flex
              bg-[#f0f2f5]
              dark:bg-[#353535]
              rounded-full
              p-1
              mb-6
              gap-1
            "
          >
            {/* Register */}
            <button
              onClick={handleRegister}
              className="
                flex-1
                h-11
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
              onClick={() => setActiveTab("login")}
              className="
                flex-1
                h-11
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

          {/* Login Form */}
          {activeTab === "login" && <LoginForm />}
        </div>

        {/* Left - Hero Swiper */}
        <div
          className="
            relative
            w-full
            md:w-[55%]
            h-56
            sm:h-72
            md:h-auto
            min-h-80
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
            "
          />
        </div>
      </div>
    </div>
  );
}
