"use client";

import { Bell, Moon, Sun, UserRound } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useMe } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";
import { useReadNotification } from "@/hooks/useReadNotification";
import { useReadAllNotifications } from "@/hooks/useReadAllNotifications";

import { useTheme } from "../../../context/ThemeContext";
import { useSettings } from "@/hooks/useSettings";

type NotificationItem = {
  _id: string;
  title: string;
  message: string;
  type: "reservation" | "message" | "offer" | "system";
  isRead: boolean;
};

export default function AccountHeader() {
  const router = useRouter();

  const { data } = useMe();

  const { data: settingsData } = useSettings();

  const { dark, toggleTheme } = useTheme();

  const { data: notificationsData, isLoading: notificationsLoading } =
    useNotifications();

  const readMutation = useReadNotification();
  const readAllMutation = useReadAllNotifications();

  const [showNotifications, setShowNotifications] = useState(false);

  const user = data?.user;

  const fullName =
    [user?.name, user?.lastName].filter(Boolean).join(" ") || "کاربر";

  const notifications = notificationsData?.notifications || [];

  const notificationSettings = settingsData?.settings?.notifications;

  const visibleNotifications = notifications.filter((item) => {
    if (item.type === "reservation") {
      return notificationSettings?.reservation ?? true;
    }

    if (item.type === "system" || item.type === "message") {
      return notificationSettings?.messages ?? true;
    }

    if (item.type === "offer") {
      return notificationSettings?.offers ?? true;
    }

    return true;
  });

  const visibleUnreadCount = visibleNotifications.filter(
    (item) => !item.isRead,
  ).length;
  // دسته بندی اعلان ها

  const reservationNotifications = visibleNotifications.filter(
    (item) => item.type === "reservation",
  );

  const systemNotifications = visibleNotifications.filter(
    (item) => item.type === "system" || item.type === "message",
  );

  const offerNotifications = visibleNotifications.filter(
    (item) => item.type === "offer",
  );
  const handleNotificationClick = (id: string, isRead: boolean) => {
    if (!isRead) {
      readMutation.mutate(id);
    }
  };

  const handleToggleNotifications = () => {
    const willOpen = !showNotifications;

    setShowNotifications(willOpen);

    if (willOpen && (notificationsData?.unreadCount ?? 0) > 0) {
      readAllMutation.mutate();
    }
  };

  const renderNotification = (item: NotificationItem) => (
    <button
      key={item._id}
      type="button"
      onClick={() => handleNotificationClick(item._id, item.isRead)}
      className={`
        w-full
        rounded-xl
        p-3
        text-right
        transition
        ${
          item.isRead
            ? "bg-gray-100 dark:bg-[#444]"
            : "bg-primary500/10 border border-primary500/20"
        }
      `}
    >
      <h5 className="font-bold text-sm dark:text-white">{item.title}</h5>

      <p className="mt-1 text-xs text-gray-500 dark:text-gray-300">
        {item.message}
      </p>
    </button>
  );

  return (
    <header
      dir="rtl"
      className="
        relative
        h-20
        shrink-0
        flex
        items-center
        justify-between
        border-b
        border-border
        bg-background
        px-4
        sm:px-6
        lg:px-8
      "
    >
      {/* User Info */}
      <div>
        <p className="text-sm text-primary500 font-bold">خوش آمدید</p>

        <h1 className="mt-1 text-base font-bold text-foreground">{fullName}</h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Theme */}
        <button
          type="button"
          onClick={toggleTheme}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-primary500
            text-white
            cursor-pointer
          "
        >
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={handleToggleNotifications}
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-primary500
              text-white
              cursor-pointer
            "
          >
            <Bell className="h-5 w-5" />

            {visibleUnreadCount > 0 && (
              <span
                className="
                  absolute
                  -top-1
                  -right-1
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  text-xs
                  text-white
                "
              >
                {visibleUnreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              className="
                absolute
                top-12
                -right-50
                z-50
                w-80
                max-h-[400px]
                overflow-y-auto
                rounded-2xl
                bg-white
                dark:bg-[#353535]
                shadow-xl
                border
                border-border
                p-4
              "
            >
              <h3
                className="
                  mb-4
                  text-right
                  font-bold
                  dark:text-white
                "
              >
                اعلان‌ها
              </h3>

              {notificationsLoading ? (
                <p className="text-sm text-gray-500 text-right">
                  در حال دریافت اعلان‌ها...
                </p>
              ) : visibleNotifications.length === 0 ? (
                <div
                  className="
                    text-sm
                    text-gray-500
                    dark:text-gray-300
                    text-right
                  "
                >
                  اعلان جدیدی ندارید
                </div>
              ) : (
                <div className="space-y-5">
                  {/* رزروها */}
                  {reservationNotifications.length > 0 && (
                    <div>
                      <h4 className="mb-3 font-bold text-right dark:text-white">
                        رزروها
                      </h4>

                      <div className="space-y-3">
                        {reservationNotifications.map(renderNotification)}
                      </div>
                    </div>
                  )}

                  {/* پیام های سیستم */}
                  {systemNotifications.length > 0 && (
                    <div>
                      <h4 className="mb-3 font-bold text-right dark:text-white">
                        پیام‌های سیستم
                      </h4>

                      <div className="space-y-3">
                        {systemNotifications.map(renderNotification)}
                      </div>
                    </div>
                  )}

                  {/* پیشنهادات */}
                  {offerNotifications.length > 0 && (
                    <div>
                      <h4 className="mb-3 font-bold text-right dark:text-white">
                        پیشنهادها و تخفیف‌ها
                      </h4>

                      <div className="space-y-3">
                        {offerNotifications.map(renderNotification)}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Profile */}
        <button
          type="button"
          onClick={() => router.push("/account/profile")}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-primary500
            text-white
            cursor-pointer
            hover:opacity-90
            transition
          "
        >
          <UserRound className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
