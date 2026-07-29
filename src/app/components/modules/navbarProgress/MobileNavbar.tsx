"use client";

import {
  ChevronDown,
  Moon,
  Sun,
  User,
  Heart,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { NAV } from "./data";
import { BLUE } from "./constants";

import { useState } from "react";

type Props = {
  open: boolean;
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

export default function MobileNavbar({ open, dark, setDark, setOpen }: Props) {
  const isLoggedIn = true;

  return (
    <div
      className={`
        md:hidden

        absolute

        left-3
        right-3

        top-[calc(100%+6px)]

        z-50

        bg-background

        text-foreground

        rounded-2xl

        shadow-lg

        border
        border-gray-200
        dark:border-[#353535]

        transition-all
        duration-200

        origin-top


        ${
          open
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-95 pointer-events-none"
        }
      `}
    >
      <nav
        dir="rtl"
        className="
          flex
          flex-col
          py-1
        "
      >
        {NAV.map((item, i) => {
          const highlight = item.label === "مهم‌ترین اخبار";

          return (
            <button
              key={item.label}
              onClick={() => setOpen(false)}
              className={`
                flex
                items-center
                justify-between

                px-5
                py-3

                text-sm

                font-medium

                transition


                ${
                  highlight
                    ? `
                      mx-3
                      my-2
                      px-4
                      rounded-full
                      bg-primary500
                      text-white
                    `
                    : `
                      text-foreground
                      hover:bg-gray-100
                      dark:hover:bg-[#353535]
                    `
                }


                ${
                  i < NAV.length - 1 && !highlight
                    ? "border-b border-gray-100 dark:border-[#353535]"
                    : ""
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

      {/* Actions */}

      <div
        dir="rtl"
        className="
          flex
          items-center
          gap-2

          px-4
          py-3

          border-t
          border-gray-100

          dark:border-[#353535]
        "
      >
        {/* User */}

        {isLoggedIn ? (
          <button
            className="
              flex-1

              flex
              items-center
              justify-center
              gap-2

              rounded-full

              border
              border-gray-200

              dark:border-[#353535]

              py-2

              text-sm
              font-medium
            "
          >
            <img
              src={avatarUrl}
              alt="avatar"
              className="
                w-8
                h-8
                rounded-full
              "
            />

            <span>امیر محمد</span>
          </button>
        ) : (
          <button
            className="
              flex-1

              flex
              items-center
              justify-center
              gap-2

              rounded-full

              py-2.5

              text-white

              text-sm

              font-semibold
            "
            style={{
              backgroundColor: BLUE,
            }}
          >
            ورود / ثبت نام
          </button>
        )}

        {/* Theme */}

        <button
          onClick={() => setDark((prev) => !prev)}
          className="
            w-10
            h-10

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
            <Sun size={16} className="text-white" />
          ) : (
            <Moon size={16} className="text-white" />
          )}
        </button>
      </div>
    </div>
  );
}
