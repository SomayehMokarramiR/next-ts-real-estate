"use client";

import { useState } from "react";
import { User, Mail, ArrowLeft } from "lucide-react";
import Logo from "../../modules/logo/Logo";
export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-10 lg:py-0">
      {/* Logo */}
      <Logo />

      <div className="w-full max-w-sm mt-8">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-8">
          فراموشی رمز عبور
        </h1>

        {sent ? (
          <div className="text-center space-y-4" dir="rtl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-gray-700 font-medium">کد تایید ارسال شد</p>
            <p className="text-sm text-gray-500">
              لینک بازیابی رمز عبور به ایمیل{" "}
              <span className="font-medium text-blue-600">{email}</span> ارسال
              شد.
            </p>
            <button
              onClick={() => setSent(false)}
              className="text-sm text-primay500 hover:underline flex items-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              بازگشت
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email input */}
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />

              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-[321px] h-12 border border-[#CDCED6] dark:border-[#353535] bg-white dark:bg-[#353535] rounded-full pr-11 px-4 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary500 focus:border-primary500 transition-all"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-[321px] h-12 bg-primary500 hover:bg-primary600 text-white font-medium text-sm rounded-full transition-colors"
            >
              ارسال کد تایید
            </button>

            {/* Back to login */}
            <p className="text-center text-sm text-gray-500 pt-1">
              <a
                href="#"
                className="text-primary500 hover:text-primary600 font-medium hover:underline"
              >
                بازگشت به ورود
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
