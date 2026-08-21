import mongoose, { Document, Model, Schema } from "mongoose";

// ========================================
// GENERAL
// ========================================

export interface GeneralSettings {
  siteName: string;
  siteDescription: string;
  phone: string;
  email: string;
  address: string;
  siteEnabled: boolean;
}

// ========================================
// RESERVATION
// ========================================

export interface ReservationSettings {
  reservationEnabled: boolean;
  minNights: number;
  maxNights: number;
  cancellationEnabled: boolean;
  cancellationDeadlineHours: number;
}

// ========================================
// NOTIFICATIONS
// ========================================

export interface NotificationSettings {
  systemMessages: boolean;
  reservation: boolean;
  offersAndDiscounts: boolean;
}

// ========================================
// SYSTEM
// ========================================

export interface SystemSettings {
  maintenanceMode: boolean;
  userRegistration: boolean;
  userLogin: boolean;
}

// ========================================
// ADMIN SETTINGS
// ========================================

export interface IAdminSettings extends Document {
  general: GeneralSettings;
  reservation: ReservationSettings;
  notifications: NotificationSettings;
  system: SystemSettings;

  createdAt: Date;
  updatedAt: Date;
}

const AdminSettingsSchema = new Schema<IAdminSettings>(
  {
    general: {
      siteName: {
        type: String,
        default: "املاک",
        trim: true,
      },

      siteDescription: {
        type: String,
        default: "",
        trim: true,
      },

      phone: {
        type: String,
        default: "",
        trim: true,
      },

      email: {
        type: String,
        default: "",
        trim: true,
      },

      address: {
        type: String,
        default: "",
        trim: true,
      },

      siteEnabled: {
        type: Boolean,
        default: true,
      },
    },

    // ========================================
    // RESERVATION SETTINGS
    // ========================================

    reservation: {
      reservationEnabled: {
        type: Boolean,
        default: true,
      },

      minNights: {
        type: Number,
        default: 1,
        min: 1,
      },

      maxNights: {
        type: Number,
        default: 30,
        min: 1,
      },

      cancellationEnabled: {
        type: Boolean,
        default: true,
      },

      cancellationDeadlineHours: {
        type: Number,
        default: 24,
        min: 0,
      },
    },

    // ========================================
    // NOTIFICATION SETTINGS
    // ========================================

    notifications: {
      systemMessages: {
        type: Boolean,
        default: true,
      },

      reservation: {
        type: Boolean,
        default: true,
      },

      offersAndDiscounts: {
        type: Boolean,
        default: true,
      },
    },

    // ========================================
    // SYSTEM SETTINGS
    // ========================================

    system: {
      maintenanceMode: {
        type: Boolean,
        default: false,
      },

      userRegistration: {
        type: Boolean,
        default: true,
      },

      userLogin: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

const AdminSettings: Model<IAdminSettings> =
  mongoose.models.AdminSettings ||
  mongoose.model<IAdminSettings>("AdminSettings", AdminSettingsSchema);

export default AdminSettings;
