import mongoose, { Schema, Document, Model } from "mongoose";

// =========================
// PROPERTY INTERFACE
// =========================

export interface IProperty extends Document {
  title: string;

  description?: string;

  type: "apartment" | "villa" | "house" | "hotel" | "suite";

  location: {
    city: string;
    address: string;
  };

  images: string[];

  facilities: {
    bedrooms: number;
    bathrooms: number;
    parking: boolean;
    capacity: number;
  };

  pricing: {
    daily: number;
    monthly?: number;
  };

  status: "available" | "reserved" | "inactive";

  owner?: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

// =========================
// PROPERTY SCHEMA
// =========================

const PropertySchema = new Schema<IProperty>(
  {
    // =========================
    // BASIC INFORMATION
    // =========================

    title: {
      type: String,
      required: [true, "عنوان ملک الزامی است"],
      trim: true,
      minlength: [3, "عنوان ملک باید حداقل ۳ کاراکتر باشد"],
      maxlength: [150, "عنوان ملک نمی‌تواند بیشتر از ۱۵۰ کاراکتر باشد"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [2000, "توضیحات ملک نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد"],
    },

    type: {
      type: String,
      enum: {
        values: ["apartment", "villa", "house", "hotel", "suite"],
        message: "نوع ملک معتبر نیست",
      },
      default: "apartment",
    },

    // =========================
    // LOCATION
    // =========================

    location: {
      city: {
        type: String,
        required: [true, "شهر الزامی است"],
        trim: true,
      },

      address: {
        type: String,
        required: [true, "آدرس الزامی است"],
        trim: true,
      },
    },

    // =========================
    // IMAGES
    // =========================

    images: {
      type: [String],
      default: [],
      validate: {
        validator: function (images: string[]) {
          return images.length <= 20;
        },
        message: "تعداد تصاویر نمی‌تواند بیشتر از ۲۰ عدد باشد",
      },
    },

    // =========================
    // FACILITIES
    // =========================

    facilities: {
      bedrooms: {
        type: Number,
        default: 0,
        min: [0, "تعداد اتاق خواب نمی‌تواند منفی باشد"],
      },

      bathrooms: {
        type: Number,
        default: 0,
        min: [0, "تعداد حمام نمی‌تواند منفی باشد"],
      },

      parking: {
        type: Boolean,
        default: false,
      },

      capacity: {
        type: Number,
        default: 1,
        min: [1, "ظرفیت باید حداقل ۱ نفر باشد"],
      },
    },

    // =========================
    // PRICING
    // =========================

    pricing: {
      daily: {
        type: Number,
        required: [true, "قیمت روزانه الزامی است"],
        min: [0, "قیمت روزانه نمی‌تواند منفی باشد"],
      },

      monthly: {
        type: Number,
        min: [0, "قیمت ماهانه نمی‌تواند منفی باشد"],
      },
    },

    // =========================
    // STATUS
    // =========================

    status: {
      type: String,
      enum: {
        values: ["available", "reserved", "inactive"],
        message: "وضعیت ملک معتبر نیست",
      },
      default: "available",
    },

    // =========================
    // OWNER
    // =========================

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: undefined,
    },
  },

  // =========================
  // TIMESTAMPS
  // =========================

  {
    timestamps: true,
  },
);

// =========================
// MODEL
// =========================

const Property: Model<IProperty> =
  mongoose.models.Property ||
  mongoose.model<IProperty>("Property", PropertySchema);

export default Property;
