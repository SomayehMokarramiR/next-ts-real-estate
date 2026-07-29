"use client";

import { ChevronDown } from "lucide-react";
import { NAV } from "./data";

type Props = {
  open: boolean;
};

const avatarUrl =
  "https://api.dicebear.com/7.x/adventurer/svg?seed=amirMohammad";

export default function TabletMenu({ open }: Props) {
  const isLoggedIn = true;

  return (
    <div
      className={`
        hidden
        md:block
        lg:hidden

        overflow-hidden

        transition-all
        duration-300
        ease-in-out

        ${open ? "max-h-100 opacity-100" : "max-h-0 opacity-0"}
      `}
    >
      <div
        className="
          border-t
          border-gray-200
          dark:border-[#353535]

          bg-background

          px-6
          pb-5
          pt-3
        "
        dir="rtl"
      >
        <nav
          className="
            flex
            flex-col
            mb-4
          "
        >
          {NAV.map((item, i) => {
            const highlight = item.label === "مهم‌ترین اخبار";

            return (
              <button
                key={item.label}
                className={`
                  flex
                  items-center
                  justify-between

                  w-full

                  py-3

                  text-sm

                  font-medium

                  transition


                  ${
                    highlight
                      ? `
                        bg-primary500
                        text-white
                        rounded-full
                        px-4
                        my-2
                      `
                      : `
                        text-foreground
                        hover:text-primary500
                      `
                  }


                  ${
                    i < NAV.length - 1 && !highlight
                      ? `
                        border-b
                        border-gray-100
                        dark:border-[#353535]
                      `
                      : ""
                  }

                `}
              >
                <span>{item.label}</span>

                {item.dropdown && (
                  <ChevronDown
                    size={14}
                    className={highlight ? "text-white" : "text-gray-400"}
                    strokeWidth={2.5}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* User */}

        {isLoggedIn ? (
          <button
            className="
              flex
              items-center
              justify-center
              gap-2

              w-full

              px-4
              py-2.5

              rounded-full

              border
              border-gray-200
              dark:border-[#353535]

              text-sm
              font-semibold

              text-foreground
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
            امیر محمد
          </button>
        ) : (
          <button
            className="
              flex
              items-center
              justify-center
              gap-2

              w-full

              px-4
              py-2.5

              rounded-full

              text-sm

              font-semibold

              text-white

              bg-primary500
            "
          >
            ورود / ثبت نام
          </button>
        )}
      </div>
    </div>
  );
}
