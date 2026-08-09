"use client";

import { CreditCard, ChevronRight } from "lucide-react";

import { useReserveProgress } from "@/app/context/ReserveProgressContext";
import Stepper from "./Stepper";
import Swal from "sweetalert2";

import { useCreatePayment } from "@/hooks/useCreatePayment";

type Props = {
  prevStep: () => void;
  nextStep: () => void;
};

export default function Payment({ prevStep, nextStep }: Props) {
  const { reservationId, property, nights, step } = useReserveProgress();

  const createPaymentMutation = useCreatePayment();

  const amount = (property?.pricing?.daily ?? 0) * nights;

  const handlePayment = () => {
    if (!reservationId) {
      Swal.fire({
        icon: "warning",
        title: "خطا",
        text: "شناسه رزرو پیدا نشد",
      });

      return;
    }

    console.log("START PAYMENT:", reservationId);

    createPaymentMutation.mutate(
      {
        reservationId,
        amount,
      },

      {
        onSuccess: (data) => {
          console.log("PAYMENT RESPONSE:", data);

          if (data.success && data.paymentUrl) {
            window.location.href = data.paymentUrl;
          } else {
            Swal.fire({
              icon: "error",
              title: "خطا",
              text: "لینک پرداخت دریافت نشد",
            });
          }
        },

        onError: (error) => {
          Swal.fire({
            icon: "error",
            title: "خطا در پرداخت",
            text: error.message,
          });
        },
      },
    );
  };

  return (
    <>
      <div
        className="
      w-full
      max-w-3xl
      mx-auto
      px-4
      py-12
      sm:px-6
      lg:px-8
     

      "
      >
        <div className="mb-6">
          <Stepper active={step} />
        </div>
        <div className="mt-5 border border-gray-200 p-8 rounded-2xl">
          <h2
            className="
          text-center
          font-bold
          text-lg
          dark:text-white
          "
          >
            پرداخت آنلاین
          </h2>

          <div
            className="
          mt-5
          bg-[#F0F0F3]
          dark:bg-[#353535]
          rounded-2xl
          p-5
          sm:p-6
          space-y-4
          shadow-sm
          "
          >
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">شماره رزرو</span>

              <span className="dark:text-white text-left">
                {reservationId || "-"}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">اقامتگاه</span>

              <span className="dark:text-white">{property?.title || "-"}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">تعداد شب</span>

              <span className="dark:text-white">{nights} شب</span>
            </div>

            <div
              className="
            border-t
            pt-4
            flex
            justify-between
            "
            >
              <span className="text-gray-500">مبلغ قابل پرداخت</span>

              <span
                className="
              font-bold
              text-primary500
              "
              >
                {amount.toLocaleString()} تومان
              </span>
            </div>
          </div>

          <div
            className="
          mt-6
          flex
          gap-3
          "
          >
            <button
              type="button"
              onClick={prevStep}
              disabled={createPaymentMutation.isPending}
              className="
            w-1/2
            h-11
            rounded-full
            border
            border-gray-300
            dark:border-[#555]
            dark:text-white
            "
            >
              مرحله قبل
            </button>

            <button
              type="button"
              onClick={handlePayment}
              disabled={createPaymentMutation.isPending}
              className="
            w-1/2
            h-11
            rounded-full
            bg-primary500
            text-white
            flex
            items-center
            justify-center
            gap-2
            "
            >
              <CreditCard size={16} />

              {createPaymentMutation.isPending
                ? "در حال اتصال..."
                : "پرداخت آنلاین"}

              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
