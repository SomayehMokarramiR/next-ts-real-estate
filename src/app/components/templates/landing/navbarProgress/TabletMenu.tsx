"use client";

import { ChevronDown } from "lucide-react";
import { NAV } from "./data";
import { BLUE } from "./constants";
import { UserIcon } from "./icons";

type Props = {
  open: boolean;
};

export default function TabletMenu({ open }: Props) {
  return (
    <div
      className={`
        hidden md:block lg:hidden
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
          border-gray-100
          bg-white
          px-6
          pb-5
          pt-3
        "
        dir="rtl"
      >
        <nav className="flex flex-col mb-4">
          {NAV.map((item, i) => (
            <button
              key={item.label}
              className={`
                  flex
                  items-center
                  justify-between
                  py-3
                  text-[14px]
                  font-medium
                  text-gray-800
                  hover:text-blue-600
                  transition-colors
                  w-full

                  ${i < NAV.length - 1 ? "border-b border-gray-100" : ""}
                `}
            >
              <span>{item.label}</span>

              {item.dropdown && (
                <ChevronDown
                  size={14}
                  className="text-gray-400"
                  strokeWidth={2.5}
                />
              )}
            </button>
          ))}
        </nav>

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
            text-[13px]
            font-semibold
            text-white
          "
          style={{
            backgroundColor: BLUE,
          }}
        >
          <UserIcon size={14} />
          ورود / ثبت نام
        </button>
      </div>
    </div>
  );
}
