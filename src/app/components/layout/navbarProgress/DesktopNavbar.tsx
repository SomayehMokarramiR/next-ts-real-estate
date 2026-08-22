"use client";

import { ChevronDown } from "lucide-react";

import { NAV } from "./data";

export default function DesktopNavbar() {
  return (
    <nav
      className="
        flex
        items-center
        gap-6
        max-[813px]:gap-3
      "
      dir="rtl"
      aria-label="ناوبری اصلی"
    >
      {NAV.map((item) => {
        const highlight = item.label === "مهم‌ترین اخبار";

        return (
          <button
            key={item.label}
            type="button"
            className={`
              flex
              items-center
              gap-1
              whitespace-nowrap

              text-sm
              max-[813px]:text-xs

              font-medium
              transition-all

              ${
                highlight
                  ? `
                    bg-primary500
                    text-white
                    px-4
                    py-2
                    rounded-full
                  `
                  : `
                    text-foreground
                    hover:text-primary500
                  `
              }
            `}
          >
            <span>{item.label}</span>

            {item.dropdown && (
              <ChevronDown
                size={14}
                className={highlight ? "text-white" : "text-gray-400"}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
