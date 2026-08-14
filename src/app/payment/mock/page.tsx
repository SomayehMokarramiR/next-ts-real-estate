"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

function MockPaymentContent() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const authority = searchParams.get("authority");

  const reservationId = searchParams.get("reservationId");

  const [loading, setLoading] = useState(false);

  const handlePaymentSuccess = async () => {
    if (!authority || !reservationId) {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: "اطلاعات پرداخت ناقص است",
      });

      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/payments/verify", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          authority,
        }),
      });

      const data = await res.json();

      console.log("VERIFY RESPONSE:", data);

      if (!res.ok || !data.success) {
        throw new Error(data.message || "خطا در تایید پرداخت");
      }

      await Swal.fire({
        icon: "success",

        title: "پرداخت موفق",

        text: "رزرو شما با موفقیت تایید شد",

        timer: 1500,

        showConfirmButton: false,
      });

      router.push(`/account/reservations/${data.reservationId}`);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "خطایی در تایید پرداخت رخ داد";

      Swal.fire({
        icon: "error",

        title: "خطا",

        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
      dark:bg-[#111]
      "
    >
      <div
        className="
        w-full
        max-w-sm
        rounded-2xl
        bg-white
        dark:bg-[#272727]
        p-8
        text-center
        shadow
        "
      >
        <h1
          className="
          text-xl
          font-bold
          text-gray-900
          dark:text-white
          "
        >
          درگاه پرداخت تستی
        </h1>

        <p
          className="
          mt-4
          text-sm
          text-gray-500
          dark:text-gray-300
          "
        >
          تایید پرداخت رزرو
        </p>

        <button
          onClick={handlePaymentSuccess}
          disabled={loading}
          className="
          mt-6
          h-11
          w-full
          rounded-full
          bg-primary500
          text-white
          disabled:opacity-60
          "
        >
          {loading ? "در حال بررسی..." : "پرداخت موفق"}
        </button>
      </div>
    </div>
  );
}

export default function MockPaymentPage() {
  return (
    <Suspense
      fallback={
        <div
          className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-gray-100
          dark:bg-[#111]
          "
        >
          <span className="text-sm text-gray-500">در حال بارگذاری...</span>
        </div>
      }
    >
      <MockPaymentContent />
    </Suspense>
  );
}
