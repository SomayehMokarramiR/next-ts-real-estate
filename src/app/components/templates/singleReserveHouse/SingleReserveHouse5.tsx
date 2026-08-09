"use client";

import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { useReserveProgress } from "@/app/context/ReserveProgressContext";
import Stepper from "./Stepper";

type ReservationData = {
  _id: string;
  amount: number;
  propertyId: {
    _id: string;
    title: string;
  };
  status: "pending" | "paid" | "cancelled";
};

export default function SingleReserveHouse5({
  prevStep,
}: {
  prevStep: () => void;
}) {
  const { reservationId, step } = useReserveProgress();

  const [reservation, setReservation] = useState<ReservationData | null>(null);

  useEffect(() => {
    if (!reservationId) return;

    fetch(`/api/reservations/${reservationId}`)
      .then((res) => res.json())
      .then((data) => {
        setReservation(data.reservation);
      });
  }, [reservationId]);

  return (
    <div
      className="
max-w-3xl
mx-auto
mt-6
"
    >
      {/* Stepper */}

      <div className="mb-6">
        <Stepper active={step} />
      </div>

      {/* فرم بلیط */}

      <div
        className="
bg-white
dark:bg-[#222]
rounded-3xl
shadow-sm
p-6
"
      >
        <div
          className="
flex
flex-col
items-center
gap-3
"
        >
          <CheckCircle size={60} className="text-green-500" />

          <h1
            className="
text-2xl
font-bold
dark:text-white
"
          >
            رزرو با موفقیت انجام شد
          </h1>

          <p className="text-gray-500">پرداخت شما تایید شد</p>
        </div>

        <div
          className="
mt-8
bg-[#F0F0F3]
dark:bg-[#333]
rounded-2xl
p-5
space-y-4
"
        >
          <div className="flex justify-between">
            <span>شماره رزرو</span>

            <span>{reservation?._id ?? "-"}</span>
          </div>

          <div className="flex justify-between">
            <span>اقامتگاه</span>

            <span className="font-bold">
              {reservation?.propertyId?.title ?? "در حال دریافت..."}
            </span>
          </div>

          <div className="flex justify-between">
            <span>مبلغ پرداختی</span>

            <span>
              {reservation?.amount ? reservation.amount.toLocaleString() : "-"}
              تومان
            </span>
          </div>
        </div>

        <button
          onClick={prevStep}
          className="
mt-6
w-full
h-11
rounded-full
border
dark:text-white
"
        >
          مرحله قبل
        </button>
      </div>
    </div>
  );
}
