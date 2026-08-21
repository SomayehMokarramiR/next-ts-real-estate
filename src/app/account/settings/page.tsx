"use client";

import { useState } from "react";
import { Bell, Moon, Sun, ShieldCheck } from "lucide-react";
import Swal from "sweetalert2";

import { useSettings, useUpdateSettings } from "@/hooks/useSettings";

import { useChangePassword } from "@/hooks/useChangePassword";
import { useTheme } from "../../../app/context/ThemeContext";

export default function SettingsPage() {
  const { data, isLoading } = useSettings();

  const updateMutation = useUpdateSettings();

  const changePasswordMutation = useChangePassword();
  const { dark, toggleTheme } = useTheme();

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  if (isLoading) {
    return (
      <div
        className="
        min-h-[400px]
        flex
        items-center
        justify-center
        text-gray-500
        "
      >
        در حال دریافت تنظیمات...
      </div>
    );
  }

  const settings = data?.settings;

  const notifications = settings?.notifications ?? {
    reservation: false,
    systemMessages: false,
    offersAndDiscounts: false,
  };

  const updateNotification = (
    key: "reservation" | "systemMessages" | "offersAndDiscounts",
    value: boolean,
  ) => {
    updateMutation.mutate({
      notifications: {
        ...notifications,
        [key]: value,
      },
    });
  };
  const updateDarkMode = (value: boolean) => {
    updateMutation.mutate(
      {
        darkMode: value,
      },
      {
        onSuccess: () => {
          if (value !== dark) {
            toggleTheme();
          }
        },
      },
    );
  };

  return (
    <div
      dir="rtl"
      className="
      w-full
      px-4
      py-6
      "
    >
      <h1
        className="
        text-xl
        font-bold
        text-right
        mb-6
        text-gray-900
        dark:text-white
        "
      >
        تنظیمات حساب
      </h1>

      {/* امنیت حساب */}

      <div
        className="
        bg-white
        dark:bg-[#353535]
        rounded-2xl
        p-5
        mb-5
        "
      >
        <div
          className="
          flex
          items-center
          gap-2
          mb-5
          "
        >
          <ShieldCheck size={22} className="text-primary500" />

          <h2
            className="
            font-bold
            dark:text-white
            "
          >
            امنیت حساب
          </h2>
        </div>

        <div
          className="
          flex
          items-center
          justify-between
          "
        >
          <button
            onClick={() => setShowPasswordModal(true)}
            className="
            text-sm
            font-bold
            text-primary500
            "
          >
            تغییر رمز عبور
          </button>

          <div className="text-right">
            <p
              className="
              font-medium
              dark:text-white
              "
            >
              رمز عبور
            </p>

            <span
              className="
              text-xs
              text-gray-500
              "
            >
              برای امنیت بیشتر رمز خود را تغییر دهید
            </span>
          </div>
        </div>
      </div>

      {/* اعلان ها */}
      <div
        className="
  bg-white
  dark:bg-[#353535]
  rounded-2xl
  p-5
  mb-5
  "
      >
        <div
          className="
    flex
    items-center
    gap-2
    mb-5
    "
        >
          <Bell size={22} className="text-primary500" />

          <h2
            className="
      font-bold
      dark:text-white
      "
          >
            اعلان‌ها
          </h2>
        </div>

        <div className="space-y-4">
          <SettingSwitch
            title="اعلان وضعیت رزرو"
            description="تغییرات رزروهای شما"
            checked={notifications.reservation}
            onChange={(value) => updateNotification("reservation", value)}
          />

          <SettingSwitch
            title="پیام‌های سیستم"
            description="اطلاعیه‌های مهم سایت"
            checked={notifications.systemMessages}
            onChange={(value) => updateNotification("systemMessages", value)}
          />

          <SettingSwitch
            title="پیشنهادها و تخفیف‌ها"
            description="دریافت پیشنهادهای ویژه"
            checked={notifications.offersAndDiscounts}
            onChange={(value) =>
              updateNotification("offersAndDiscounts", value)
            }
          />
        </div>
      </div>
      {/* Dark Mode */}

      <div
        className="
  bg-white
  dark:bg-[#353535]
  rounded-2xl
  p-5
  mb-5
  "
      >
        <div
          className="
    flex
    items-center
    justify-between
    "
        >
          <Switch checked={dark} onChange={updateDarkMode} />

          <div
            className="
      flex
      items-center
      gap-2
      "
          >
            {dark ? (
              <Sun size={22} className="text-primary500" />
            ) : (
              <Moon size={22} className="text-primary500" />
            )}

            <div className="text-right">
              <h2
                className="
          font-bold
          dark:text-white
          "
              >
                {dark ? "حالت روشن" : "حالت تاریک"}
              </h2>

              <p
                className="
          text-xs
          text-gray-500
          "
              >
                {dark ? "تغییر به حالت روشن" : "تغییر به حالت تاریک"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}

      {showPasswordModal && (
        <div
          className="
          fixed
          inset-0
          z-50
          bg-black/40
          flex
          items-center
          justify-center
          px-4
          "
        >
          <div
            className="
            bg-white
            dark:bg-[#353535]
            rounded-2xl
            p-5
            w-full
            max-w-md
            "
          >
            <h2
              className="
              text-lg
              font-bold
              dark:text-white
              mb-5
              text-right
              "
            >
              تغییر رمز عبور
            </h2>

            <input
              type="password"
              placeholder="رمز فعلی"
              value={password.currentPassword}
              onChange={(e) =>
                setPassword({
                  ...password,

                  currentPassword: e.target.value,
                })
              }
              className="
              w-full
              border
              rounded-xl
              p-3
              mb-3
              text-right
              "
            />

            <input
              type="password"
              placeholder="رمز جدید"
              value={password.newPassword}
              onChange={(e) =>
                setPassword({
                  ...password,

                  newPassword: e.target.value,
                })
              }
              className="
              w-full
              border
              rounded-xl
              p-3
              mb-5
              text-right
              "
            />

            <div
              className="
              flex
              gap-3
              "
            >
              {/* ذخیره سمت راست */}

              <button
                disabled={changePasswordMutation.isPending}
                onClick={() => {
                  changePasswordMutation.mutate(
                    password,

                    {
                      onSuccess: () => {
                        Swal.fire({
                          icon: "success",

                          title: "موفق",

                          text: "رمز عبور با موفقیت تغییر کرد",

                          timer: 1500,

                          showConfirmButton: false,
                        });

                        setShowPasswordModal(false);

                        setPassword({
                          currentPassword: "",

                          newPassword: "",
                        });
                      },

                      onError: (error) => {
                        Swal.fire({
                          icon: "error",

                          title: "خطا",

                          text:
                            error instanceof Error
                              ? error.message
                              : "خطا در تغییر رمز عبور",
                        });
                      },
                    },
                  );
                }}
                className="
                flex-1
                bg-primary500
                text-white
                rounded-xl
                py-2
                disabled:opacity-50
                "
              >
                {changePasswordMutation.isPending ? "در حال ذخیره..." : "ذخیره"}
              </button>

              {/* انصراف سمت چپ */}

              <button
                onClick={() => {
                  setShowPasswordModal(false);

                  setPassword({
                    currentPassword: "",

                    newPassword: "",
                  });
                }}
                className="
                flex-1
                bg-gray-200
                rounded-xl
                py-2
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

function SettingSwitch({
  title,

  description,

  checked,

  onChange,
}: {
  title: string;

  description: string;

  checked: boolean;

  onChange: (value: boolean) => void;
}) {
  return (
    <div
      className="
      flex
      items-center
      justify-between
      "
    >
      <Switch checked={checked} onChange={onChange} />

      <div className="text-right">
        <h3
          className="
          font-bold
          dark:text-white
          "
        >
          {title}
        </h3>

        <p
          className="
          text-xs
          text-gray-500
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function Switch({
  checked,

  onChange,
}: {
  checked: boolean;

  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`
      w-11
      h-6
      rounded-full
      relative
      transition

      ${checked ? "bg-primary500" : "bg-gray-300"}

      `}
    >
      <span
        className={`

        absolute

        top-1

        w-4

        h-4

        rounded-full

        bg-white

        shadow

        transition


        ${checked ? "right-6" : "right-1"}


        `}
      />
    </button>
  );
}
