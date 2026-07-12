"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Moon, Sun, X, Menu } from "lucide-react";
import { NAV } from "./data";

import DesktopNavbar from "./DesktopNavbar";
import Logo from "@/app/components/modules/logo/Logo";

// ─────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────
function BellIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.73 21a2 2 0 0 1-3.46 0"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2" />
      <path
        d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────

const BLUE = "#1E40AF";
const DARK = "#111827";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // close on outside click
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  // lock scroll on mobile drawer
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className="w-full min-h-screen bg-gray-50"
      style={{ fontFamily: "'Vazirmatn', sans-serif" }}
    >
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div
        ref={wrapRef}
        className="w-full bg-white sticky top-0 z-50"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}
      >
        {/* ══ NAV ROW ══════════════════════════════════════════════════════ */}
        <div
          className="flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-2.5 max-w-7xl mx-auto"
          dir="rtl"
        >
          {/* ── Logo (right in RTL) ──────────────────────────────────────── */}
          <a href="#" className="shrink-0" aria-label="خانه">
            <Logo />
          </a>

          {/* ── Desktop center nav ───────────────────────────────────────── */}
          <div className="hidden lg:block bg-[#EDEDED] rounded-full w-146.5 h-14 px-4 py-3">
            <DesktopNavbar />
          </div>

          {/* ── Desktop action buttons ───────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button
              onClick={() => setDark(!dark)}
              className="flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-all hover:brightness-125 active:scale-[0.97]"
              style={{ backgroundColor: BLUE }}
              aria-label="تغییر پوسته"
            >
              {dark ? (
                <Sun size={15} className="text-white" strokeWidth={2} />
              ) : (
                <Moon size={15} className="text-white" strokeWidth={2} />
              )}
            </button>

            <button
              className="flex items-center gap-1.5 px-4 py-1.75 rounded-full text-[13px] font-semibold text-white whitespace-nowrap transition-all hover:brightness-110 active:scale-[0.97]"
              style={{ backgroundColor: BLUE }}
            >
              <span>ورود / ثبت نام</span>
              <UserIcon size={15} />
            </button>
          </div>

          {/* ── Tablet: icon buttons + hamburger ─────────────────────────── */}
          <div className="hidden md:flex lg:hidden items-center gap-2 shrink-0">
            <button
              className="flex items-center justify-center w-9 h-9 rounded-full"
              style={{ backgroundColor: BLUE }}
              aria-label="اخبار"
            >
              <BellIcon size={15} />
            </button>
            <button
              onClick={() => setDark(!dark)}
              className="flex items-center justify-center w-9 h-9 rounded-full"
              style={{ backgroundColor: BLUE }}
              aria-label="پوسته"
            >
              {dark ? (
                <Sun size={15} className="text-white" strokeWidth={2} />
              ) : (
                <Moon size={15} className="text-white" strokeWidth={2} />
              )}
            </button>
            <button
              className="flex items-center justify-center w-9 h-9 rounded-full"
              style={{ backgroundColor: BLUE }}
              aria-label="ورود"
            >
              <UserIcon size={15} />
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-center w-9 h-9 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="منو"
            >
              {open ? (
                <X size={20} strokeWidth={2} />
              ) : (
                <Menu size={20} strokeWidth={2} />
              )}
            </button>
          </div>

          {/* ── Mobile: X / hamburger only ───────────────────────────────── */}
          <div className="flex md:hidden items-center shrink-0">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-center w-9 h-9 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label={open ? "بستن" : "منو"}
              aria-expanded={open}
            >
              {open ? (
                <X size={22} strokeWidth={2} className="text-gray-700" />
              ) : (
                <Menu size={22} strokeWidth={2} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* ══ MOBILE DROPDOWN (dashed blue border) ════════════════════════ */}
        <div
          className={`
            md:hidden absolute left-3 right-3 top-[calc(100%+6px)] z-50
            bg-white rounded-lg
            transition-all duration-200 ease-out origin-top
            ${
              open
                ? "opacity-100 scale-y-100 pointer-events-auto"
                : "opacity-0 scale-y-95 pointer-events-none"
            }
          `}
          style={{
            border: "2px dashed #2563EB",
          }}
          aria-hidden={!open}
        >
          <div
            dir="rtl"
            className="flex flex-col py-1"
            aria-label="ناوبری موبایل"
          >
            {NAV.map((item, i) => (
              <button
                key={item.label}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center justify-between
                  px-5 py-3.25
                  text-[14px] font-medium text-gray-800
                  hover:bg-blue-50 hover:text-blue-600
                  transition-colors text-right w-full
                  ${i < NAV.length - 1 ? "border-b border-gray-100" : ""}
                `}
              >
                <span>{item.label}</span>
                {item.dropdown && (
                  <ChevronDown
                    size={14}
                    className="text-gray-400 shrink-0"
                    strokeWidth={2.5}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Action buttons inside mobile dropdown */}
          <div
            dir="rtl"
            className="flex flex-col gap-2 px-4 pb-4 pt-3 border-t border-gray-100"
          >
            <div className="flex gap-2">
              <button
                className="flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-full text-[13.5px] font-semibold text-white transition-all hover:brightness-110 active:scale-[0.97]"
                style={{ backgroundColor: BLUE }}
              >
                <UserIcon size={15} />
                <span>ورود / ثبت نام</span>
              </button>

              <button
                onClick={() => setDark(!dark)}
                className="flex items-center justify-center w-11 h-11 rounded-full shrink-0 transition-all hover:brightness-125 active:scale-[0.97]"
                style={{ backgroundColor: BLUE }}
                aria-label="تغییر پوسته"
              >
                {dark ? (
                  <Sun size={16} className="text-white" strokeWidth={2} />
                ) : (
                  <Moon size={16} className="text-white" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ══ TABLET DRAWER (solid border, side-anchored) ═════════════════ */}
        <div
          className={`
            hidden md:block lg:hidden
            overflow-hidden transition-all duration-300 ease-in-out
            ${open ? "max-h-100 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div
            className="border-t border-gray-100 bg-white px-6 pb-5 pt-3"
            dir="rtl"
          >
            <nav className="flex flex-col mb-4">
              {NAV.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-3 text-[14px] font-medium text-gray-800 hover:text-blue-600 transition-colors w-full ${i < NAV.length - 1 ? "border-b border-gray-100" : ""}`}
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
            <div className="flex gap-3">
              <button
                className="flex items-center justify-center gap-2 flex-1 px-4 py-2.25 rounded-full text-[13px] font-semibold text-white"
                style={{ backgroundColor: BLUE }}
              >
                <UserIcon size={14} />
                <span>ورود / ثبت نام</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom blue line */}
        <div className="hidden lg:block lg:relative h-3.5 bg-[#D9D9D9]">
          <div className="absolute right-0 w-1/3 h-full bg-primary500"></div>
        </div>
      </div>

      {/* ── Backdrop (closes dropdown on outside tap) ────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
