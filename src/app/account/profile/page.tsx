"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  UserRound,
  ShieldCheck,
  Pencil,
  Save,
  X,
} from "lucide-react";
import Swal from "sweetalert2";

import { useMe, useUpdateProfile } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { data, isLoading } = useMe();

  const updateProfileMutation = useUpdateProfile();

  const user = data?.user;

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [error, setError] = useState("");

  if (isLoading) {
    return (
      <div className="space-y-6" dir="rtl">
        <div>
          <div className="h-8 w-40 rounded-lg bg-gray-200 dark:bg-[#353535] animate-pulse" />

          <div className="mt-2 h-4 w-60 rounded bg-gray-200 dark:bg-[#353535] animate-pulse" />
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#272727]">
          <div className="space-y-5 animate-pulse">
            <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-[#353535]" />

            <div className="h-5 w-48 rounded bg-gray-200 dark:bg-[#353535]" />

            <div className="h-12 w-full rounded-xl bg-gray-200 dark:bg-[#353535]" />

            <div className="h-12 w-full rounded-xl bg-gray-200 dark:bg-[#353535]" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="py-20 text-center" dir="rtl">
        <p className="text-sm text-gray-500 dark:text-gray-300">
          اطلاعات کاربر در دسترس نیست.
        </p>
      </div>
    );
  }

  const fullName =
    [user.name, user.lastName].filter(Boolean).join(" ") || "کاربر";

  const handleStartEditing = () => {
    setName(user.name || "");
    setLastName(user.lastName || "");
    setPhoneNumber(user.phoneNumber || "");
    setError("");
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setName(user.name || "");
    setLastName(user.lastName || "");
    setPhoneNumber(user.phoneNumber || "");
    setError("");
    setIsEditing(false);
  };

  const handlePhoneChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 11);

    setPhoneNumber(digitsOnly);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedName = name.trim();

    const normalizedLastName = lastName.trim();

    const normalizedPhone = phoneNumber.replace(/\D/g, "");

    if (!normalizedName) {
      setError("نام را وارد کنید.");
      return;
    }

    if (normalizedName.length < 2) {
      setError("نام باید حداقل ۲ کاراکتر باشد.");
      return;
    }

    if (!normalizedLastName) {
      setError("نام خانوادگی را وارد کنید.");
      return;
    }

    if (normalizedLastName.length < 2) {
      setError("نام خانوادگی باید حداقل ۲ کاراکتر باشد.");
      return;
    }

    if (!normalizedPhone) {
      setError("شماره تماس را وارد کنید.");
      return;
    }

    const iranPhoneRegex = /^09\d{9}$/;

    if (!iranPhoneRegex.test(normalizedPhone)) {
      setError("شماره تماس باید ۱۱ رقمی و با ۰۹ شروع شود.");
      return;
    }

    setError("");

    updateProfileMutation.mutate(
      {
        name: normalizedName,
        lastName: normalizedLastName,
        phoneNumber: normalizedPhone,
      },
      {
        onSuccess: (response) => {
          if (!response.success) {
            setError(response.message || "به‌روزرسانی اطلاعات انجام نشد.");
            return;
          }

          setIsEditing(false);

          Swal.fire({
            icon: "success",
            title: "اطلاعات به‌روزرسانی شد",
            text: "اطلاعات پروفایل شما با موفقیت ذخیره شد.",
            confirmButtonText: "باشه",
          });
        },

        onError: (mutationError) => {
          setError(
            mutationError instanceof Error
              ? mutationError.message
              : "خطا در به‌روزرسانی اطلاعات.",
          );
        },
      },
    );
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          پروفایل من
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          اطلاعات حساب کاربری خود را مشاهده و مدیریت کنید.
        </p>
      </div>

      {/* Profile Card */}
      <div
        className="
          rounded-2xl
          border
          border-gray-100
          bg-white
          p-6
          shadow-sm
          dark:border-[#353535]
          dark:bg-[#272727]
        "
      >
        {/* User Header */}
        <div
          className="
            flex
            flex-col
            gap-4
            border-b
            border-gray-100
            pb-6
            dark:border-[#353535]
            sm:flex-row
            sm:items-center
          "
        >
          <div
            className="
              flex
              h-16
              w-16
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-primary500/10
              text-primary500
            "
          >
            <UserRound className="h-8 w-8" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {fullName}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {user.email || "ایمیل ثبت نشده"}
            </p>
          </div>
        </div>

        {/* View Mode */}
        {!isEditing && (
          <>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Name */}
              <div className="rounded-xl bg-[#F7F8FA] p-4 dark:bg-[#353535]">
                <div className="flex items-center gap-3">
                  <UserRound className="h-5 w-5 text-primary500" />

                  <div>
                    <p className="text-xs text-gray-400">نام و نام خانوادگی</p>

                    <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-white">
                      {fullName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-xl bg-[#F7F8FA] p-4 dark:bg-[#353535]">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary500" />

                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">ایمیل</p>

                    <p className="mt-1 break-all text-sm font-semibold text-gray-800 dark:text-white">
                      {user.email || "ثبت نشده"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="rounded-xl bg-[#F7F8FA] p-4 dark:bg-[#353535]">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary500" />

                  <div>
                    <p className="text-xs text-gray-400">شماره تماس</p>

                    <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-white">
                      {user.phoneNumber || "ثبت نشده"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Role */}
              <div className="rounded-xl bg-[#F7F8FA] p-4 dark:bg-[#353535]">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary500" />

                  <div>
                    <p className="text-xs text-gray-400">نوع حساب</p>

                    <p className="mt-1 text-sm font-semibold text-gray-800 dark:text-white">
                      {user.role === "admin" ? "مدیر" : "کاربر"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleStartEditing}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-primary500
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-primary600
                "
              >
                <Pencil className="h-4 w-4" />
                ویرایش اطلاعات
              </button>
            </div>
          </>
        )}

        {/* Edit Mode */}
        {isEditing && (
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  نام
                </label>

                <div className="relative">
                  <UserRound className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    disabled={updateProfileMutation.isPending}
                    placeholder="نام"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      pr-11
                      pl-4
                      text-sm
                      text-gray-800
                      outline-none
                      focus:border-primary500
                      focus:ring-2
                      focus:ring-primary500/20
                      dark:border-[#444]
                      dark:bg-[#353535]
                      dark:text-white
                    "
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  نام خانوادگی
                </label>

                <div className="relative">
                  <UserRound className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setError("");
                    }}
                    disabled={updateProfileMutation.isPending}
                    placeholder="نام خانوادگی"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      pr-11
                      pl-4
                      text-sm
                      text-gray-800
                      outline-none
                      focus:border-primary500
                      focus:ring-2
                      focus:ring-primary500/20
                      dark:border-[#444]
                      dark:bg-[#353535]
                      dark:text-white
                    "
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  ایمیل
                </label>

                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    type="email"
                    value={user.email || ""}
                    readOnly
                    className="
                      h-12
                      w-full
                      cursor-not-allowed
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-100
                      pr-11
                      pl-4
                      text-sm
                      text-gray-500
                      outline-none
                      dark:border-[#444]
                      dark:bg-[#353535]
                      dark:text-gray-400
                    "
                  />
                </div>

                <p className="mt-1.5 text-[11px] text-gray-400">
                  ایمیل از این بخش قابل تغییر نیست.
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  شماره تماس
                </label>

                <div className="relative">
                  <Phone className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    disabled={updateProfileMutation.isPending}
                    inputMode="numeric"
                    maxLength={11}
                    placeholder="09123456789"
                    dir="ltr"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      pr-11
                      pl-4
                      text-sm
                      text-gray-800
                      outline-none
                      focus:border-primary500
                      focus:ring-2
                      focus:ring-primary500/20
                      dark:border-[#444]
                      dark:bg-[#353535]
                      dark:text-white
                    "
                  />
                </div>

                <p className="mt-1.5 text-[11px] text-gray-400">
                  شماره باید ۱۱ رقمی و با ۰۹ شروع شود.
                </p>
              </div>
            </div>

            {/* Error */}
            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

            {/* Actions */}
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={handleCancelEditing}
                disabled={updateProfileMutation.isPending}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-gray-200
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-gray-600
                  transition
                  hover:bg-gray-50
                  disabled:opacity-50
                  dark:border-[#444]
                  dark:text-gray-300
                  dark:hover:bg-[#353535]
                "
              >
                <X className="h-4 w-4" />
                انصراف
              </button>

              <button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-primary500
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-primary600
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <Save className="h-4 w-4" />

                {updateProfileMutation.isPending
                  ? "در حال ذخیره..."
                  : "ذخیره تغییرات"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
