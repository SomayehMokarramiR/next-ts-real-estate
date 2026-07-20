"use client";

import Logo from "@/app/components/modules/logo/Logo";
import { ChevronDown, Moon, Sun, Menu } from "lucide-react";
import { useState } from "react";
import { BLUE } from "../constants";
import NewsIcon from "./NewsIcon";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "خانه", href: "#" },
    { label: "رهن و اجاره", href: "#" },
    { label: "بررسی سریع", href: "#", arrow: true },
    { label: "تماس با ما", href: "#", arrow: true },
    // { label: "مهم‌ترین اخبار", href: "#", highlight: true },
    {
      label: "مهم‌ترین اخبار",
      href: "#",
      highlight: true,
      icon: true,
    },
  ];

  return (
    <nav
      className="
      fixed top-0 left-0 right-0 z-[9999]
      bg-white/95 backdrop-blur-md
      shadow-sm
  
      "
    >
      <div
        className="
        max-w-7xl mx-auto
        px-4 sm:px-6
        h-16
        flex items-center justify-between
        "
      >
        {/* Logo */}
        <Logo />

        {/* Desktop menu */}
        <div
          className="
        bg-[#EDEDED]
        rounded-full
        p-2
        hidden md:flex
        items-center gap-6 max-[813px]:gap-3
        text-sm max-[813px]:text-xs
        font-medium
        text-gray-700
        "
        >
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`
            flex items-center gap-1
            transition
            ${
              item.highlight
                ? "bg-primary500 text-white px-4 py-2 max-[813px]:px-3 max-[813px]:py-1.5 max-[813px]:text-xs rounded-full"
                : "hover:text-primary600"
            }
            `}
            >
              {item.icon && <NewsIcon />}
              {item.label}

              {item.arrow && <ChevronDown size={14} />}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 max-[813px]:gap-1">
          <button
            onClick={() => setDark(!dark)}
            className="
          w-9 h-9
          rounded-full
          flex items-center justify-center
          "
            style={{
              backgroundColor: BLUE,
            }}
          >
            {dark ? (
              <Sun size={15} className="text-white" />
            ) : (
              <Moon size={15} className="text-white" />
            )}
          </button>

          <button
            className="
hidden sm:block
bg-primary500
text-white
text-xs sm:text-sm
px-4 py-2
max-[813px]:px-3
max-[813px]:py-1.5
max-[813px]:text-xs
rounded-full
whitespace-nowrap
"
          >
            ورود / ثبت‌نام
          </button>

          {/* Mobile menu */}
          <button
            onClick={() => setOpen(!open)}
            className="
          md:hidden
          w-9 h-9
          rounded-xl
          bg-primary500
          flex items-center justify-center
          "
          >
            <Menu size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}

      {open && (
        <div
          className="
        md:hidden
        bg-white
        px-5 py-4
        space-y-3
        shadow-md
        "
        >
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} className="block text-sm">
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
