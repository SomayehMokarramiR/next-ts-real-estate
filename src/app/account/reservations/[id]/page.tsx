"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Passenger = {
  name?: string;
  family?: string;
  gender?: string;
  nationalId?: string;
  birthDate?: string;
};

type Property = {
  _id?: string;
  title?: string;
  description?: string;
  images?: string[];
  location?: {
    city?: string;
    address?: string;
  };
  type?: string;
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
  status: string;

  contact?: {
    phone?: string;
    email?: string;
  };

  passengers?: Passenger[];

  propertyId?: Property;
};

type ApiResponse = {
  success: boolean;
  message?: string;
  reservation?: Reservation;
};

export default function ReservationDetailsPage() {
  const params = useParams();

  const id = params?.id as string;

  const [reservation, setReservation] = useState<Reservation | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }

    const getReservation = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/reservations/${id}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = (await response.json()) as ApiResponse;

        if (!response.ok || !data.success) {
          setError(data.message || "خطا در دریافت جزئیات رزرو");

          return;
        }

        if (!data.reservation) {
          setError("رزرو موردنظر پیدا نشد");

          return;
        }

        setReservation(data.reservation);
      } catch (error) {
        console.error("GET RESERVATION DETAILS ERROR:", error);

        setError("خطا در دریافت جزئیات رزرو");
      } finally {
        setLoading(false);
      }
    };

    getReservation();
  }, [id]);

  /* =========================
     Loading
  ========================= */

  if (loading) {
    return (
      <main dir="rtl" className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-[#353535] dark:bg-[#272727]">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            در حال دریافت جزئیات رزرو...
          </p>
        </div>
      </main>
    );
  }

  /* =========================
     Error
  ========================= */

  if (error || !reservation) {
    return (
      <main dir="rtl" className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
          {error || "رزرو موردنظر پیدا نشد"}
        </div>
      </main>
    );
  }

  const property = reservation.propertyId;

  return (
    <main
      dir="rtl"
      className="mx-auto w-full max-w-6xl px-4 py-10 text-foreground"
    >
      {/* عنوان */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">جزئیات رزرو</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          شناسه رزرو:
          <span className="mr-2 font-mono">{reservation._id}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* ستون اصلی */}
        <div className="space-y-6 md:col-span-2">
          {/* اطلاعات اقامتگاه */}
          <section
            className="
          rounded-2xl
          border
          border-border
          bg-background
          p-6
          shadow-sm
          "
          >
            <h2 className="mb-5 text-lg font-bold text-foreground">
              اطلاعات اقامتگاه
            </h2>

            {property?.images && property.images.length > 0 && (
              <img
                src={property.images[0]}
                alt={property.title || "اقامتگاه"}
                className="
                mb-5
                h-56
                w-full
                rounded-xl
                object-cover
                "
              />
            )}

            <h3 className="text-base font-bold text-foreground">
              {property?.title || "اقامتگاه"}
            </h3>

            {property?.location?.city && (
              <p className="mt-2 text-sm text-muted-foreground">
                شهر: {property.location.city}
              </p>
            )}

            {property?.location?.address && (
              <p className="mt-1 text-sm text-muted-foreground">
                آدرس: {property.location.address}
              </p>
            )}
          </section>

          {/* تاریخ اقامت */}
          <section
            className="
          rounded-2xl
          border
          border-border
          bg-background
          p-6
          shadow-sm
          "
          >
            <h2 className="mb-5 text-lg font-bold text-foreground">
              تاریخ اقامت
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                {
                  title: "تاریخ ورود",
                  value: reservation.checkIn,
                },
                {
                  title: "تاریخ خروج",
                  value: reservation.checkOut,
                },
                {
                  title: "مدت اقامت",
                  value: `${reservation.nights} شب`,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="
                rounded-xl
                bg-muted
                p-4
                "
                >
                  <p className="text-xs text-muted-foreground">{item.title}</p>

                  <p
                    className="
                  mt-2
                  font-semibold
                  text-foreground
                  "
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* مسافران */}
          <section
            className="
          rounded-2xl
          border
          border-border
          bg-background
          p-6
          shadow-sm
          "
          >
            <h2 className="mb-5 text-lg font-bold text-foreground">مسافران</h2>

            {reservation.passengers && reservation.passengers.length > 0 ? (
              <div className="space-y-3">
                {reservation.passengers.map((passenger, index) => (
                  <div
                    key={index}
                    className="
                        rounded-xl
                        bg-muted
                        p-4
                        "
                  >
                    <p className="font-semibold text-foreground">
                      {passenger.name} {passenger.family}
                    </p>

                    {passenger.nationalId && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        کد ملی: {passenger.nationalId}
                      </p>
                    )}

                    {passenger.gender && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        جنسیت: {passenger.gender}
                      </p>
                    )}

                    {passenger.birthDate && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        تاریخ تولد: {passenger.birthDate}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                اطلاعات مسافران ثبت نشده است.
              </p>
            )}
          </section>
        </div>

        {/* ستون کناری */}
        <div className="md:sticky md:top-24 md:self-start">
          <div className="space-y-6">
            {/* خلاصه رزرو */}
            <section
              className="
            rounded-2xl
            border
            border-border
            bg-background
            p-6
            shadow-sm
            "
            >
              <h2 className="mb-5 text-lg font-bold text-foreground">
                خلاصه رزرو
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">تعداد شب</span>

                  <span className="font-semibold text-foreground">
                    {reservation.nights} شب
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">مبلغ رزرو</span>

                  <span className="font-bold text-primary500">
                    {Number(reservation.amount).toLocaleString("fa-IR")} تومان
                  </span>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">وضعیت</span>

                    <span
                      className="
                    rounded-full
                    bg-primary500/10
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-primary500
                    "
                    >
                      {reservation.status}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* اطلاعات تماس */}
            {reservation.contact && (
              <section
                className="
                rounded-2xl
                border
                border-border
                bg-background
                p-6
                shadow-sm
                "
              >
                <h2 className="mb-5 text-base font-bold text-foreground">
                  اطلاعات تماس
                </h2>

                {reservation.contact.phone && (
                  <p className="text-sm text-muted-foreground">
                    تلفن: {reservation.contact.phone}
                  </p>
                )}

                {reservation.contact.email && (
                  <p className="mt-2 break-all text-sm text-muted-foreground">
                    ایمیل: {reservation.contact.email}
                  </p>
                )}
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
