"use client";

import { Menu, Moon, Sun, X } from "lucide-react";

import { BLUE } from "./constants";
import { BellIcon, UserIcon } from "./icons";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ResponsiveActions({
  open,
  setOpen,
  dark,
  setDark,
}: Props) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        shrink-0
      "
    >
      {/* =====================
          Tablet Actions
          md → lg
      ====================== */}

      <div
        className="
          hidden
          md:flex
          lg:hidden
          items-center
          gap-2
        "
      >
        {/* News */}

        <button
          className="
            flex
            items-center
            justify-center
            w-9
            h-9
            rounded-full
          "
          style={{
            backgroundColor: BLUE,
          }}
          aria-label="اخبار"
        >
          <BellIcon size={15} />
        </button>

        {/* Dark mode */}

        <button
          onClick={() => setDark(!dark)}
          className="
            flex
            items-center
            justify-center
            w-8
            h-8
            rounded-full
          "
          style={{
            backgroundColor: BLUE,
          }}
          aria-label="پوسته"
        >
          {dark ? (
            <Sun size={15} className="text-white" strokeWidth={2} />
          ) : (
            <Moon size={15} className="text-white" strokeWidth={2} />
          )}
        </button>

        {/* Login */}

        <button
          className="
            flex
            items-center
            justify-center
            w-9
            h-9
            rounded-full
          "
          style={{
            backgroundColor: BLUE,
          }}
          aria-label="ورود"
        >
          <UserIcon size={15} />
        </button>
      </div>

      {/* =====================
          Hamburger
          فقط زیر lg
          mobile + tablet
      ====================== */}

      <div
        className="
          flex
          lg:hidden
        "
      >
        <button
          onClick={() => setOpen(!open)}
          className="
            flex
            items-center
            justify-center
            w-9
            h-9
            rounded-md
            text-gray-700
            hover:bg-gray-100
            transition-colors
          "
          aria-label="منو"
          aria-expanded={open}
        >
          {open ? (
            <X size={22} strokeWidth={2} />
          ) : (
            <Menu size={22} strokeWidth={2} />
          )}
        </button>
      </div>
    </div>
  );
}
