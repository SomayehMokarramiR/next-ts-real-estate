import mongoose, { Schema, Document } from "mongoose";

export interface IReservation extends Document {
  propertyId: mongoose.Types.ObjectId;

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

  paymentAuthority?: string;

  status: "pending" | "paid" | "cancelled";

  createdAt: Date;
  updatedAt: Date;
}

const ReservationSchema = new Schema(
  {
    propertyId: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    checkIn: {
      type: String,
      required: true,
    },

    checkOut: {
      type: String,
      required: true,
    },

    nights: {
      type: Number,
      required: true,
    },

    contact: {
      phone: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },
    },

    passengers: [
      {
        name: {
          type: String,
          required: true,
        },

        family: {
          type: String,
          required: true,
        },

        gender: {
          type: String,
          enum: ["male", "female"],
          required: true,
        },

        nationalId: {
          type: String,
          required: true,
        },

        birthDate: {
          type: String,
          required: true,
        },
      },
    ],

    amount: {
      type: Number,
      required: true,
    },

    paymentAuthority: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Reservation ||
  mongoose.model<IReservation>("Reservation", ReservationSchema);
