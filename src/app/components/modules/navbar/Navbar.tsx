"use client";

import Logo from "@/app/components/modules/logo/Logo";
import {
  ChevronDown,
  Moon,
  Sun,
  Menu,
  User,
  Heart,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

import { useEffect, useState } from "react";
import { BLUE } from "../constants";
import NewsIcon from "./NewsIcon";

type NavLink = {
  label: string;
  href: string;
  arrow?: boolean;
  highlight?: boolean;
  icon?: boolean;
};

const avatarUrl =
  "https://api.dicebear.com/7.x/adventurer/svg?seed=amirMohammad";

const userMenu = [
  {
    label: "پروفایل من",
    icon: User,
  },
  {
    label: "علاقه‌مندی‌ها",
    icon: Heart,
  },
  {
    label: "رزروهای من",
    icon: FileText,
  },
  {
    label: "تنظیمات",
    icon: Settings,
  },
  {
    label: "خروج از حساب",
    icon: LogOut,
  },
];

function Avatar() {
  return (
    <div
      className="
      w-9
      h-9
      rounded-full
      overflow-hidden
      ring-2
      ring-white
      "
    >
      <img
        src={avatarUrl}
        alt="avatar"
        className="
        w-full
        h-full
        object-cover
        "
      />
    </div>
  );
}

export default function Navbar() {
  // فعلا دستی
  const isLoggedIn = true;

  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;

    return localStorage.getItem("theme") === "dark";
  });

  const [open, setOpen] = useState(false);

  const [userOpen, setUserOpen] = useState(false);

  const navLinks: NavLink[] = [
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

  useEffect(() => {
    const html = document.documentElement;

    if (dark) {
      html.classList.add("dark");

      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");

      localStorage.setItem("theme", "light");
    }
  }, [dark]);

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

        <div
          className="
          flex
          items-center
          gap-2
          "
        >
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
            {dark ? (
              <Sun size={15} className="text-white" />
            ) : (
              <Moon size={15} className="text-white" />
            )}
          </button>

          {/* Auth */}

          {isLoggedIn ? (
            <div
              className="
                relative
                "
            >
              <button
                onClick={() => setUserOpen((prev) => !prev)}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-gray-200
                  dark:border-[#353535]
                  px-2
                  py-1
                  "
              >
                <Avatar />

                <div
                  className="
                    hidden
                    sm:flex
                    flex-col
                    text-right
                    "
                >
                  <span
                    className="
                      text-xs
                      font-semibold
                      dark:text-white
                      "
                  >
                    امیر محمد
                  </span>

                  <span
                    className="
                      text-[11px]
                      text-gray-400
                      "
                  >
                    09373808890
                  </span>
                </div>

                <ChevronDown size={14} className="text-gray-400" />
              </button>

              {userOpen && (
                <div
                  className="
                      absolute
                      left-0
                      top-12
                      w-52
                      bg-white
                      dark:bg-[#272727]
                      border
                      border-gray-200
                      dark:border-[#353535]
                      rounded-2xl
                      shadow-lg
                      p-2
                      "
                >
                  {userMenu.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      className="
                              w-full
                              flex
                              items-center
                              gap-3
                              px-3
                              py-2
                              rounded-xl
                              text-sm
                              hover:bg-gray-100
                              dark:hover:bg-[#353535]
                              dark:text-white
                              "
                    >
                      <Icon size={16} />

                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
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
          )}

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
