"use client";

import { useState } from "react";

import RegisterContainer from "./RegisterContainer";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";

import { useRegisterProgress } from "@/app/context/RegisterProgressContext";

export default function RegisterForm() {
  const { step, setStep } = useRegisterProgress();

  const [userId, setUserId] = useState<string | null>(null);

  console.log("REGISTER FORM RENDER STEP:", step);

  const nextStep = () => {
    console.log("NEXT STEP FROM FORM:", step, "=>", step + 1);

    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <RegisterContainer>
      {step === 1 && (
        <RegisterStep1
          onNext={nextStep}
          onUserCreated={(id) => {
            console.log("SAVE USER ID:", id);

            setUserId(String(id));
          }}
        />
      )}

      {step === 2 && (
        <RegisterStep2 userId={userId} onNext={nextStep} onBack={prevStep} />
      )}

      {step === 3 && <RegisterStep3 userId={userId ?? ""} onBack={prevStep} />}
    </RegisterContainer>
  );
}
