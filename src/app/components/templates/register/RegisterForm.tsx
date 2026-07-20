"use client";

import { useState } from "react";
import RegisterLayout from "./RegisterLayout";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";

export default function RegisterForm() {
  const [step, setStep] = useState(1);

  return (
    <RegisterLayout>
      {step === 1 && <RegisterStep1 onNext={() => setStep(2)} />}

      {step === 2 && (
        <RegisterStep2 onNext={() => setStep(3)} onBack={() => setStep(1)} />
      )}

      {step === 3 && <RegisterStep3 onBack={() => setStep(2)} />}
    </RegisterLayout>
  );
}
