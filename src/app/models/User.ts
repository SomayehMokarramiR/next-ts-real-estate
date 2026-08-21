import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;

  role: "admin" | "user";

  favorites: mongoose.Types.ObjectId[];

  settings: {
    notifications: {
      reservation: boolean;
      messages: boolean;
      offers: boolean;
    };

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
    // User Settings
    // =====================

    settings: {
      type: {
        notifications: {
          // اعلان وضعیت رزرو
          reservation: {
            type: Boolean,
            default: true,
          },

          // پیام‌های سیستم
          messages: {
            type: Boolean,
            default: true,
          },

          // پیشنهادها و تخفیف‌ها
          offers: {
            type: Boolean,
            default: false,
          },
        },

        darkMode: {
          type: Boolean,
          default: false,
        },
      },

      default: {
        notifications: {
          reservation: true,
          messages: true,
          offers: false,
        },

        darkMode: false,
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
