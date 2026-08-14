"use client";

import Link from "next/link";
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

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import Swal from "sweetalert2";

import { BLUE } from "../constants";
import NewsIcon from "./NewsIcon";
import { useTheme } from "@/app/context/ThemeContext";
import { useMe, useLogout } from "@/hooks/useAuth";

type NavLink = {
  label: string;
  href: string;
  arrow?: boolean;
  icon?: boolean;
};

const avatarUrl =
  "https://api.dicebear.com/7.x/adventurer/svg?seed=amirMohammad";

const userMenu = [
  {
    label: "پروفایل من",
    icon: User,
    href: "/account/profile",
  },
  {
    label: "علاقه‌مندی‌ها",
    icon: Heart,
    href: "/account/favorites",
  },
  {
    label: "رزروهای من",
    icon: FileText,
    href: "/account/reservations",
  },
  {
    label: "تنظیمات",
    icon: Settings,
    href: "/account/settings",
  },
  {
    label: "خروج از حساب",
    icon: LogOut,
    action: "logout",
  },
];
function Avatar() {
  return (
    <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white">
      <img
        src={avatarUrl}
        alt="avatar"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { data, isLoading } = useMe();
  const logoutMutation = useLogout();
  const { dark, toggleTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const isLoggedIn = Boolean(data?.user);

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

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    if (href === "/blog") {
      return pathname === "/blog" || pathname.startsWith("/blog/");
    }

    return pathname === href;
  };

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

  if (isLoading) {
    return (
      <nav
        className="
          fixed
          top-0
          left-0
          right-0
          z-[9999]
          bg-background
          shadow-sm
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            h-16
            flex
            items-center
            justify-between
          "
        >
          <Logo />

          <div
            className="
              w-24
              h-8
              rounded-full
              bg-gray-200
              animate-pulse
            "
          />
        </div>
      </nav>
    );
  }

  return (
    <nav
      className="
        fixed
        top-0
        left-0
        right-0
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
        <Logo />

        {/* Desktop Menu */}
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
          {navLinks.map((item) => {
            const active = isActiveLink(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  flex
                  items-center
                  gap-1
                  transition
                  ${
                    active
                      ? "bg-primary500 text-white px-4 py-2 rounded-full"
                      : "hover:text-primary500"
                  }
                `}
              >
                {item.icon && <NewsIcon />}

                {item.label}

                {/* {item.arrow && <ChevronDown size={14} />} */}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme */}
          <button
            type="button"
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

          {/* User / Auth */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                type="button"
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

                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-semibold dark:text-white">
                    {data?.user?.name || "کاربر"}
                  </span>

                  <span className="text-[11px] text-gray-400">
                    {data?.user?.phoneNumber || ""}
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
                  {userMenu.map(({ label, icon: Icon, href, action }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        setUserOpen(false);

                        if (action === "logout") {
                          handleLogout();
                          return;
                        }

                        if (href) {
                          router.push(href);
                        }
                      }}
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
              type="button"
              onClick={() => router.push("/login")}
              className="
                hidden
                sm:block
                bg-primary500
                text-white
                text-xs
                sm:text-sm
                px-4
                py-2
                rounded-full
              "
            >
              ورود / ثبت نام
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
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

      {/* Mobile Menu */}
      {open && (
        <div
          className="
            md:hidden
            bg-background
            text-foreground
            px-5
            py-4
            space-y-3
            shadow-md
          "
        >
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="
                block
                text-sm
                hover:text-primary500
              "
            >
              {item.label}
            </Link>
          ))}

          {!isLoggedIn && (
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="
                w-full
                bg-primary500
                text-white
                py-2
                rounded-full
                text-sm
              "
            >
              ورود / ثبت نام
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
