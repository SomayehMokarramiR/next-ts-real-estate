"use client";

import "swiper/css";
import "swiper/css/pagination";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Info } from "lucide-react";

import { useLogin } from "@/hooks/useAuth";

import { GoogleIcon } from "./GoogleIcon";
import { GithubIcon } from "./GithubIcon";
import PasswordField from "./PasswordField";
import Swal from "sweetalert2";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            Swal.fire({
              icon: "success",
              title: "ورود موفق",
              text: "با موفقیت وارد حساب کاربری شدید",
              confirmButtonText: "ادامه",
            }).then(() => {
              router.push("/");
            });
          }
        },

        onError: (error) => {
          Swal.fire({
            icon: "error",
            title: "خطا در ورود",
            text: error.message,
            confirmButtonText: "تلاش مجدد",
          });
        },
      },
    );
  };
  return (
    <div className="flex flex-col gap-4">
      {/* OAuth buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          className="
          flex-1 flex items-center justify-center gap-2 py-2.5 px-4
          border border-gray-200 dark:border-[#444]
          rounded-full text-sm font-medium
          text-gray-700 dark:text-white
          bg-white dark:bg-[#353535]
          hover:bg-gray-50 dark:hover:bg-[#404040]
          transition-colors
          "
        >
          <GithubIcon />
          Github
        </button>

        <button
          type="button"
          className="
          flex-1 flex items-center justify-center gap-2 py-2.5 px-4
          border border-gray-200 dark:border-[#444]
          rounded-full text-sm font-medium
          text-gray-700 dark:text-white
          bg-white dark:bg-[#353535]
          hover:bg-gray-50 dark:hover:bg-[#404040]
          transition-colors
          "
        >
          <GoogleIcon />
          Google
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />

        <span className="text-xs text-gray-400 dark:text-white whitespace-nowrap">
          یا میتوانید
        </span>

        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ایمیل خود را وارد کنید"
            required
            dir="rtl"
            className="w-full border border-gray-200 dark:border-[#353535] bg-white dark:bg-[#353535] rounded-full py-3 pr-11 pl-4 text-sm text-gray-700 placeholder-gray-400 dark:placeholder-gray-200 focus:outline-none focus:border-primary500 focus:ring-2 focus:ring-primary500/20 transition-all"
          />

          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Mail className="w-4 h-4" />
          </span>
        </div>

        <PasswordField
          placeholder="رمز عبور را وارد کنید"
          value={password}
          onChange={setPassword}
          required
        />

        {loginMutation.error && (
          <p className="text-xs text-red-500 text-center">
            {loginMutation.error.message}
          </p>
        )}

        <div className="flex items-center justify-start gap-1">
          <Info className="w-3.5 h-3.5 text-primary500 shrink-0" />

          <a
            href="#"
            className="text-xs text-primary500 hover:text-primary700 transition-colors"
          >
            رمز عبور خود را فراموش کرده اید ؟
          </a>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="
          w-full bg-primary500 hover:bg-[#1e3fa0]
          active:bg-[#173090]
          text-white font-semibold py-3.5
          rounded-full transition-colors duration-200
          text-sm shadow-md hover:shadow-lg mt-1
          disabled:opacity-60
          "
        >
          {loginMutation.isPending ? "در حال ورود..." : "ورود به حساب کاربری"}
        </button>
      </form>
    </div>
  );
}
