"use client";

import { useRef, useState } from "react";

import Logo from "@/app/components/modules/logo/Logo";

import DesktopNavbar from "./DesktopNavbar";
import NavbarActions from "./NavbarActions";
import ResponsiveActions from "./ResponsiveActions";
import MobileNavbar from "./MobileNavbar";
import TabletMenu from "./TabletMenu";

import { useClickOutside } from "./hooks/useClickOutside";
import { useLockBodyScroll } from "./hooks/useLockBodyScroll";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  const [open, setOpen] = useState(false);

  const wrapRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(wrapRef, () => setOpen(false));

  useLockBodyScroll(open);

  return (
    <nav
      ref={wrapRef}
      className="
        w-full
        bg-white
        sticky
        top-0
        z-50
      "
      style={{
        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
      }}
    >
      {/* Main row */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-3
          px-4
          sm:px-6
          lg:px-8
          py-2.5
          max-w-7xl
          mx-auto
        "
        dir="rtl"
      >
        {/* Logo */}

        <a href="#" className="shrink-0" aria-label="خانه">
          <Logo />
        </a>

        {/* Desktop Navbar */}

        <div
          className="
            hidden
            lg:block
            bg-[#EDEDED]
            rounded-full
            w-146.5
            h-14
            px-4
            py-3
          "
        >
          <DesktopNavbar />
        </div>

        {/* Desktop buttons */}

        <NavbarActions dark={dark} setDark={setDark} />

        {/* Tablet + Mobile buttons */}

        <ResponsiveActions
          open={open}
          setOpen={setOpen}
          dark={dark}
          setDark={setDark}
        />
      </div>

      {/* Mobile dropdown */}

      <MobileNavbar
        open={open}
        dark={dark}
        setDark={setDark}
        setOpen={setOpen}
      />

      {/* Tablet dropdown */}

      <TabletMenu open={open} />

      {/* Bottom line */}

      <div
        className={`
    relative
    h-3.5
    bg-[#D9D9D9]
    transition-all
    duration-300

    ${open ? "opacity-0 h-0 overflow-hidden" : "opacity-100"}

    lg:h-3.5
    lg:opacity-100
    lg:overflow-visible
  `}
      >
        <div
          className="
      absolute
      right-0
      w-1/3
      h-full
      bg-primary500
    "
        />
      </div>
    </nav>
  );
}
