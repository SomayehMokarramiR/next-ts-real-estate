import { useState, useEffect, useRef } from "react";
import { ChevronDown, Moon, Sun, X, Menu } from "lucide-react";

// ─────────────────────────────────────────────
// Logo
// ─────────────────────────────────────────────
function Logo() {
  return (
    <svg
      viewBox="0 0 147 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Home"
      className="h-7 sm:h-8 w-auto"
    >
      <path
        d="M19.2056 24.2895L29.4296 16.9896L40.6273 24.2895L39.3672 37.6726H19.2056V24.2895Z"
        fill="#1E40AF"
      />
      <path
        d="M8.79927 0.827549C7.64075 3.22735 5.3237 5.87541 0.74477 7.11668C0.386179 7.22702 0 6.95118 0 6.565V4.52379C0 4.27554 0.165504 4.05487 0.413759 3.97212C3.11699 3.11701 4.68927 1.71023 5.62712 0.27587C5.73746 0.110366 5.90297 3.05176e-05 6.12364 3.05176e-05H8.30277C8.68894 3.05176e-05 8.96478 0.441374 8.79927 0.827549Z"
        fill="black"
      />
      <path
        d="M16.909 0.717215C15.5022 5.87541 11.5577 13.0748 0.717184 15.8056C0.358593 15.8884 0 15.6125 0 15.2539V13.2403C0 12.9921 0.165505 12.7438 0.441345 12.6886C9.24062 10.3164 12.5783 4.66172 13.8471 0.41379C13.9299 0.165534 14.1506 3.05176e-05 14.3988 3.05176e-05H16.3573C16.7159 3.05176e-05 16.9917 0.358623 16.909 0.717215Z"
        fill="black"
      />
      <path
        d="M24.1359 3.05176e-05C24.4945 3.05176e-05 24.7704 0.331038 24.7152 0.689629C24.5773 1.35164 24.4394 2.04124 24.2187 2.78601C22.3706 9.35099 16.8814 18.895 0.689598 21.7362C0.331007 21.7913 0 21.5155 0 21.1569V19.1709C0 18.895 0.193091 18.6468 0.46893 18.6192C16.3297 15.6953 20.55 6.04092 21.6534 0.468961C21.7086 0.193121 21.9292 3.05176e-05 22.2051 3.05176e-05H24.1359Z"
        fill="black"
      />
      <path
        d="M41.5965 3.50309V14.3987C41.5965 14.7298 41.3483 14.978 41.0172 14.978H39.0588C38.7278 14.978 38.4795 14.7298 38.4795 14.3987V3.50309C38.4795 3.28242 38.2864 3.11691 38.0658 3.11691H29.101C28.77 3.11691 28.5217 2.86866 28.5217 2.53765V0.661937C28.5217 0.330929 28.77 0.0826721 29.101 0.0826721H38.0658C40.0242 0.0826721 41.5965 1.5998 41.5965 3.50309Z"
        fill="black"
      />
      <path
        d="M0 36.99V26.0944C0 25.7634 0.248257 25.5151 0.579264 25.5151H2.53773C2.86873 25.5151 3.11698 25.7634 3.11698 26.0944V36.99C3.11698 37.2107 3.31007 37.3762 3.53074 37.3762H12.4955C12.8265 37.3762 13.0748 37.6244 13.0748 37.9555V39.8312C13.0748 40.1622 12.8265 40.4104 12.4955 40.4104H3.53074C1.57228 40.4104 0 38.8933 0 36.99Z"
        fill="black"
      />
      <path
        d="M39.7761 21.2395L38.4796 20.4396L30.9216 15.8055C29.8459 15.1435 28.4667 15.1711 27.4185 15.9158L18.7295 22.067C17.8744 22.6739 17.3779 23.6393 17.3779 24.6875V38.0106C17.3779 39.3622 18.4813 40.4379 19.8053 40.4379H39.1417C40.4933 40.4379 41.569 39.3346 41.569 38.0106V24.4669C41.5966 23.1428 40.907 21.9291 39.7761 21.2395ZM39.1141 36.6314C39.1141 37.0175 38.8106 37.3486 38.4245 37.3486H38.2866C38.2314 37.3761 38.1762 37.4037 38.1211 37.4037H35.5558L20.6328 37.6244C20.4397 37.652 20.2467 37.5692 20.1363 37.4313C20.1087 37.4037 19.9708 37.2658 19.9157 37.1003 19.9157 36.9072V24.6599C19.9157 24.4393 20.026 24.2186 20.2191 24.0807L28.8804 17.957C28.9908 17.8743 29.1563 17.8191 29.2942 17.8191C29.4321 17.8191 29.5424 17.8467 29.6804 17.9295L38.5348 23.3359C38.921 23.5566 39.1692 23.9703 39.1692 24.4393V36.6314H39.1141Z"
        fill="black"
      />
      <path
        d="M50.2517 33.4215V6.97939H56.4966V16.7025H66.694V6.97939H72.8994V33.4215H66.694V22.315H56.4966V33.4215H50.2517Z"
        fill="black"
      />
      <path
        d="M77.0894 25.2003C77.0894 22.5917 77.9589 20.4178 79.6585 18.7578C81.358 17.0582 83.5319 16.2282 86.1405 16.2282C88.7492 16.2282 90.923 17.0582 92.6621 18.7578C94.4012 20.4573 95.2312 22.5917 95.2312 25.2003C95.2312 27.809 94.3617 29.9828 92.6621 31.6824C90.9626 33.3819 88.7887 34.212 86.1405 34.212C83.5319 34.212 81.3976 33.3819 79.6585 31.6824C77.9589 29.9828 77.0894 27.809 77.0894 25.2003ZM82.939 25.2003C82.939 26.5837 83.2552 27.7299 83.8481 28.5994C84.441 29.469 85.2315 29.9038 86.1405 29.9038C87.0891 29.9038 87.8401 29.469 88.433 28.5994C89.0258 27.7299 89.342 26.6232 89.342 25.2398C89.342 23.8565 89.0258 22.7498 88.433 21.8802C87.8401 21.0107 87.0496 20.5759 86.1405 20.5759C85.1919 20.5759 84.441 21.0107 83.8481 21.8802C83.2157 22.6707 82.939 23.8169 82.939 25.2003Z"
        fill="black"
      />
      <path
        d="M115.072 33.4215H109.381V24.0146C109.381 23.1846 109.183 22.5126 108.827 22.0779C108.472 21.6431 107.958 21.4059 107.286 21.4059C106.337 21.4059 105.626 21.7617 105.073 22.4336C104.559 23.1055 104.282 24.0936 104.282 25.3189V33.4215H98.5906V16.9792H103.887V19.7459C104.835 18.6392 105.784 17.8092 106.693 17.2954C107.642 16.7816 108.63 16.5444 109.737 16.5444C110.922 16.5444 111.95 16.7816 112.701 17.2954C113.491 17.8092 114.163 18.5997 114.717 19.6669C115.507 18.6392 116.416 17.8487 117.365 17.2954C118.313 16.7816 119.341 16.5049 120.487 16.5049C122.305 16.5049 123.649 17.0187 124.519 18.0463C125.388 19.074 125.823 20.655 125.823 22.8288V33.4215H120.132V24.0146C120.132 23.1846 119.934 22.5126 119.578 22.0779C119.223 21.6431 118.709 21.4059 118.037 21.4059C117.088 21.4059 116.337 21.7617 115.823 22.4336C115.31 23.1055 115.033 24.0936 115.033 25.3189V33.4215H115.072Z"
        fill="black"
      />
      <path
        d="M145.388 27.5718L144.756 32.6309C143.649 33.1843 142.542 33.5795 141.436 33.8167C140.368 34.0538 139.262 34.2119 138.155 34.2119C135.428 34.2119 133.215 33.4214 131.515 31.8404C129.855 30.2595 128.985 28.2042 128.985 25.6746C128.985 23.0264 129.894 20.813 131.752 18.9949C133.57 17.1767 135.823 16.2677 138.432 16.2677C140.685 16.2677 142.542 16.9396 143.965 18.2834C145.388 19.6273 146.139 21.3268 146.139 23.4612C146.139 23.7774 146.1 24.3307 146.06 25.0422V25.1607L145.546 25.9117L134.321 26.2279C134.4 27.3346 134.875 28.2437 135.705 28.9156C136.535 29.5875 137.602 29.9433 138.867 29.9433C139.776 29.9433 140.764 29.7456 141.87 29.3504C143.017 28.9156 144.163 28.3227 145.388 27.5718ZM134.479 23.6588L141.594 23.4217V23.1845C141.594 22.315 141.278 21.6035 140.685 21.0502C140.092 20.4968 139.301 20.2201 138.392 20.2201C137.365 20.2201 136.495 20.5363 135.784 21.1292C135.112 21.7616 134.677 22.5916 134.479 23.6588Z"
        fill="black"
      />
    </svg>
  );
}

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
// Data
// ─────────────────────────────────────────────
const NAV = [
  { label: "خانه", dropdown: false },
  { label: "رهن و اجاره", dropdown: true },
  { label: "رزرو سریع", dropdown: true },
  { label: "تماس با ما", dropdown: false },
];

const BLUE = "#2563EB";
const DARK = "#111827";

// ─────────────────────────────────────────────
// App
// ─────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

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
      {/* ── Top bar ───────────────────────────────────────────────────────── */}
      <div className="w-full px-4 py-[5px]" style={{ backgroundColor: DARK }}>
        <span className="text-[11px] text-gray-500 tracking-wide select-none">
          Progress bar
        </span>
      </div>

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header
        ref={wrapRef}
        className="w-full bg-white sticky top-0 z-50"
        style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}
      >
        {/* ══ NAV ROW ══════════════════════════════════════════════════════ */}
        <div
          className="flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-[10px] max-w-screen-xl mx-auto"
          dir="rtl"
        >
          {/* ── Logo (right in RTL) ──────────────────────────────────────── */}
          <a href="#" className="flex-shrink-0" aria-label="خانه">
            <Logo />
          </a>

          {/* ── Desktop center nav ───────────────────────────────────────── */}
          <nav className="hidden lg:flex items-center" aria-label="ناوبری اصلی">
            {NAV.map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-[5px] px-3 xl:px-4 py-2 text-[13.5px] xl:text-[14px] font-medium text-gray-800 hover:text-blue-600 whitespace-nowrap transition-colors rounded-md hover:bg-blue-50"
              >
                {item.dropdown && (
                  <ChevronDown
                    size={13}
                    className="text-gray-400 mt-px flex-shrink-0"
                    strokeWidth={2.5}
                  />
                )}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* ── Desktop action buttons ───────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <button
              className="flex items-center gap-[6px] px-4 py-[7px] rounded-full text-[13px] font-semibold text-white whitespace-nowrap transition-all hover:brightness-110 active:scale-[0.97]"
              style={{ backgroundColor: BLUE }}
            >
              <span>مهم ترین اخبار</span>
              <BellIcon size={15} />
            </button>

            <button
              onClick={() => setDark(!dark)}
              className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 transition-all hover:brightness-125 active:scale-[0.97]"
              style={{ backgroundColor: DARK }}
              aria-label="تغییر پوسته"
            >
              {dark ? (
                <Sun size={15} className="text-white" strokeWidth={2} />
              ) : (
                <Moon size={15} className="text-white" strokeWidth={2} />
              )}
            </button>

            <button
              className="flex items-center gap-[6px] px-4 py-[7px] rounded-full text-[13px] font-semibold text-white whitespace-nowrap transition-all hover:brightness-110 active:scale-[0.97]"
              style={{ backgroundColor: BLUE }}
            >
              <span>ورود / ثبت نام</span>
              <UserIcon size={15} />
            </button>
          </div>

          {/* ── Tablet: icon buttons + hamburger ─────────────────────────── */}
          <div className="hidden md:flex lg:hidden items-center gap-2 flex-shrink-0">
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
              style={{ backgroundColor: DARK }}
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
          <div className="flex md:hidden items-center flex-shrink-0">
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
          <nav
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
                  px-5 py-[13px]
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
                    className="text-gray-400 flex-shrink-0"
                    strokeWidth={2.5}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Action buttons inside mobile dropdown */}
          <div
            dir="rtl"
            className="flex flex-col gap-2 px-4 pb-4 pt-3 border-t border-gray-100"
          >
            <button
              className="flex items-center justify-center gap-2 w-full px-4 py-[10px] rounded-full text-[13.5px] font-semibold text-white transition-all hover:brightness-110 active:scale-[0.97]"
              style={{ backgroundColor: BLUE }}
            >
              <span>مهم ترین اخبار</span>
              <BellIcon size={15} />
            </button>

            <div className="flex gap-2">
              <button
                className="flex items-center justify-center gap-2 flex-1 px-4 py-[10px] rounded-full text-[13.5px] font-semibold text-white transition-all hover:brightness-110 active:scale-[0.97]"
                style={{ backgroundColor: BLUE }}
              >
                <span>ورود / ثبت نام</span>
                <UserIcon size={15} />
              </button>

              <button
                onClick={() => setDark(!dark)}
                className="flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0 transition-all hover:brightness-125 active:scale-[0.97]"
                style={{ backgroundColor: DARK }}
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
            ${open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}
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
                className="flex items-center justify-center gap-2 flex-1 px-4 py-[9px] rounded-full text-[13px] font-semibold text-white"
                style={{ backgroundColor: BLUE }}
              >
                <span>مهم ترین اخبار</span>
                <BellIcon size={14} />
              </button>
              <button
                className="flex items-center justify-center gap-2 flex-1 px-4 py-[9px] rounded-full text-[13px] font-semibold text-white"
                style={{ backgroundColor: BLUE }}
              >
                <span>ورود / ثبت نام</span>
                <UserIcon size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Blue bottom accent ───────────────────────────────────────────── */}
        <div className="h-[3px] w-full" style={{ backgroundColor: BLUE }} />
      </header>

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
