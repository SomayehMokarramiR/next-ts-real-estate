export type CreateReservationPayload = {
  propertyId: string;

  checkIn: string;

  checkOut: string;

  nights: number;

  contact: {
    phone: string;
    email: string;
  };

  passengers: {
    name: string;
    family: string;
    gender: "male" | "female";
    nationalId: string;
    birthDate: string;
  }[];

  amount: number;
};

export async function createReservation(data: CreateReservationPayload) {
  const res = await fetch("/api/reservations", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "خطا در ثبت رزرو");
  }

  return result;
}
