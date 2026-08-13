"use client";

import Logo from "@/app/components/modules/logo/Logo";

import {
  ChevronDown,
  Moon,
  Sun,
  Menu,
  User,
  Heart,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import NewsIcon from "./NewsIcon";
import { BLUE } from "./constants";

import { useClickOutside } from "./hooks/useClickOutside";
import { useLockBodyScroll } from "./hooks/useLockBodyScroll";
import { useMe, useLogout } from "@/hooks/useAuth";
import Swal from "sweetalert2";
import { useRouter, usePathname } from "next/navigation";

type Props = {
  dark: boolean;
  setDark: Dispatch<SetStateAction<boolean>>;
  progress: number;
};

type NavLink = {
  label: string;
  href: string;
  arrow?: boolean;
  highlight?: boolean;
  icon?: boolean;
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

export default function ProgressNavbar({ dark, setDark, progress }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const { data } = useMe();
  const logoutMutation = useLogout();

  const isLoggedIn = Boolean(data?.success && data?.user);
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setUserOpen(false);

        Swal.fire({
          icon: "success",
          title: "خروج موفق",
          text: "با موفقیت از حساب کاربری خارج شدید",
          confirmButtonText: "باشه",
        });
      },
    });
  };

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const toggleTheme = () => {
    const newTheme = !dark;

    setDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const wrapRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(wrapRef, () => {
    setOpen(false);
    setUserOpen(false);
  });

  useLockBodyScroll(open);

  const navLinks: NavLink[] = [
    {
      label: "خانه",
      href: "/",
    },
    {
      label: "املاک",
      href: "/properties",
      arrow: true,
    },
    {
      label: "رهن و اجاره",
      href: "/mortgage-house",
    },
    {
      label: "رزرو ویلا",
      href: "/house-reserve",
      highlight: pathname.startsWith("/single-reserve-house"),
    },
    {
      label: "مقالات",
      href: "/blog",
      // icon: true,
    },
    {
      label: "تماس با ما",
      href: "/contact-us",
      arrow: true,
    },
  ];
  return (
    <nav
      ref={wrapRef}
      className="
      sticky
      top-0
      z-[9999]
      bg-background
      backdrop-blur-md
      shadow-sm
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        h-16
        flex
        items-center
        justify-between
        "
      >
        {/* Logo */}

        <Logo />

        {/* Menu */}

        <div
          className="
          bg-navbar-background
          rounded-full
          p-2
          hidden
          md:flex
          items-center
          gap-6
          max-[813px]:gap-3
          text-sm
          max-[813px]:text-xs
          font-medium
          text-foreground
          "
        >
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`
              flex
              items-center
              gap-1
              transition

              ${
                item.highlight
                  ? "bg-primary500 text-white px-4 py-2 rounded-full"
                  : "hover:text-primary500"
              }
              `}
            >
              {item.icon && <NewsIcon />}

              {item.label}

              {/* {item.arrow && <ChevronDown size={14} />} */}
            </a>
          ))}
        </div>

        {/* Actions */}

        <div
          className="
          flex
          items-center
          gap-2
          "
        >
          {/* Dark Mode */}

          <button
            onClick={toggleTheme}
            className="
            w-9
            h-9
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
              <Sun size={15} className="text-white" />
            ) : (
              <Moon size={15} className="text-white" />
            )}
          </button>

          {/* User */}

          {isLoggedIn ? (
            <div className="relative">
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
                  hidden
                  sm:flex
                  flex-col
                  text-right
                  "
                >
                  <span
                    className="
                    text-xs
                    font-semibold
                    dark:text-white
                    "
                  >
                    {data?.user?.name}
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
                      onClick={
                        label === "خروج از حساب" ? handleLogout : undefined
                      }
                      className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-3
                        py-2
                        rounded-xl
                        text-sm
                        hover:bg-gray-100
                        dark:hover:bg-[#353535]
                        dark:text-white
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
              onClick={() => router.push("/login")}
              className="
              bg-primary500
              text-white
              text-xs
              px-4
              py-2
              rounded-full
              "
            >
              ورود / ثبت‌نام
            </button>
          )}

          {/* Mobile */}

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="
            md:hidden
            w-9
            h-9
            rounded-xl
            bg-primary500
            flex
            items-center
            justify-center
            "
          >
            <Menu size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Progress Line */}

      <div
        className="
        relative
        h-3.5
        bg-[#D9D9D9]
        "
      >
        <div
          className="
  absolute
  right-0
  h-full
  bg-primary500
  transition-all
  duration-500
  "
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </nav>
  );
}
