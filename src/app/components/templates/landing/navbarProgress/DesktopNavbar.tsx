"use client";

import { ChevronDown } from "lucide-react";
import { NAV } from "./data";
import { cn } from "./utils";

export default function DesktopNavbar() {
  return (
    <nav className="hidden lg:flex items-center" aria-label="ناوبری اصلی">
      {NAV.map((item) => (
        <button
          key={item.label}
          className={cn(
            "flex items-center gap-1.5",
            "px-3 xl:px-4",
            "py-2",
            "text-[13.5px] xl:text-[14px]",
            "font-medium",
            "text-gray-800",
            "hover:text-blue-600",
            "whitespace-nowrap",
            "transition-colors",
            "rounded-md",
            "hover:bg-blue-50",
          )}
        >
          {item.dropdown && (
            <ChevronDown
              size={13}
              className="text-gray-400 mt-px shrink-0"
              strokeWidth={2.5}
            />
          )}

          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
