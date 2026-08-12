"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

function MockPaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const authority = searchParams.get("authority");

  const [loading, setLoading] = useState(false);

  const handlePaymentSuccess = async () => {
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

      if (!res.ok) {
        throw new Error(data.message || "خطا در تایید پرداخت");
      }

      if (data.success && data.propertyId && data.reservationId) {
        router.push(
          `/single-reserve-house/${data.propertyId}?payment=success&reservationId=${data.reservationId}`,
        );
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "خطایی در تایید پرداخت رخ داد.";

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
          bg-white
          dark:bg-[#272727]
          rounded-2xl
          p-8
          shadow
          text-center
        "
      >
        <h1 className="text-xl font-bold dark:text-white">درگاه پرداخت تستی</h1>

        <p className="mt-4 text-sm text-gray-500">مبلغ رزرو آماده پرداخت است</p>

        <button
          onClick={handlePaymentSuccess}
          disabled={loading}
          className="
            mt-6
            w-full
            h-11
            rounded-full
            bg-primary500
            text-white
            disabled:opacity-60
            disabled:cursor-not-allowed
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#111]">
          <div className="text-sm text-gray-500 dark:text-gray-300">
            در حال بارگذاری...
          </div>
        </div>
      }
    >
      <MockPaymentContent />
    </Suspense>
  );
}
