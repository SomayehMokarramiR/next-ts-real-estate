"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

import { MapPin, Star, Home, Bath, Users, Car } from "lucide-react";

import { useReservation, useUpdateReservation } from "@/hooks/useReservations";

import { useProperties, type Property } from "@/hooks/useProperties";

type UpdateReservationPayload = {
  id: string;
  data: {
    propertyId: string;
  };
};

function formatPrice(price: number) {
  return price.toLocaleString("fa-IR");
}

export default function EditReservationPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const { data: reservationData, isLoading: reservationLoading } =
    useReservation(id);

  const { data: propertiesData, isLoading: propertiesLoading } = useProperties(
    {},
  );

  const updateMutation = useUpdateReservation();

  const reservation = reservationData?.reservation;
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const currentPropertyId = reservation?.propertyId?._id ?? null;

  if (reservationLoading || propertiesLoading) {
    return (
      <div className="p-10 text-center" dir="rtl">
        در حال دریافت اطلاعات...
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="p-10 text-center text-red-500" dir="rtl">
        رزرو پیدا نشد
      </div>
    );
  }

  const properties: Property[] = (propertiesData?.properties ?? []).filter(
    (property) =>
      property.status === "available" &&
      property.bookingType === "daily" &&
      Number(property.pricing?.daily ?? 0) > 0,
  );

  const currentProperty =
    typeof reservation.propertyId === "string" ? null : reservation.propertyId;

  function saveChange() {
    if (!selectedProperty) {
      Swal.fire({
        title: "انتخاب اقامتگاه",
        text: "لطفا یک اقامتگاه را انتخاب کنید",
        icon: "warning",
      });

      return;
    }

    updateMutation.mutate(
      {
        id,

        data: {
          propertyId: selectedProperty,
        },
      },

      {
        onSuccess: () => {
          Swal.fire({
            title: "موفق",
            text: "اقامتگاه رزرو با موفقیت تغییر کرد",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          router.push(`/account/reservations/${id}`);
        },

        onError: (error) => {
          Swal.fire({
            title: "خطا",
            text: error instanceof Error ? error.message : "خطا در تغییر رزرو",
            icon: "error",
          });
        },
      },
    );
  }
  return (
    <div className="space-y-8" dir="rtl">
      <h1 className="text-2xl font-bold">ویرایش رزرو</h1>

      {/* CURRENT */}

      <section>
        <h2 className="mb-4 font-bold text-lg">اقامتگاه فعلی</h2>

        <div
          className="
flex
gap-5
rounded-2xl
border
p-5
bg-white
"
        >
          <img
            src={currentProperty?.images?.[0] || "/images/galary1.png"}
            className="
w-64
h-48
rounded-xl
object-cover
"
          />

          <div className="space-y-3">
            <h3 className="font-bold text-xl">{currentProperty?.title}</h3>

            <p className="text-gray-400 flex gap-2">
              <MapPin size={16} />
              {currentProperty?.location?.city}
            </p>

            <p className="text-primary500 font-bold">
              {formatPrice(currentProperty?.pricing?.daily ?? 0)}
              تومان / شب
            </p>
          </div>
        </div>
      </section>

      {/* LIST */}

      <section>
        <h2 className="mb-4 font-bold text-lg">انتخاب اقامتگاه جدید</h2>

        <div
          className="
grid
grid-cols-1
md:grid-cols-2
gap-5
"
        >
          {properties.map((property) => (
            <button
              key={property._id}
              onClick={() => setSelectedProperty(property._id)}
              className={`
text-right
rounded-2xl
overflow-hidden
border
bg-white

${
  selectedProperty === property._id
    ? "border-primary500 ring-2 ring-primary500/30"
    : "border-gray-200"
}

`}
            >
              <img
                src={property.images?.[0] || "/images/galary1.png"}
                className="
h-48
w-full
object-cover
"
              />

              <div className="p-4 space-y-3">
                <h3 className="font-bold">{property.title}</h3>

                <p className="text-sm text-gray-400 flex gap-2">
                  <MapPin size={14} />
                  {property.location?.city}
                </p>

                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  <span>
                    <Home size={13} className="inline" />{" "}
                    {property.facilities?.bedrooms ?? 0}
                    اتاق
                  </span>

                  <span>
                    <Bath size={13} className="inline" />{" "}
                    {property.facilities?.bathrooms ?? 0}
                    حمام
                  </span>

                  <span>
                    <Users size={13} className="inline" />{" "}
                    {property.facilities?.capacity ?? 0}
                    نفر
                  </span>

                  <span>
                    <Car size={13} className="inline" />{" "}
                    {property.facilities?.parking ? "پارکینگ" : "ندارد"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-primary500 font-bold">
                  <Star size={14} />
                  {formatPrice(property.pricing?.daily ?? 0)}
                  تومان / شب
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-3" dir="rtl">
        <button
          type="button"
          onClick={() => router.push(`/account/reservations/${id}`)}
          className="
      rounded-xl
      border
      border-gray-200
      bg-white
      px-8
      py-3
      text-gray-600
      transition
      hover:bg-gray-100
      dark:border-[#444]
      dark:bg-[#272727]
      dark:text-gray-300
    "
        >
          انصراف
        </button>

        <button
          type="button"
          onClick={saveChange}
          disabled={updateMutation.isPending}
          className="
      rounded-xl
      bg-primary500
      px-8
      py-3
      text-white
      transition
      hover:bg-primary600
      disabled:opacity-50
    "
        >
          {updateMutation.isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </div>
    </div>
  );
}
