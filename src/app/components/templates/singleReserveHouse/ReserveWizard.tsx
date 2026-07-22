"use client";

import { useState } from "react";

import SingleReserveHouse from "./SingleReserveHouse";
import SingleReserveHouse2 from "./SingleReserveHouse2";
import SingleReserveHouse3 from "./SingleReserveHouse3";

export default function ReserveWizard() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
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
