"use client";

import { useState } from "react";
import Swal from "sweetalert2";

import { useAdminCreateNotification } from "../../../../../hooks/useAdminCreateNotification";

interface NotificationFormProps {
  users?: {
    _id: string;

    name: string;

    lastName?: string;

    email: string;
  }[];

  onSuccess?: () => void;
}

type NotificationType = "message" | "offer" | "system";

interface NotificationFormState {
  userId: string;

  title: string;

  message: string;

  type: NotificationType;
}

export default function NotificationForm({
  users = [],

  onSuccess,
}: NotificationFormProps) {
  const createMutation = useAdminCreateNotification();

  const [form, setForm] = useState<NotificationFormState>({
    userId: "",

    title: "",

    message: "",

    type: "system",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.userId || !form.title.trim() || !form.message.trim()) {
      Swal.fire({
        title: "خطا",

        text: "لطفاً تمام فیلدها را کامل کنید",

        icon: "warning",

        confirmButtonText: "باشه",
      });

      return;
    }

    createMutation.mutate(form, {
      onSuccess: () => {
        Swal.fire({
          title: "موفق",

          text: "اعلان با موفقیت ایجاد شد",

          icon: "success",

          timer: 1500,

          showConfirmButton: false,
        });

        setForm({
          userId: "",

          title: "",

          message: "",

          type: "system",
        });

        onSuccess?.();
      },

      onError: (error) => {
        Swal.fire({
          title: "خطا",

          text: error instanceof Error ? error.message : "خطا در ایجاد اعلان",

          icon: "error",

          confirmButtonText: "باشه",
        });
      },
    });
  };

  const inputClass = `

    w-full

    rounded-lg

    border

    border-gray-300

    bg-white

    p-3

    text-gray-900

    focus:outline-none

    focus:ring-2

    focus:ring-blue-500

    dark:border-gray-700

    dark:bg-gray-800

    dark:text-white

  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block">کاربر</label>

        <select
          name="userId"
          value={form.userId}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">انتخاب کاربر</option>

          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} {user.lastName ?? ""}
              {" - "}
              {user.email}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block">عنوان</label>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className={inputClass}
          placeholder="عنوان اعلان"
        />
      </div>

      <div>
        <label className="mb-2 block">متن اعلان</label>

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          className={inputClass}
          placeholder="متن اعلان"
        />
      </div>

      <div>
        <label className="mb-2 block">نوع اعلان</label>

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="system">پیام سیستم</option>

          <option value="message">پیام کاربری</option>

          <option value="offer">پیشنهادها و تخفیف‌ها</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={createMutation.isPending}
        className="

        rounded-lg

        bg-blue-600

        px-5

        py-3

        text-white

        hover:bg-blue-700

        disabled:opacity-50

        "
      >
        {createMutation.isPending ? "در حال ثبت..." : "ایجاد اعلان"}
      </button>
    </form>
  );
}
