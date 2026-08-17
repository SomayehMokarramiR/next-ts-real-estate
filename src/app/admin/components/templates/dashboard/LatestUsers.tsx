"use client";

import { UserRound, Mail, Phone } from "lucide-react";

import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "@/app/lib/apiRequest";

type User = {
  _id: string;
  name?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  role?: "user" | "admin";
  createdAt?: string;
};

type LatestUsersResponse = {
  success: boolean;
  users: User[];
};

async function getLatestUsers(): Promise<LatestUsersResponse> {
  const data = await apiRequest("/api/admin/users?limit=5");

  return data as LatestUsersResponse;
}

export default function LatestUsers() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-latest-users"],

    queryFn: getLatestUsers,

    staleTime: 1000 * 60 * 2,
  });

  const users: User[] = data?.users ?? [];

  if (isLoading) {
    return (
      <div
        className="
        mt-6
        rounded-2xl
        bg-white
        dark:bg-[#353535]
        p-6
        "
      >
        <p className="text-gray-500">در حال دریافت کاربران...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
        mt-6
        rounded-2xl
        bg-white
        dark:bg-[#353535]
        p-6
        text-red-500
        "
      >
        خطا در دریافت کاربران
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="
      mt-6
      rounded-2xl
      bg-white
      dark:bg-[#353535]
      overflow-hidden
      "
    >
      {/* Header */}

      <div
        className="
        p-5
        border-b
        dark:border-gray-700
        "
      >
        <h2
          className="
          text-lg
          font-bold
          text-gray-900
          dark:text-white
          "
        >
          آخرین کاربران ثبت‌نام شده
        </h2>
      </div>

      {/* List */}

      <div
        className="
        divide-y
        dark:divide-gray-700
        "
      >
        {users.map((user) => (
          <div
            key={user._id}
            className="
              flex
              flex-col
              gap-4
              p-5
              sm:flex-row
              sm:items-center
              sm:justify-between
              "
          >
            {/* User */}

            <div
              className="
                flex
                items-center
                gap-3
                "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-primary500/10
                  text-primary500
                  "
              >
                <UserRound size={22} />
              </div>

              <div>
                <p
                  className="
                    font-bold
                    text-gray-900
                    dark:text-white
                    "
                >
                  {user.name || "-"} {user.lastName || ""}
                </p>

                <div
                  className="
                    mt-1
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-gray-500
                    "
                >
                  <Mail size={13} />

                  {user.email || "-"}
                </div>
              </div>
            </div>

            {/* Details */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-4
                text-xs
                text-gray-500
                "
            >
              <div
                className="
                  flex
                  items-center
                  gap-1
                  "
              >
                <Phone size={14} />

                {user.phoneNumber || "-"}
              </div>

              <span
                className={`
                  rounded-full
                  px-3
                  py-1

                  ${
                    user.role === "admin"
                      ? "bg-primary500 text-white"
                      : "bg-gray-100 text-gray-700 dark:bg-[#444] dark:text-white"
                  }

                  `}
              >
                {user.role === "admin" ? "مدیر" : "کاربر"}
              </span>

              <span>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("fa-IR")
                  : "-"}
              </span>
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <div
            className="
              p-10
              text-center
              text-gray-500
              "
          >
            کاربری وجود ندارد
          </div>
        )}
      </div>
    </div>
  );
}
