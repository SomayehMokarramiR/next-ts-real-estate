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
      {/* Tablet Actions */}

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
            w-9
            h-9

            rounded-full

            flex
            items-center
            justify-center

            transition-all

            hover:brightness-110
            active:scale-95
          "
          style={{
            backgroundColor: BLUE,
          }}
          aria-label="اخبار"
        >
          <BellIcon size={15} />
        </button>

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

            hover:brightness-110
            active:scale-95
          "
          style={{
            backgroundColor: BLUE,
          }}
          aria-label="پوسته"
        >
          {dark ? (
            <Sun size={15} className="text-white" />
          ) : (
            <Moon size={15} className="text-white" />
          )}
        </button>

        {/* User */}

        <button
          className="
            w-9
            h-9

            rounded-full

            flex
            items-center
            justify-center

            transition-all

            hover:brightness-110
            active:scale-95
          "
          style={{
            backgroundColor: BLUE,
          }}
          aria-label="ورود"
        >
          <UserIcon size={15} />
        </button>
      </div>

      {/* Mobile + Tablet Menu */}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          lg:hidden

          w-9
          h-9

          rounded-xl

          flex
          items-center
          justify-center

          text-foreground

          hover:bg-gray-100

          dark:hover:bg-[#353535]

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
  );
}
