"use client";

import { useState } from "react";
import {
  Moon,
  Sun,
  ChevronDown,
  User,
  Heart,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

import { BLUE } from "./constants";
import { UserIcon } from "./icons";

type Props = {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
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

export default function NavbarActions({ dark, setDark }: Props) {
  const isLoggedIn = true;

  const [userOpen, setUserOpen] = useState(false);

  return (
    <div
      className="
        hidden
        lg:flex
        items-center
        gap-2
        shrink-0
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
          transition-all
          hover:brightness-125
          active:scale-[0.97]
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

      {/* User */}

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
                flex
                flex-col
                text-right
              "
            >
              <span
                className="
                  text-xs
                  font-semibold
                  text-foreground
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

                    text-foreground

                    hover:bg-gray-100
                    dark:hover:bg-[#353535]
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
            flex
            items-center
            gap-1.5

            px-4
            py-2

            rounded-full

            text-[13px]

            font-semibold

            text-white

            whitespace-nowrap

            transition-all

            hover:brightness-110

            active:scale-[0.97]
          "
          style={{
            backgroundColor: BLUE,
          }}
        >
          <UserIcon size={15} />

          <span>ورود / ثبت نام</span>
        </button>
      )}
    </div>
  );
}
