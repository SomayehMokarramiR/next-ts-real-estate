"use client";

import { useEffect } from "react";

import SingleReserveHouse from "./SingleReserveHouse";
import SingleReserveHouse2 from "./SingleReserveHouse2";
import SingleReserveHouse3 from "./SingleReserveHouse3";

import { useReserveProgress } from "@/app/context/ReserveProgressContext";

type Props = {
  propertyId: string;
};

export default function ReserveWizard({ propertyId }: Props) {
  const { step, setStep, setPropertyId } = useReserveProgress();

  // ذخیره id ملک برای کل مراحل رزرو
  useEffect(() => {
    setPropertyId(propertyId);
  }, [propertyId, setPropertyId]);

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 3));
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

      {step === 3 && <SingleReserveHouse3 prevStep={prevStep} />}
    </>
  );
}
