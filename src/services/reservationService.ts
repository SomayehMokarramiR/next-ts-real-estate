const API_URL = "/api/reservations";

/* =========================
   Types
========================= */

export type CreateReservationPayload = {
  propertyId: string;

  checkIn: string;

  checkOut: string;

  nights: number;

  passengers: {
    name: string;
    family: string;
    gender: "male" | "female";
    nationalId: string;
    birthDate: string;
  }[];

  amount: number;
};

export type UpdateReservationPayload = {
  propertyId: string;
};

export interface ReservationProperty {
  _id: string;

  title: string;

  images?: string[];

  type?: string;

  rating?: number;

  status?: string;

  bookingType?: string;

  location?: {
    city?: string;
    address?: string;
  };

  pricing?: {
    daily?: number;
    oldPrice?: number;
  };

  facilities?: {
    bedrooms?: number;
    bathrooms?: number;
    capacity?: number;
    parking?: boolean;
  };
}
export interface ReservationPassenger {
  name: string;

  family: string;

  gender: "male" | "female";

  nationalId: string;

  birthDate: string;
}

export interface Reservation {
  _id: string;

  userId: string;

  propertyId: ReservationProperty;

  checkIn: string;

  checkOut: string;

  nights: number;

  contact: {
    phone: string;

    email: string;
  };

  passengers: ReservationPassenger[];

  amount: number;

  paymentAuthority?: string | null;

  status: "pending" | "paid" | "cancelled";

  createdAt?: string;

  updatedAt?: string;
}

export interface MyReservationsResponse {
  success: boolean;

  reservations: Reservation[];

  total: number;

  message?: string;
}

export interface ReservationResponse {
  success: boolean;

  reservation?: Reservation;

  message?: string;
}

export interface DeleteReservationResponse {
  success: boolean;

  message: string;
}

/* =========================
   Common Request
========================= */

async function reservationRequest<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    ...options,

    credentials: "include",

    headers: {
      "Content-Type": "application/json",

      ...options?.headers,
    },
  });

  const responseText = await response.text();

  let data: T;

  try {
    data = JSON.parse(responseText);
  } catch {
    throw new Error(`پاسخ API معتبر نیست. Status: ${response.status}`);
  }

  if (!response.ok) {
    const errorData = data as T & {
      message?: string;
    };

    throw new Error(errorData.message || "خطا در ارتباط با API رزرو");
  }

  return data;
}

/* =========================
   Create Reservation
========================= */

export function createReservation(data: CreateReservationPayload) {
  return reservationRequest<ReservationResponse>(`${API_URL}`, {
    method: "POST",

    body: JSON.stringify(data),
  });
}

/* =========================
   My Reservations
========================= */

export function getMyReservations() {
  return reservationRequest<MyReservationsResponse>(`${API_URL}/my`, {
    method: "GET",
  });
}

/* =========================
   Reservation Details
========================= */

export function getReservationById(id: string) {
  return reservationRequest<ReservationResponse>(`${API_URL}/${id}`, {
    method: "GET",
  });
}

/* =========================
   Delete Reservation
========================= */

export function deleteReservation(id: string) {
  return reservationRequest<DeleteReservationResponse>(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}

/* =========================
   Update Reservation
========================= */

export function updateReservation(id: string, data: { propertyId: string }) {
  return reservationRequest<ReservationResponse>(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
