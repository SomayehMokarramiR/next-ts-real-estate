"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import SingleReserveHouse from "./SingleReserveHouse";
import SingleReserveHouse2 from "./SingleReserveHouse2";
import SingleReserveHouse3 from "./SingleReserveHouse3";
import Payment from "./Payment";
import SingleReserveHouse5 from "./SingleReserveHouse5";

import { useReserveProgress } from "@/app/context/ReserveProgressContext";
import { useQuery } from "@tanstack/react-query";

type Props = {
  propertyId: string;
};

export default function ReserveWizard({ propertyId }: Props) {
  const { step, setStep, setPropertyId, setReservationId, setProperty } =
    useReserveProgress();

  const searchParams = useSearchParams();

  const payment = searchParams.get("payment");
  const reservationId = searchParams.get("reservationId");

  // ذخیره شناسه ملک
  useEffect(() => {
    setPropertyId(propertyId);
  }, [propertyId, setPropertyId]);

  // دریافت اطلاعات ملک
  const { data: propertyData } = useQuery({
    queryKey: ["property", propertyId],

    queryFn: async () => {
      const res = await fetch(`/api/properties/${propertyId}`);

      if (!res.ok) {
        throw new Error("خطا در دریافت ملک");
      }

      const data = await res.json();

      console.log("PROPERTY API DATA:", data);

      return data.property ?? data;
    },

    enabled: !!propertyId,
  });

  // ذخیره ملک در Context
  useEffect(() => {
    if (propertyData) {
      setProperty(propertyData);
    }
  }, [propertyData, setProperty]);

  // برگشت از پرداخت موفق
  useEffect(() => {
    if (payment === "success" && reservationId) {
      setReservationId(reservationId);
      setStep(5);
    }
  }, [payment, reservationId, setReservationId, setStep]);

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

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
