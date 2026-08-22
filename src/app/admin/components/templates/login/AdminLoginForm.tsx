"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import Swal from "sweetalert2";

import { useLogin } from "@/hooks/useAuth";
import PasswordField from "./PasswordField";

export default function AdminLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (data) => {
          if (!data.success) {
            return;
          }

          const user = data.user;

          if (user?.role !== "admin") {
            Swal.fire({
              icon: "error",
              title: "دسترسی غیرمجاز",
              text: "این حساب دسترسی مدیریت ندارد.",
              confirmButtonText: "باشه",
            });

            return;
          }

          Swal.fire({
            icon: "success",
            title: "ورود موفق",
            text: "خوش آمدید مدیر سیستم",
            confirmButtonText: "ورود به پنل",
          }).then(() => {
            router.replace("/admin");
          });
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" dir="rtl">
      {/* Email */}

      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل مدیر"
          required
          autoComplete="email"
          className="
            w-full
            h-11
            rounded-full
            border
            border-gray-200
            dark:border-[#555]
            bg-white
            dark:bg-[#353535]
            px-4
            pr-11
            text-sm
            text-gray-700
            dark:text-white
            focus:outline-none
            focus:border-primary500
          "
        />

        <Mail
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            w-4
            h-4
            text-gray-400
          "
        />
      </div>

      {/* Password */}

      <PasswordField
        placeholder="رمز عبور مدیر"
        value={password}
        onChange={setPassword}
        required
      />

      {/* Error */}

      {loginMutation.error && (
        <p className="text-center text-xs text-red-500">
          {loginMutation.error.message}
        </p>
      )}

      {/* Submit */}

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="
          h-11
          rounded-full
          bg-primary500
          text-white
          text-sm
          font-semibold
          shadow-md
          transition
          hover:bg-[#1e3fa0]
          disabled:opacity-50
        "
      >
        {loginMutation.isPending ? "در حال ورود..." : "ورود به پنل مدیریت"}
      </button>
    </form>
  );
}
