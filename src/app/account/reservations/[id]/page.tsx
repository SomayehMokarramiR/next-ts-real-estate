"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Passenger = {
  name: string;
  family: string;
  gender: "male" | "female";
  nationalId: string;
  birthDate: string;
};

type Property = {
  _id: string;
  title: string;
  description?: string;
  images?: string[];
  location?: {
    city?: string;
    address?: string;
  };
  pricing?: {
    daily?: number;
  };
};

type Reservation = {
  _id: string;

  checkIn: string;
  checkOut: string;

  nights: number;

  amount: number;

  status: "pending" | "paid" | "cancelled";

  contact: {
    phone: string;
    email: string;
  };

  passengers: Passenger[];

  propertyId: Property;
};

type ApiResponse = {
  success: boolean;
  message?: string;
  reservation?: Reservation;
};

const statusText = {
  pending: "در انتظار پرداخت",
  paid: "پرداخت شده",
  cancelled: "لغو شده",
};

export default function ReservationDetailsPage() {
  const params = useParams();

  const id = params?.id as string;

  const [reservation, setReservation] = useState<Reservation | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function fetchReservation() {
      try {
        setLoading(true);

        const res = await fetch(`/api/reservations/${id}`, {
          credentials: "include",
          cache: "no-store",
        });

        const data: ApiResponse = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "خطا در دریافت رزرو");
        }

        setReservation(data.reservation || null);
      } catch (err) {
        console.log(err);

        setError(err instanceof Error ? err.message : "خطا در دریافت رزرو");
      } finally {
        setLoading(false);
      }
    }

    fetchReservation();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center">در حال دریافت اطلاعات رزرو...</div>
    );
  }

  if (error || !reservation) {
    return <div className="p-10 text-red-500">{error || "رزرو پیدا نشد"}</div>;
  }

  const property = reservation.propertyId;

  return (
    <main
      dir="rtl"
      className="
      max-w-6xl
      mx-auto
      px-4
      py-10
      "
    >
      <h1
        className="
      text-2xl
      font-bold
      mb-6
      "
      >
        جزئیات رزرو
      </h1>

      <div
        className="
      grid
      md:grid-cols-3
      gap-6
      "
      >
        <div
          className="
        md:col-span-2
        space-y-6
        "
        >
          <section
            className="
          bg-white
          dark:bg-[#272727]
          rounded-2xl
          p-6
          border
          "
          >
            <h2 className="font-bold mb-4">اطلاعات اقامتگاه</h2>

            {property.images?.[0] && (
              <img
                src={property.images[0]}
                className="
              w-full
              h-56
              object-cover
              rounded-xl
              mb-4
              "
              />
            )}

            <h3 className="font-bold">{property.title}</h3>

            <p className="text-sm mt-2">شهر: {property.location?.city}</p>

            <p className="text-sm">آدرس: {property.location?.address}</p>
          </section>

          <section
            className="
          bg-white
          dark:bg-[#272727]
          rounded-2xl
          p-6
          border
          "
          >
            <h2 className="font-bold mb-4">تاریخ اقامت</h2>

            <div
              className="
            grid
            sm:grid-cols-3
            gap-3
            "
            >
              <div className="bg-gray-100 dark:bg-[#353535] p-4 rounded-xl">
                ورود:
                <br />
                {reservation.checkIn}
              </div>

              <div className="bg-gray-100 dark:bg-[#353535] p-4 rounded-xl">
                خروج:
                <br />
                {reservation.checkOut}
              </div>

              <div className="bg-gray-100 dark:bg-[#353535] p-4 rounded-xl">
                مدت:
                <br />
                {reservation.nights} شب
              </div>
            </div>
          </section>

          <section
            className="
          bg-white
          dark:bg-[#272727]
          rounded-2xl
          p-6
          border
          "
          >
            <h2 className="font-bold mb-4">مسافران</h2>

            {reservation.passengers.map((p, index) => (
              <div
                key={index}
                className="
                bg-gray-100
                dark:bg-[#353535]
                rounded-xl
                p-4
                mb-3
                "
              >
                {p.name} {p.family}
                <div className="text-xs mt-2">کد ملی: {p.nationalId}</div>
              </div>
            ))}
          </section>
        </div>

        <aside>
          <section
            className="
          bg-white
          dark:bg-[#272727]
          rounded-2xl
          p-6
          border
          "
          >
            <h2 className="font-bold mb-5">خلاصه رزرو</h2>

            <p>مبلغ: {reservation.amount.toLocaleString("fa-IR")} تومان</p>

            <p className="mt-4">
              وضعیت:
              <span
                className="
              mr-2
              rounded-full
              bg-primary500/10
              px-3
              py-1
              text-primary500
              text-xs
              "
              >
                {statusText[reservation.status]}
              </span>
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}
