"use client";

import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

import { useAdminDeleteNotification } from "../../../../../hooks/useAdminDeleteNotification";
import { useAdminUpdateNotification } from "../../../../../hooks/useAdminUpdateNotification";

interface NotificationItem {
  _id: string;

  title: string;

  message: string;

  type?: string;

  isRead: boolean;

  createdAt: string;

  userId?: {
    name?: string;

    lastName?: string;

    email?: string;
  } | null;
}

interface NotificationTableProps {
  notifications: NotificationItem[];
}

const typeLabels: Record<string, string> = {
  reservation: "وضعیت رزرو",
  message: "پیام کاربری",
  offer: "پیشنهادها و تخفیف‌ها",
  system: "پیام سیستم",
};
const getTypeLabel = (type?: string) => {
  if (!type) return "-";

  const normalized = type.replace(/\s+/g, "").trim().toLowerCase();

  return typeLabels[normalized] ?? type;
};

export default function NotificationTable({
  notifications,
}: NotificationTableProps) {
  const deleteMutation = useAdminDeleteNotification();

  const updateMutation = useAdminUpdateNotification();

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "حذف اعلان",

      text: "آیا از حذف این اعلان مطمئن هستید؟",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "حذف",

      cancelButtonText: "لغو",

      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    deleteMutation.mutate(id, {
      onSuccess: () => {
        Swal.fire({
          title: "حذف شد",

          text: "اعلان با موفقیت حذف شد",

          icon: "success",

          timer: 1500,

          showConfirmButton: false,
        });
      },
    });
  };

  const handleToggleRead = (
    id: string,

    currentStatus: boolean,
  ) => {
    updateMutation.mutate({
      id,

      isRead: !currentStatus,
    });
  };

  if (!notifications.length) {
    return (
      <div
        className="
        rounded-xl
        border
        border-gray-200
        bg-white
        p-6
        text-center
        text-gray-500
        dark:border-[#555]
        dark:bg-[#353535]
        dark:text-gray-400
        "
      >
        اعلانی وجود ندارد
      </div>
    );
  }

  return (
    <div
      className="
      overflow-x-auto
      rounded-xl
      border
      border-gray-200
      bg-white
      dark:border-[#555]
      dark:bg-[#353535]
      "
    >
      <table className="w-full min-w-[700px] text-right">
        <thead
          className="
          border-b
          bg-gray-50
          dark:border-[#555]
          dark:bg-[#404040]
          "
        >
          <tr>
            {["عنوان", "پیام", "کاربر", "نوع", "وضعیت", "تاریخ", "عملیات"].map(
              (title) => (
                <th
                  key={title}
                  className="
                p-4
                text-gray-800
                dark:text-gray-200
                "
                >
                  {title}
                </th>
              ),
            )}
          </tr>
        </thead>

        <tbody>
          {notifications.map((item) => (
            <tr
              key={item._id}
              className="
              border-b
              border-gray-100
              hover:bg-gray-50
              dark:border-[#505050]
              dark:hover:bg-[#404040]
              "
            >
              <td
                className="
                p-4
                font-medium
                text-gray-900
                dark:text-gray-100
                "
              >
                {item.title}
              </td>

              <td
                className="
                max-w-[250px]
                truncate
                p-4
                text-gray-700
                dark:text-gray-300
                "
              >
                {item.message}
              </td>

              <td className="p-4">
                {item.userId ? (
                  <div>
                    <p
                      className="
                        text-gray-900
                        dark:text-gray-100
                        "
                    >
                      {item.userId.name ?? "-"} {item.userId.lastName ?? ""}
                    </p>

                    <span
                      className="
                        text-xs
                        text-gray-500
                        dark:text-gray-400
                        "
                    >
                      {item.userId.email ?? "-"}
                    </span>
                  </div>
                ) : (
                  "-"
                )}
              </td>

              <td
                className="
                p-4
                text-gray-700
                dark:text-gray-300
                "
              >
                {getTypeLabel(item.type)}
              </td>

              <td className="p-4">
                <button
                  onClick={() => handleToggleRead(item._id, item.isRead)}
                  disabled={updateMutation.isPending}
                  className={`
                  min-w-[120px]
                  rounded-lg
                  px-3
                  py-1
                  text-sm
                  disabled:opacity-50

                  ${
                    item.isRead
                      ? `
                    bg-green-100
                    text-green-700
                    dark:bg-green-900/30
                    dark:text-green-400
                    `
                      : `
                    bg-orange-100
                    text-orange-700
                    dark:bg-orange-900/30
                    dark:text-orange-400
                    `
                  }

                  `}
                >
                  {item.isRead ? "خوانده شده" : "خوانده نشده"}
                </button>
              </td>

              <td
                className="
                p-4
                text-sm
                text-gray-500
                dark:text-gray-400
                "
              >
                {new Date(item.createdAt).toLocaleDateString("fa-IR")}
              </td>

              <td className="p-4">
                <button
                  onClick={() => handleDelete(item._id)}
                  disabled={deleteMutation.isPending}
                  className="
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-red-50
                  px-3
                  py-2
                  text-red-600
                  hover:bg-red-100
                  disabled:opacity-50
                  dark:bg-red-900/30
                  dark:text-red-400
                  "
                >
                  <Trash2 size={16} />
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
