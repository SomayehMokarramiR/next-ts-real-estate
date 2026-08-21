import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;

  role: "admin" | "user";

  favorites: mongoose.Types.ObjectId[];

  notifications: {
    systemMessages: boolean;
    reservation: boolean;
    offersAndDiscounts: boolean;
  };

  settings: {
    darkMode: boolean;
  };

  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    favorites: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Property",
        },
      ],
      default: [],
    },

    // =====================
    // USER NOTIFICATIONS
    // =====================

    notifications: {
      systemMessages: {
        type: Boolean,
        default: true,
      },

      // اعلان‌های مربوط به رزرو
      reservation: {
        type: Boolean,
        default: true,
      },

      offersAndDiscounts: {
        type: Boolean,
        default: false,
      },
    },

    // =====================
    // USER SETTINGS
    // =====================

    settings: {
      darkMode: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  },
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
