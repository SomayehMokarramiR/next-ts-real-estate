import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  Bell,
  Settings,
} from "lucide-react";

export const adminMenu = [
  {
    title: "داشبورد",
    href: "/admin",
    icon: LayoutDashboard,
  },

  {
    title: "کاربران",
    href: "/admin/users",
    icon: Users,
  },

  {
    title: "املاک",
    href: "/admin/properties",
    icon: Building2,
  },

  {
    title: "رزروها",
    href: "/admin/reservations",
    icon: CalendarCheck,
  },

  {
    title: "اعلان‌ها",
    href: "/admin/notifications",
    icon: Bell,
  },

  {
    title: "تنظیمات",
    href: "/admin/settings",
    icon: Settings,
  },
];
