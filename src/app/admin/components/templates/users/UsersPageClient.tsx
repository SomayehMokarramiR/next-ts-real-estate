"use client";

import { useState } from "react";
import { Search, Eye, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { useAdminUsers } from "@/hooks/useAdminUsers";
import { useAdminDeleteUser } from "@/hooks/useAdminDeleteUser";
import { useAdminUpdateUser } from "@/hooks/useAdminUpdateUser";

type UserType = {
  _id: string;
  name: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  role: "user" | "admin";
  createdAt: string;
  reservationsCount?: number;
};

export default function UsersPageClient() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [editUser, setEditUser] = useState<UserType | null>(null);

  const [editLoading, setEditLoading] = useState(false);

  const { data, isLoading, error } = useAdminUsers({
    page,
    limit: 10,
    search,
  });

  const deleteMutation = useAdminDeleteUser();

  const updateMutation = useAdminUpdateUser();

  const users = data?.users ?? [];

  const totalPages = data?.totalPages ?? 1;

  const handleDeleteUser = async (userId: string) => {
    const result = await Swal.fire({
      title: "حذف کاربر",

      text: "آیا از حذف این کاربر مطمئن هستید؟",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "بله، حذف کن",

      cancelButtonText: "انصراف",

      reverseButtons: false,
    });

    if (!result.isConfirmed) return;

    try {
      await deleteMutation.mutateAsync(userId);

      await Swal.fire({
        title: "موفق",

        text: "کاربر با موفقیت حذف شد",

        icon: "success",

        confirmButtonText: "باشه",
      });
    } catch (error) {
      Swal.fire({
        title: "خطا",

        text: error instanceof Error ? error.message : "حذف انجام نشد",

        icon: "error",
      });
    }
  };

  const handleUpdateUser = async () => {
    if (!editUser) return;
    if (editUser.phoneNumber && !/^09\d{9}$/.test(editUser.phoneNumber)) {
      Swal.fire({
        title: "شماره تماس نامعتبر",
        text: "شماره تماس باید 11 رقم و با 09 شروع شود",
        icon: "warning",
        confirmButtonText: "باشه",
      });

      return;
    }

    try {
      setEditLoading(true);

      await updateMutation.mutateAsync({
        id: editUser._id,

        data: {
          name: editUser.name,

          lastName: editUser.lastName,

          phoneNumber: editUser.phoneNumber,
        },
      });

      await Swal.fire({
        title: "موفق",

        text: "اطلاعات کاربر ویرایش شد",

        icon: "success",
      });

      setEditUser(null);
    } catch (error) {
      Swal.fire({
        title: "خطا",

        text: error instanceof Error ? error.message : "ویرایش انجام نشد",

        icon: "error",
      });
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div dir="rtl" className="w-full px-4 py-6">
      {/* Header */}

      <div className="mb-6">
        <h1
          className="
          text-2xl
          font-bold
          text-gray-900
          dark:text-white
          "
        >
          مدیریت کاربران
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          مشاهده و مدیریت کاربران سایت
        </p>
      </div>

      {/* Search */}

      <div
        className="
        bg-white
        dark:bg-[#353535]
        rounded-2xl
        p-4
        mb-5
        "
      >
        <div className="relative max-w-md">
          <Search
            size={18}
            className="
            absolute
            right-3
            top-3
            text-gray-400
            "
          />

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              setPage(1);
            }}
            placeholder="جستجوی نام، نام خانوادگی، ایمیل یا شماره تماس..."
            className="
            w-full
            pr-10
            pl-3
            py-2.5
            rounded-xl
            border
            outline-none
            text-right
            dark:bg-[#222]
            dark:text-white
            "
          />
        </div>
      </div>

      {isLoading && (
        <div
          className="
        bg-white
        dark:bg-[#353535]
        rounded-2xl
        p-10
        text-center
        text-gray-500
        "
        >
          در حال دریافت کاربران...
        </div>
      )}

      {!isLoading && !error && (
        <div
          className="
          bg-white
          dark:bg-[#353535]
          rounded-2xl
          overflow-hidden
          "
        >
          <div className="overflow-x-auto">
            <table
              className="
              w-full
              text-sm
              text-right
              "
            >
              <thead
                className="
                bg-gray-100
                dark:bg-[#2b2b2b]
                "
              >
                <tr>
                  <th className="p-4">نام</th>

                  <th className="p-4">ایمیل</th>

                  <th className="p-4">شماره تماس</th>

                  <th className="p-4">نقش</th>

                  <th className="p-4">تعداد رزرو</th>

                  <th className="p-4">تاریخ عضویت</th>

                  <th className="p-4">عملیات</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="
                  border-b
                  dark:border-gray-700
                  "
                  >
                    <td className="p-4">
                      {user.name} {user.lastName}
                    </td>

                    <td className="p-4">{user.email}</td>

                    <td className="p-4">{user.phoneNumber || "-"}</td>

                    <td className="p-4">
                      <span
                        className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs

                      ${
                        user.role === "admin"
                          ? "bg-primary500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }

                      `}
                      >
                        {user.role === "admin" ? "مدیر" : "کاربر"}
                      </span>
                    </td>

                    <td className="p-4">{user.reservationsCount ?? 0}</td>

                    <td className="p-4">
                      {new Date(user.createdAt).toLocaleDateString("fa-IR")}
                    </td>

                    <td className="p-4">
                      <div
                        className="
                      flex
                      gap-2
                      items-center
                      "
                      >
                        {/* مشاهده */}

                        <button
                          onClick={() => {
                            router.push(`/admin/users/${user._id}`);
                          }}
                          className="
                      px-3
                      py-2
                      rounded-xl
                      bg-primary500
                      text-white
                      text-xs
                      flex
                      gap-1
                      items-center
                      "
                        >
                          <Eye size={15} />
                          مشاهده
                        </button>

                        {/* ویرایش */}
                        {/* Edit */}

                        <button
                          disabled={user.role === "admin"}
                          onClick={() => {
                            if (user.role !== "admin") {
                              setEditUser(user);
                            }
                          }}
                          className={`
    flex
    items-center
    gap-1
    px-3
    py-2
    rounded-xl
    text-xs
    transition

    ${
      user.role === "admin"
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-indigo-500 text-white hover:bg-indigo-600"
    }

  `}
                        >
                          <Edit size={15} />
                          ویرایش
                        </button>
                        {/* حذف */}

                        <button
                          disabled={user.role === "admin"}
                          onClick={() => {
                            if (user.role !== "admin") {
                              handleDeleteUser(user._id);
                            }
                          }}
                          className={`

                    px-3
                    py-2
                    rounded-xl
                    text-xs
                    flex
                    gap-1
                    items-center


                    ${
                      user.role === "admin"
                        ? "bg-red-200 text-red-400 cursor-not-allowed"
                        : "bg-red-500 text-white"
                    }


                    `}
                        >
                          <Trash2 size={15} />
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}

          {totalPages > 1 && (
            <div
              className="
              flex
              justify-center
              items-center
              gap-2
              py-5
              flex-wrap
              "
            >
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="
                px-4
                py-2
                rounded-xl
                bg-gray-200
                disabled:opacity-40
                dark:bg-[#444]
                dark:text-white
                "
              >
                قبلی
              </button>

              {Array.from(
                {
                  length: totalPages,
                },
                (_, i) => i + 1,
              ).map((item) => (
                <button
                  key={item}
                  onClick={() => setPage(item)}
                  className={`
                  w-9
                  h-9
                  rounded-full

                  ${
                    page === item
                      ? "bg-primary500 text-white"
                      : "bg-gray-200 dark:bg-[#444] dark:text-white"
                  }

                  `}
                >
                  {item}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="
                px-4
                py-2
                rounded-xl
                bg-gray-200
                disabled:opacity-40
                dark:bg-[#444]
                dark:text-white
                "
              >
                بعدی
              </button>
            </div>
          )}
        </div>
      )}

      {/* Edit Modal */}

      {editUser && (
        <div
          className="
          fixed
          inset-0
          bg-black/40
          flex
          items-center
          justify-center
          z-50
          px-4
          "
        >
          <div
            className="
            bg-white
            dark:bg-[#353535]
            rounded-2xl
            p-6
            w-full
            max-w-md
            "
          >
            <h2
              className="
              text-xl
              font-bold
              mb-5
              text-gray-900
              dark:text-white
              "
            >
              ویرایش کاربر
            </h2>

            <input
              value={editUser.name}
              onChange={(e) =>
                setEditUser({
                  ...editUser,

                  name: e.target.value,
                })
              }
              placeholder="نام"
              className="
              w-full
              mb-3
              p-3
              rounded-xl
              border
              dark:bg-[#222]
              dark:text-white
              "
            />

            <input
              value={editUser.lastName || ""}
              onChange={(e) =>
                setEditUser({
                  ...editUser,

                  lastName: e.target.value,
                })
              }
              placeholder="نام خانوادگی"
              className="
              w-full
              mb-3
              p-3
              rounded-xl
              border
              dark:bg-[#222]
              dark:text-white
              "
            />

            <input
              value={editUser.phoneNumber || ""}
              onChange={(e) =>
                setEditUser({
                  ...editUser,

                  phoneNumber: e.target.value,
                })
              }
              placeholder="شماره تماس"
              className="
              w-full
              mb-5
              p-3
              rounded-xl
              border
              dark:bg-[#222]
              dark:text-white
              "
            />

            <div
              className="
              flex
              gap-3
              justify-end
              "
            >
              <button
                onClick={handleUpdateUser}
                disabled={editLoading}
                className="
                px-4
                py-2
                rounded-xl
                bg-blue-500
                text-white
                disabled:opacity-50
                "
              >
                {editLoading ? "در حال ذخیره..." : "ذخیره"}
              </button>
              <button
                onClick={() => setEditUser(null)}
                disabled={editLoading}
                className="
                px-4
                py-2
                rounded-xl
                bg-gray-200
                dark:bg-[#444]
                dark:text-white
                "
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
