"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import SingleReserveHouse from "./SingleReserveHouse";
import SingleReserveHouse2 from "./SingleReserveHouse2";
import SingleReserveHouse3 from "./SingleReserveHouse3";
import Payment from "./Payment";
import SingleReserveHouse5 from "./SingleReserveHouse5";

import { useReserveProgress } from "@/app/context/ReserveProgressContext";

type Props = {
  propertyId: string;
};

export default function ReserveWizard({ propertyId }: Props) {
  const {
    step,
    setStep,
    setPropertyId,
    setReservationId,
    setProperty,
    property,
  } = useReserveProgress();

  const searchParams = useSearchParams();

  const payment = searchParams.get("payment");
  const reservationId = searchParams.get("reservationId");

  // ======================================
  // PROPERTY ID
  // ======================================

  useEffect(() => {
    if (propertyId) {
      setPropertyId(propertyId);
    }
  }, [propertyId, setPropertyId]);

  // ======================================
  // GET PROPERTY
  // ======================================

  const {
    data: propertyData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["property", propertyId],

    queryFn: async () => {
      if (!propertyId) {
        throw new Error("شناسه اقامتگاه موجود نیست");
      }

      console.log("GET PROPERTY ID:", propertyId);

      const res = await fetch(`/api/properties/${propertyId}`, {
        method: "GET",
        cache: "no-store",
      });

      const data = await res.json();

      console.log("PROPERTY API STATUS:", res.status);

      console.log("PROPERTY API DATA:", data);

      if (!res.ok) {
        throw new Error(
          data?.message || data?.error || "خطا در دریافت اطلاعات اقامتگاه",
        );
      }

      const property = data?.property ?? data;

      if (!property?._id) {
        throw new Error("اطلاعات اقامتگاه پیدا نشد");
      }

      return property;
    },

    enabled: Boolean(propertyId),

    staleTime: 5 * 60 * 1000,

    refetchOnWindowFocus: false,
  });

  // ======================================
  // SAVE PROPERTY IN CONTEXT
  // ======================================

  useEffect(() => {
    if (propertyData) {
      console.log("SETTING PROPERTY IN CONTEXT:", propertyData);

      setProperty(propertyData);
    }
  }, [propertyData, setProperty]);

  // ======================================
  // PAYMENT CALLBACK
  // ======================================

  useEffect(() => {
    if (payment === "success" && reservationId) {
      setReservationId(reservationId);

      setStep(5);
    }
  }, [payment, reservationId, setReservationId, setStep]);

  // ======================================
  // NEXT STEP
  // ======================================

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 5));
  };

  // ======================================
  // PREVIOUS STEP
  // ======================================

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // ======================================
  // LOADING
  // ======================================

  if (isLoading) {
    return (
      <div
        dir="rtl"
        className="
          min-h-[60vh]
          flex
          items-center
          justify-center
          px-4
        "
      >
        <div className="text-center">
          <div
            className="
              mx-auto
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-gray-200
              border-t-primary500
            "
          />

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
            در حال دریافت اطلاعات اقامتگاه...
          </p>
        </div>
      </div>
    );
  }

  // ======================================
  // ERROR
  // ======================================

  if (isError) {
    return (
      <div
        dir="rtl"
        className="
          min-h-[60vh]
          flex
          items-center
          justify-center
          px-4
        "
      >
        <div
          className="
            w-full
            max-w-md
            rounded-3xl
            bg-red-50
            dark:bg-red-950/20
            p-8
            text-center
          "
        >
          <h2 className="text-lg font-bold text-red-500">
            اطلاعات اقامتگاه پیدا نشد
          </h2>

          <p className="mt-3 text-sm text-red-400">
            {error instanceof Error
              ? error.message
              : "خطا در دریافت اطلاعات اقامتگاه"}
          </p>

          <p className="mt-3 text-xs text-gray-400 break-all">
            شناسه ملک: {propertyId}
          </p>
        </div>
      </div>
    );
  }

  // ======================================
  // PROPERTY NOT FOUND
  // ======================================

  if (!propertyData && !property) {
    return (
      <div
        dir="rtl"
        className="
          min-h-[60vh]
          flex
          items-center
          justify-center
          px-4
        "
      >
        <div className="text-center">
          <h2 className="text-lg font-bold text-red-500">
            اطلاعات اقامتگاه پیدا نشد
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            شناسه اقامتگاه معتبر نیست.
          </p>
        </div>
      </div>
    );
  }

  // ======================================
  // WIZARD
  // ======================================

  return (
    <>
      {step === 1 && <SingleReserveHouse onNext={nextStep} />}

      {step === 2 && (
        <SingleReserveHouse2 nextStep={nextStep} prevStep={prevStep} />
      )}

      {step === 3 && (
        <SingleReserveHouse3 nextStep={nextStep} prevStep={prevStep} />
      )}

      {step === 4 && <Payment nextStep={nextStep} prevStep={prevStep} />}

      {step === 5 && <SingleReserveHouse5 prevStep={prevStep} />}
    </>
  );
}
