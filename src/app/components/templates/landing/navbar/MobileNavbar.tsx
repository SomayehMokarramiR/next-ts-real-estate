"use client";

import { ChevronDown, Moon, Sun } from "lucide-react";
import { NAV } from "./data";
import { BLUE } from "./constants";
import { UserIcon } from "./icons";

type Props = {
  open: boolean;
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileMenu({ open, dark, setDark, setOpen }: Props) {
  return (
    <div
      className={`
md:hidden
absolute
left-3
right-3
top-[calc(100%+6px)]
z-50
bg-white
rounded-lg
transition-all
duration-200
origin-top

${
  open
    ? "opacity-100 scale-y-100 pointer-events-auto"
    : "opacity-0 scale-y-95 pointer-events-none"
}

`}
      style={{
        border: "2px dashed #2563EB",
      }}
    >
      <nav dir="rtl" className="flex flex-col py-1">
        {NAV.map((item, i) => (
          <button
            key={item.label}
            onClick={() => setOpen(false)}
            className={`
flex items-center justify-between
px-5 py-3
text-[14px]
font-medium
text-gray-800
hover:bg-blue-50
transition-colors
${i < NAV.length - 1 ? "border-b border-gray-100" : ""}
`}
          >
            <span>{item.label}</span>

            {item.dropdown && (
              <ChevronDown size={14} className="text-gray-400" />
            )}
          </button>
        ))}
      </nav>

      <div
        dir="rtl"
        className="
flex gap-2
px-4
py-3
border-t
border-gray-100
"
      >
        <button
          className="
flex-1
flex items-center justify-center gap-2
rounded-full
py-2.5
text-white
text-[13px]
font-semibold
"
          style={{
            backgroundColor: BLUE,
          }}
        >
          <UserIcon size={15} />
          ورود / ثبت نام
        </button>

        <button
          onClick={() => setDark(!dark)}
          className="
w-11
h-11
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
