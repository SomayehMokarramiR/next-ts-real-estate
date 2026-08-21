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
      $in: ["pending", "paid", "cancelled"],
    },
  };

  if (excludeReservationId) {
    query._id = {
      $ne: new mongoose.Types.ObjectId(excludeReservationId),
    };
  }

  const reservations = await Reservation.find(query);

  for (const reservation of reservations) {
    const oldStart = jalaliToDate(reservation.checkIn);
    const oldEnd = jalaliToDate(reservation.checkOut);

    if (!oldStart || !oldEnd) continue;

    // تداخل واقعی تاریخ
    if (startDate < oldEnd && endDate > oldStart) {
      return true;
    }
  }

  return false;
}
