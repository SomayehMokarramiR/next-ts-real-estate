"use client";

import { createContext, useContext, useState, ReactNode } from "react";

import { Passenger } from "../components/templates/singleReserveHouse/types";
import { Property } from "../../hooks/useProperties";
import { emptyPassenger } from "../components/templates/singleReserveHouse/constants";

type ReserveContextType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;

  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;

  propertyId: string;
  setPropertyId: React.Dispatch<React.SetStateAction<string>>;

  property: Property | null;
  setProperty: React.Dispatch<React.SetStateAction<Property | null>>;

  checkIn: string;
  setCheckIn: React.Dispatch<React.SetStateAction<string>>;

  checkOut: string;
  setCheckOut: React.Dispatch<React.SetStateAction<string>>;

  nights: number;
  setNights: React.Dispatch<React.SetStateAction<number>>;

  passengers: Passenger[];

  setPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>;

  // اطلاعات تماس جدا از فرم
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;

  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

const ReserveProgressContext = createContext<ReserveContextType | null>(null);

export function ReserveProgressProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);

  const [progress, setProgress] = useState(0);

  const [propertyId, setPropertyId] = useState("");

  const [property, setProperty] = useState<Property | null>(null);

  const [checkIn, setCheckIn] = useState("1405/05/20");

  const [checkOut, setCheckOut] = useState("1405/05/23");

  const [nights, setNights] = useState(3);

  const [passengers, setPassengers] = useState<Passenger[]>([emptyPassenger()]);

  // اطلاعات تماس مسافر آخر
  const [phone, setPhone] = useState("");

  const [email, setEmail] = useState("");

  return (
    <ReserveProgressContext.Provider
      value={{
        step,
        setStep,

        progress,
        setProgress,

        propertyId,
        setPropertyId,

        property,
        setProperty,

        checkIn,
        setCheckIn,

        checkOut,
        setCheckOut,

        nights,
        setNights,

        passengers,
        setPassengers,

        phone,
        setPhone,

        email,
        setEmail,
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
