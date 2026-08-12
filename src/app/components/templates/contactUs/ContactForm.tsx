"use client";

import { Mail, Send, User, MessageSquare } from "lucide-react";
import { useState } from "react";

import { useSendContactMessage } from "@/hooks/useContact";
import { contactUsFormValidator } from "@/validators/contactUsFormValidator";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [website, setWebsite] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const {
    mutateAsync: sendContactMessage,
    isPending,
    isSuccess,
    error,
    reset,
  } = useSendContactMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPending) return;

    // -------------------------
    // Honeypot
    // -------------------------

    if (website.trim()) {
      return;
    }

    // -------------------------
    // Validation
    // -------------------------

    const validation = contactUsFormValidator(name, email, message);

    setErrors(validation.errors);

    if (!validation.isValid) {
      return;
    }

    setErrors({});

    try {
      await sendContactMessage({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        website,
      });

      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
      setErrors({});
    } catch {
      // React Query error را مدیریت می‌کند
    }
  };

  const handleNameChange = (value: string) => {
    setName(value);

    if (errors.name) {
      setErrors((prev) => ({
        ...prev,
        name: undefined,
      }));
    }

    if (error) {
      reset();
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (errors.email) {
      setErrors((prev) => ({
        ...prev,
        email: undefined,
      }));
    }

    if (error) {
      reset();
    }
  };

  const handleMessageChange = (value: string) => {
    setMessage(value);

    if (errors.message) {
      setErrors((prev) => ({
        ...prev,
        message: undefined,
      }));
    }

    if (error) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
        با ما در ارتباط باشید
      </h3>

      {/* Success */}
      {isSuccess && (
        <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 px-4 py-3 text-sm text-green-600 dark:text-green-400 text-right">
          پیام شما با موفقیت ارسال شد ✓
        </div>
      )}

      {/* API Error */}
      {error && (
        <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-600 dark:text-red-400 text-right">
          {error instanceof Error
            ? error.message
            : "خطایی در ارسال پیام رخ داد."}
        </div>
      )}

      {/* Name */}
      <div>
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="نام و نام خانوادگی"
            required
            disabled={isPending}
            dir="rtl"
            aria-invalid={!!errors.name}
            className={`w-full border ${
              errors.name
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200 dark:border-[#353535] focus:border-primary500 focus:ring-primary500/20"
            } bg-[#F0F0F3] dark:bg-[#353535] rounded-full py-3 pr-12 pl-4 text-sm text-gray-700 dark:text-white placeholder-[#8B8D98] dark:placeholder-[#D9D9E0] focus:outline-none focus:ring-2 transition-all shadow-[0_2px_8px_rgba(72,72,72,0.16)] disabled:opacity-60 disabled:cursor-not-allowed`}
          />

          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <User className="w-4 h-4" />
          </span>
        </div>

        {errors.name && (
          <p className="text-red-500 text-xs mt-1.5 mr-3">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="ایمیل"
            required
            disabled={isPending}
            dir="ltr"
            aria-invalid={!!errors.email}
            className={`w-full border ${
              errors.email
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200 dark:border-[#353535] focus:border-primary500 focus:ring-primary500/20"
            } bg-[#F0F0F3] dark:bg-[#353535] rounded-full py-3 pr-12 pl-4 text-sm text-gray-700 dark:text-white placeholder-[#8B8D98] dark:placeholder-[#D9D9E0] focus:outline-none focus:ring-2 transition-all shadow-[0_2px_8px_rgba(72,72,72,0.16)] disabled:opacity-60 disabled:cursor-not-allowed`}
          />

          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Mail className="w-4 h-4" />
          </span>
        </div>

        {errors.email && (
          <p className="text-red-500 text-xs mt-1.5 mr-3">{errors.email}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => handleMessageChange(e.target.value)}
            placeholder="پیام شما"
            required
            disabled={isPending}
            rows={5}
            dir="rtl"
            aria-invalid={!!errors.message}
            className={`w-full border ${
              errors.message
                ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200 dark:border-[#353535] focus:border-primary500 focus:ring-primary500/20"
            } bg-[#F0F0F3] dark:bg-[#353535] rounded-xl py-3 pr-12 pl-4 text-sm text-gray-700 dark:text-white placeholder-[#8B8D98] dark:placeholder-[#D9D9E0] focus:outline-none focus:ring-2 transition-all resize-none shadow-[0_2px_8px_rgba(72,72,72,0.16)] disabled:opacity-60 disabled:cursor-not-allowed`}
          />

          <span className="absolute right-3.5 top-3.5 text-gray-400 pointer-events-none">
            <MessageSquare className="w-4 h-4" />
          </span>
        </div>

        {errors.message && (
          <p className="text-red-500 text-xs mt-1.5 mr-3">{errors.message}</p>
        )}
      </div>

      {/* Honeypot */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] w-px h-px overflow-hidden"
      >
        <label htmlFor="website">Website</label>

        <input
          id="website"
          name="website"
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 bg-primary500 hover:bg-[#1e3fa0] active:bg-[#173090] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-full transition-colors text-sm shadow-md hover:shadow-lg"
      >
        {isPending ? (
          <>
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            در حال ارسال...
          </>
        ) : isSuccess ? (
          "پیام شما ارسال شد ✓"
        ) : (
          <>
            <Send className="w-4 h-4" />
            ارسال درخواست شما
          </>
        )}
      </button>
    </form>
  );
}
