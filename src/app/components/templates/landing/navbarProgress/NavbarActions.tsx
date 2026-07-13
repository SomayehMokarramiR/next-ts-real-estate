"use client";

import { Moon, Sun } from "lucide-react";
import { BLUE } from "./constants";
import { UserIcon } from "./icons";

type Props = {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function NavbarActions({ dark, setDark }: Props) {
  return (
    <div className="hidden lg:flex items-center gap-2 shrink-0">
      <button
        onClick={() => setDark(!dark)}
        className="
          flex items-center justify-center
          w-8 h-8
          rounded-full
          transition-all
          hover:brightness-125
          active:scale-[0.97]
        "
        style={{
          backgroundColor: BLUE,
        }}
        aria-label="تغییر پوسته"
      >
        {dark ? (
          <Sun size={15} className="text-white" />
        ) : (
          <Moon size={15} className="text-white" />
        )}
      </button>

      <button
        className="
          flex items-center gap-1.5
          px-4 py-2
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
    </div>
  );
}
