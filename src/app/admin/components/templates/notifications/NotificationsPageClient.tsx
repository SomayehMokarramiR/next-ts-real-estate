"use client";

import { useState } from "react";

import NotificationTable from "./NotificationTable";
import NotificationForm from "./NotificationForm";

import { useAdminNotifications } from "../../../../../hooks/useAdminNotifications";
import { useAdminUsers } from "../../../../../hooks/useAdminUsers";

export default function NotificationsPageClient() {
  const [openModal, setOpenModal] = useState(false);

  const { data: notifications, isLoading, isError } = useAdminNotifications();

  const { data: usersResponse, isLoading: usersLoading } = useAdminUsers();

  const users = usersResponse?.users ?? [];

  if (isLoading) {
    return <div className="p-6">در حال دریافت اعلان‌ها...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-500">خطا در دریافت اعلان‌ها</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}

      <div
        className="
        flex
        items-center
        justify-between
        "
      >
        <h1
          className="
          text-2xl
          font-bold
          text-gray-900
          dark:text-gray-100
          "
        >
          مدیریت اعلان‌ها
        </h1>

        <button
          onClick={() => setOpenModal(true)}
          className="
          rounded-lg
          bg-blue-600
          px-4
          py-2
          text-white
          hover:bg-blue-700
          "
        >
          ایجاد اعلان جدید
        </button>
      </div>

      {/* TABLE */}

      <NotificationTable notifications={notifications ?? []} />

      {/* MODAL */}

      {openModal && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            "
        >
          <div
            className="
              w-full
              max-w-xl
              rounded-xl
              bg-white
              p-6
              dark:bg-[#353535]
              "
          >
            <div
              className="
                mb-5
                flex
                items-center
                justify-between
                "
            >
              <h2
                className="
                  text-xl
                  font-bold
                  text-gray-900
                  dark:text-white
                  "
              >
                ایجاد اعلان جدید
              </h2>

              <button
                onClick={() => setOpenModal(false)}
                className="
                  text-red-500
                  "
              >
                بستن
              </button>
            </div>

            {usersLoading ? (
              <div className="p-4 text-center">در حال دریافت کاربران...</div>
            ) : (
              <NotificationForm
                users={users}
                onSuccess={() => setOpenModal(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
