"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ReserveProgressContextType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;

  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
};

const ReserveProgressContext = createContext<
  ReserveProgressContextType | undefined
>(undefined);

export function ReserveProgressProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);

  const [progress, setProgress] = useState(0);

  return (
    <ReserveProgressContext.Provider
      value={{
        step,
        setStep,

        progress,
        setProgress,
      }}
    >
      {children}
    </ReserveProgressContext.Provider>
  );
}

export function useReserveProgress() {
  const context = useContext(ReserveProgressContext);

  if (!context) {
    throw new Error(
      "useReserveProgress must be used inside ReserveProgressProvider",
    );
  }

  return context;
}
