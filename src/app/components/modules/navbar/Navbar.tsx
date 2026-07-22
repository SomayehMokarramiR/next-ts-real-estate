"use client";

import Logo from "@/app/components/modules/logo/Logo";
import { ChevronDown, Moon, Sun, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { BLUE } from "../constants";
import NewsIcon from "./NewsIcon";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedTheme = window.localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (dark) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
  }, [dark, mounted]);

  const navLinks = [
    { label: "خانه", href: "#" },
    { label: "رهن و اجاره", href: "#" },
    { label: "بررسی سریع", href: "#", arrow: true },
    { label: "تماس با ما", href: "#", arrow: true },
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
      fixed
      top-0
      left-0
      right-0
      z-[9999]
      bg-background
      backdrop-blur-md
      shadow-sm
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        h-16
        flex
        items-center
        justify-between
        "
      >
        <Logo />

        {/* Desktop Menu */}

        <div
          className="
          bg-navbar-background
          rounded-full
          p-2
          hidden
          md:flex
          items-center
          gap-6
          max-[813px]:gap-3
          text-sm
          max-[813px]:text-xs
          font-medium
          text-foreground
          "
        >
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`
              flex
              items-center
              gap-1
              transition

              ${
                item.highlight
                  ? "bg-primary500 text-white px-4 py-2 rounded-full"
                  : "hover:text-primary500"
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

        <div className="flex items-center gap-2">
          {/* Theme */}

          <button
            onClick={() => setDark((prev) => !prev)}
            className="
            w-9
            h-9
            rounded-full
            flex
            items-center
            justify-center
            "
            style={{
              backgroundColor: BLUE,
            }}
          >
            {mounted && dark ? (
              <Sun size={15} className="text-white" />
            ) : (
              <Moon size={15} className="text-white" />
            )}
          </button>

          {/* Login */}

          <button
            className="
            hidden
            sm:block
            bg-primary500
            text-white
            text-xs
            sm:text-sm
            px-4
            py-2
            rounded-full
            "
          >
            ورود / ثبت‌نام
          </button>

          {/* Mobile Menu */}

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="
            md:hidden
            w-9
            h-9
            rounded-xl
            bg-primary500
            flex
            items-center
            justify-center
            "
          >
            <Menu size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      {open && (
        <div
          className="
          md:hidden
          bg-background
          text-foreground
          px-5
          py-4
          space-y-3
          shadow-md
          "
        >
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="
              block
              text-sm
              hover:text-primary500
              "
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
