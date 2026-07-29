"use client";

import { createContext, useContext, useState } from "react";

type RegisterProgressContextType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;

  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
};

const RegisterProgressContext =
  createContext<RegisterProgressContextType | null>(null);

export function RegisterProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [step, setStep] = useState(1);

  const [progress, setProgress] = useState(0);

  return (
    <RegisterProgressContext.Provider
      value={{
        step,
        setStep,
        progress,
        setProgress,
      }}
    >
      {children}
    </RegisterProgressContext.Provider>
  );
}

export function useRegisterProgress() {
  const context = useContext(RegisterProgressContext);

  if (!context) {
    throw new Error(
      "useRegisterProgress must be used inside RegisterProgressProvider",
    );
  }

  return context;
}
