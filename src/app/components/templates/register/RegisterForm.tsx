"use client";

import RegisterContainer from "./RegisterContainer";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";

import { useRegisterProgress } from "@/app/context/RegisterProgressContext";

export default function RegisterForm() {
  const { step, setStep } = useRegisterProgress();

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <RegisterContainer>
      {step === 1 && <RegisterStep1 onNext={nextStep} />}

      {step === 2 && <RegisterStep2 onNext={nextStep} onBack={prevStep} />}

      {step === 3 && <RegisterStep3 onBack={prevStep} />}
    </RegisterContainer>
  );
}
