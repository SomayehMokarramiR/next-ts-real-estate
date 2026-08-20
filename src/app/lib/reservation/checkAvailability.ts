import Reservation from "../../models/Reservation";
import mongoose from "mongoose";
import { jalaliToDate } from "./dateUtils";

interface CheckReservationConflictParams {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  excludeReservationId?: string;
}

export async function checkReservationConflict({
  propertyId,
  checkIn,
  checkOut,
  excludeReservationId,
}: CheckReservationConflictParams) {
  const startDate = jalaliToDate(checkIn);
  const endDate = jalaliToDate(checkOut);

  if (!startDate || !endDate) {
    return false;
  }

  const query: {
    propertyId: mongoose.Types.ObjectId;
    status: {
      $in: string[];
    };
    _id?: {
      $ne: mongoose.Types.ObjectId;
    };
  } = {
    propertyId: new mongoose.Types.ObjectId(propertyId),

    status: {
      $in: ["pending", "paid", "پرداخت شده"],
    },
  };

  if (excludeReservationId) {
    query._id = {
      $ne: new mongoose.Types.ObjectId(excludeReservationId),
    };
  }

  console.log("CONFLICT QUERY =>", query);

  const reservations = await Reservation.find(query);

  for (const reservation of reservations) {
    const oldStart = jalaliToDate(reservation.checkIn);

    const oldEnd = jalaliToDate(reservation.checkOut);

    if (!oldStart || !oldEnd) continue;

    console.log("COMPARE", {
      newStart: startDate,
      newEnd: endDate,
      oldStart,
      oldEnd,
    });

    // تداخل واقعی تاریخ
    if (startDate < oldEnd && endDate > oldStart) {
      console.log("CONFLICT TRUE", reservation._id.toString());

      return true;
    }
  }

  console.log("CONFLICT FALSE");

  return false;
}
