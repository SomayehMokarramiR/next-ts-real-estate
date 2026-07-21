"use client";
import { Mail, Send, User, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
        با ما در ارتباط باشید
      </h3>

      {/* Name */}
      <div className="relative">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="نام و نام خانوادگی"
          required
          dir="rtl"
          className="w-full border border-gray-200 dark:border-[#353535] bg-[#F0F0F3] dark:bg-[#353535] rounded-full py-3 pr-12 pl-4 text-sm text-gray-700 placeholder-[#8B8D98] dark:placeholder-[#D9D9E0]   focus:outline-none focus:border-primary500 focus:ring-2 focus:ring-primary500/20 transition-all shadow-[0_2px_8px_rgba(72,72,72,0.16)]"
        />

        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <User className="w-4 h-4" />
        </span>
      </div>

      {/* Email */}
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل"
          required
          dir="rtl"
          className="w-full border border-gray-200 dark:border-[#353535] bg-[#F0F0F3] dark:bg-[#353535] rounded-full py-3 pr-12 pl-4 text-sm text-gray-700 placeholder-[#8B8D98] dark:placeholder-[#D9D9E0]   focus:outline-none focus:border-primary500 focus:ring-2 focus:ring-primary500/20 transition-all shadow-[0_2px_8px_rgba(72,72,72,0.16)]"
        />

        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Mail className="w-4 h-4" />
        </span>
      </div>

      {/* Message */}
      <div className="relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="پیام شما"
          required
          rows={5}
          dir="rtl"
          className="w-full border border-gray-200 dark:border-[#353535] bg-[#F0F0F3] dark:bg-[#353535] rounded-xl py-3 pr-12 pl-4 text-sm text-gray-700 placeholder-[#8B8D98] dark:placeholder-[#D9D9E0]  focus:outline-none focus:border-primary500 focus:ring-2 focus:ring-primary500/20 transition-all resize-none shadow-[0_2px_8px_rgba(72,72,72,0.16)]"
        />

        <span className="absolute right-3.5 top-3.5 text-gray-400 pointer-events-none">
          <MessageSquare className="w-4 h-4" />
        </span>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-primary500 hover:bg-[#1e3fa0] active:bg-[#173090] text-white font-semibold py-3.5 rounded-full transition-colors text-sm shadow-md hover:shadow-lg"
      >
        {sent ? (
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
