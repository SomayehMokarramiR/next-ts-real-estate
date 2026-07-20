import { CheckCircle2, CreditCard, Hotel, Ticket, Users } from "lucide-react";
import { Passenger } from "./types";

export const STEPS = [
  { id: 1, label: "انتخاب هتل", icon: Hotel },
  { id: 2, label: "مشخصات مسافران", icon: Users },
  { id: 3, label: "تایید اطلاعات", icon: CheckCircle2 },
  { id: 4, label: "پرداخت آنلاین", icon: CreditCard },
  { id: 5, label: "صدور بلیط", icon: Ticket },
];

export const emptyPassenger = (): Passenger => ({
  name: "",
  family: "",
  gender: "",
  nationalId: "",
  birthDate: "",
});
