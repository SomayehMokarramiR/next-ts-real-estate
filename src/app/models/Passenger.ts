import mongoose, { Schema } from "mongoose";

const PassengerSchema = new Schema(
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
      required: true,
    },

    nationalId: {
      type: String,
      required: true,
    },

    birthDate: {
      type: String,
    },

    phone: {
      type: String,
    },

    email: {
      type: String,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Passenger ||
  mongoose.model("Passenger", PassengerSchema);
