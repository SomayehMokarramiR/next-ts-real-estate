"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import { Passenger } from "../components/templates/singleReserveHouse/types";
import { Property } from "../../hooks/useProperties";
import { emptyPassenger } from "../components/templates/singleReserveHouse/constants";

export type Contact = {
  phone: string;
  email: string;
};

type ReserveContextType = {
  // STEP
  step: number;
  setStep: Dispatch<SetStateAction<number>>;

  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;

  // PROPERTY
  propertyId: string;
  setPropertyId: Dispatch<SetStateAction<string>>;

  property: Property | null;
  setProperty: Dispatch<SetStateAction<Property | null>>;

  // DATE
  checkIn: string;
  setCheckIn: Dispatch<SetStateAction<string>>;

  checkOut: string;
  setCheckOut: Dispatch<SetStateAction<string>>;

  nights: number;
  setNights: Dispatch<SetStateAction<number>>;

  // PASSENGERS
  passengers: Passenger[];
  setPassengers: Dispatch<SetStateAction<Passenger[]>>;

  // CONTACT
  contact: Contact;
  setContact: Dispatch<SetStateAction<Contact>>;

  // RESERVATION
  reservationId: string;
  setReservationId: Dispatch<SetStateAction<string>>;
};

const ReserveProgressContext = createContext<ReserveContextType | null>(null);

export function ReserveProgressProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<number>(1);

  const [progress, setProgress] = useState<number>(0);

  const [propertyId, setPropertyId] = useState<string>("");

  const [property, setProperty] = useState<Property | null>(null);

  const [checkIn, setCheckIn] = useState<string>("");

  const [checkOut, setCheckOut] = useState<string>("");

  const [nights, setNights] = useState<number>(0);

  const [passengers, setPassengers] = useState<Passenger[]>([emptyPassenger()]);

  const [contact, setContact] = useState<Contact>({
    phone: "",
    email: "",
  });

  const [reservationId, setReservationId] = useState<string>("");

  return (
    <ReserveProgressContext.Provider
      value={{
        // STEP
        step,
        setStep,

        progress,
        setProgress,

        // PROPERTY
        propertyId,
        setPropertyId,

        property,
        setProperty,

        // DATE
        checkIn,
        setCheckIn,

        checkOut,
        setCheckOut,

        nights,
        setNights,

        // PASSENGERS
        passengers,
        setPassengers,

        // CONTACT
        contact,
        setContact,

        // RESERVATION
        reservationId,
        setReservationId,
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
