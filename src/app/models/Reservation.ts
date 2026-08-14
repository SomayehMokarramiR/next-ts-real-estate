import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReservationPassenger {
  name: string;

  family: string;

  gender: "male" | "female";

  nationalId: string;

  birthDate: string;
}

export interface IReservation extends Document {
  userId: mongoose.Types.ObjectId;

  propertyId: mongoose.Types.ObjectId;

  checkIn: string;

  checkOut: string;

  nights: number;

  contact: {
    phone: string;

    email: string;
  };

  passengers: IReservationPassenger[];

  amount: number;

  paymentAuthority?: string | null;

  status: "pending" | "paid" | "cancelled";

  createdAt: Date;

  updatedAt: Date;
}

const ReservationSchema = new Schema<IReservation>(
  {
    userId: {
      type: Schema.Types.ObjectId,

      ref: "User",

      required: true,

      index: true,
    },

    propertyId: {
      type: Schema.Types.ObjectId,

      ref: "Property",

      required: true,

      index: true,
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

      min: 1,
    },

    contact: {
      phone: {
        type: String,

        required: true,

        trim: true,
      },

      email: {
        type: String,

        required: true,

        trim: true,

        lowercase: true,
      },
    },

    passengers: [
      {
        name: {
          type: String,

          required: true,

          trim: true,
        },

        family: {
          type: String,

          required: true,

          trim: true,
        },

        gender: {
          type: String,

          enum: ["male", "female"],

          required: true,
        },

        nationalId: {
          type: String,

          required: true,

          trim: true,
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

      min: 0,
    },

    paymentAuthority: {
      type: String,

      default: null,
    },

    status: {
      type: String,

      enum: ["pending", "paid", "cancelled"],

      default: "pending",

      index: true,
    },
  },

  {
    timestamps: true,
  },
);

ReservationSchema.index({
  userId: 1,

  createdAt: -1,
});

const Reservation: Model<IReservation> =
  mongoose.models.Reservation ||
  mongoose.model<IReservation>("Reservation", ReservationSchema);

export default Reservation;
