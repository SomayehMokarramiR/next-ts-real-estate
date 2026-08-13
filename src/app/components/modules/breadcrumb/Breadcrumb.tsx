"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const ROUTE_CONFIG: Record<
  string,
  {
    label: string;
    href: string;
  }
> = {
  "mortgage-house": {
    label: "رهن و اجاره",
    href: "/mortgage-house",
  },

  "house-reserve": {
    label: "رزرو ویلا",
    href: "/house-reserve",
  },

  "single-reserve-house": {
    label: "رزرو اقامتگاه",
    href: "/house-reserve",
  },

  properties: {
    label: "املاک",
    href: "/properties",
  },

  "contact-us": {
    label: "تماس با ما",
    href: "/contact-us",
  },

  blog: {
    label: "مقالات",
    href: "/blog",
  },

  login: {
    label: "ورود به حساب کاربری",
    href: "/login",
  },

  register: {
    label: "ساخت حساب کاربری",
    href: "/register",
  },

  "forget-password": {
    label: "فراموشی رمز عبور",
    href: "/forget-password",
  },

  account: {
    label: "حساب کاربری",
    href: "/account",
  },

  profile: {
    label: "پروفایل من",
    href: "/account/profile",
  },

  reservations: {
    label: "رزروهای من",
    href: "/account/reservations",
  },

  favorites: {
    label: "علاقه‌مندی‌ها",
    href: "/account/favorites",
  },

  settings: {
    label: "تنظیمات",
    href: "/account/settings",
  },
};

const DYNAMIC_PARENT_ROUTES: Record<
  string,
  {
    label: string;
    href: string;
  }
> = {
  blog: {
    label: "مقالات",
    href: "/blog",
  },

  properties: {
    label: "املاک",
    href: "/properties",
  },

  "single-reserve-house": {
    label: "رزرو اقامتگاه",
    href: "/house-reserve",
  },
};

function isMongoId(value: string) {
  return /^[a-f\d]{24}$/i.test(value);
}

function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: "خانه",
      href: "/",
    },
  ];

  // ------------------------------------------
  // /single-reserve-house/[id]
  // ------------------------------------------

  if (
    segments[0] === "single-reserve-house" &&
    segments[1] &&
    isMongoId(segments[1])
  ) {
    breadcrumbs.push({
      label: "رزرو اقامتگاه",
      href: "/house-reserve",
    });

    breadcrumbs.push({
      label: "جزئیات اقامتگاه",
    });

    return breadcrumbs;
  }

  // ------------------------------------------
  // /blog/[id]
  // ------------------------------------------

  if (segments[0] === "blog" && segments[1] && isMongoId(segments[1])) {
    breadcrumbs.push({
      label: "مقالات",
      href: "/blog",
    });

    breadcrumbs.push({
      label: "جزئیات مقاله",
    });

    return breadcrumbs;
  }

  // ------------------------------------------
  // /properties/[id]
  // ------------------------------------------

  if (segments[0] === "properties" && segments[1] && isMongoId(segments[1])) {
    breadcrumbs.push({
      label: "املاک",
      href: "/properties",
    });

    breadcrumbs.push({
      label: "جزئیات ملک",
    });

    return breadcrumbs;
  }

  // ------------------------------------------
  // Normal routes
  // ------------------------------------------

  let currentPath = "";

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    const isLast = index === segments.length - 1;

    const config = ROUTE_CONFIG[segment];

    breadcrumbs.push({
      label: config?.label ?? segment,
      href: isLast ? undefined : (config?.href ?? currentPath),
    });
  });

  return breadcrumbs;
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname();

  const breadcrumbs = items?.length
    ? [
        {
          label: "خانه",
          href: "/",
        },
        ...items,
      ]
    : buildBreadcrumbs(pathname);

  return (
    <nav
      aria-label="breadcrumb"
      className="
        flex
        items-center
        justify-center
        gap-1
        text-xs
        text-gray-500
        dark:text-white
        flex-wrap
      "
      dir="rtl"
    >
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <span
            key={`${item.label}-${index}`}
            className="flex items-center gap-1"
          >
            {isLast || !item.href ? (
              <span
                className="
                  font-medium
                  text-primary500
                  max-[450px]:text-[11px]
                "
              >
                {item.label}
              </span>
            ) : (
              <>
                <Link
                  href={item.href}
                  className="
                    hover:text-primary500
                    transition-colors
                    max-[450px]:text-[11px]
                  "
                >
                  {item.label}
                </Link>

                <ChevronLeft
                  size={12}
                  className="
                    text-gray-300
                    dark:text-gray-500
                    flex-shrink-0
                  "
                />
              </>
            )}
          </span>
        );
      })}
    </nav>
  );
}
