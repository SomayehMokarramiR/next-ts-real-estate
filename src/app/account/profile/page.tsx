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
    <div className="space-y-6 text-foreground" dir="rtl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">پروفایل من</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          اطلاعات حساب کاربری خود را مشاهده و مدیریت کنید.
        </p>
      </div>

      {/* Profile Card */}

      <div
        className="
      rounded-2xl
      border
      border-border
      bg-background
      p-6
      shadow-sm
      "
      >
        {/* User Header */}

        <div
          className="
        flex
        flex-col
        gap-4
        border-b
        border-border
        pb-6
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
            <h2 className="text-lg font-bold text-foreground">{fullName}</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {user.email || "ایمیل ثبت نشده"}
            </p>
          </div>
        </div>

        {/* View Mode */}

        {!isEditing && (
          <>
            <div
              className="
            mt-6
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
            "
            >
              {/* Name */}

              <div className="rounded-xl bg-muted p-4">
                <div className="flex items-center gap-3">
                  <UserRound className="h-5 w-5 text-primary500" />

                  <div>
                    <p className="text-xs text-muted-foreground">
                      نام و نام خانوادگی
                    </p>

                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {fullName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}

              <div className="rounded-xl bg-muted p-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary500" />

                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">ایمیل</p>

                    <p className="mt-1 break-all text-sm font-semibold text-foreground">
                      {user.email || "ثبت نشده"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}

              <div className="rounded-xl bg-muted p-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary500" />

                  <div>
                    <p className="text-xs text-muted-foreground">شماره تماس</p>

                    <p className="mt-1 text-sm font-semibold text-foreground">
                      {user.phoneNumber || "ثبت نشده"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Role */}

              <div className="rounded-xl bg-muted p-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary500" />

                  <div>
                    <p className="text-xs text-muted-foreground">نوع حساب</p>

                    <p className="mt-1 text-sm font-semibold text-foreground">
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
            <div
              className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
            "
            >
              <div
                className="
  grid
  grid-cols-1
  gap-4
  md:grid-cols-2
  "
              >
                {/* Name */}

                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    نام
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                    className="
      h-12
      w-full
      rounded-xl
      border
      border-border
      bg-background
      px-4
      text-sm
      text-foreground
      outline-none
      focus:border-primary500
      "
                    placeholder="نام"
                  />
                </div>

                {/* Last Name */}

                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    نام خانوادگی
                  </label>

                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setError("");
                    }}
                    className="
      h-12
      w-full
      rounded-xl
      border
      border-border
      bg-background
      px-4
      text-sm
      text-foreground
      outline-none
      focus:border-primary500
      "
                    placeholder="نام خانوادگی"
                  />
                </div>

                {/* Phone */}

                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    شماره تماس
                  </label>

                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    className="
      h-12
      w-full
      rounded-xl
      border
      border-border
      bg-background
      px-4
      text-sm
      text-foreground
      outline-none
      focus:border-primary500
      "
                    placeholder="09123456789"
                    maxLength={11}
                  />
                </div>

                {/* Email فقط نمایش */}

                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    ایمیل
                  </label>

                  <input
                    type="email"
                    value={user.email || ""}
                    disabled
                    className="
      h-12
      w-full
      rounded-xl
      border
      border-border
      bg-muted
      px-4
      text-sm
      text-muted-foreground
      cursor-not-allowed
      "
                  />
                </div>
              </div>
            </div>

            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

            <div
              className="
            mt-6
            flex
            flex-wrap
            justify-end
            gap-3
            "
            >
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
              border-border
              px-5
              py-2.5
              text-sm
              font-medium
              text-muted-foreground
              transition
              hover:bg-muted
              disabled:opacity-50
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
