import mongoose, { Schema, Document, Model } from "mongoose";

// =========================
// INTERFACE
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
    pool: boolean;
    capacity: number;
  };

  pricing: {
    daily: number;
    monthly?: number;
  };

  rating: number;

  views: number;

  status: "available" | "reserved" | "inactive";

  owner?: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

// =========================
// SCHEMA
// =========================

const PropertySchema = new Schema<IProperty>(
  {
    // =========================
    // BASIC
    // =========================

    title: {
      type: String,
      required: [true, "عنوان ملک الزامی است"],
      trim: true,
      minlength: 3,
      maxlength: 150,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    },

    type: {
      type: String,
      enum: ["apartment", "villa", "house", "hotel", "suite"],
      default: "villa",
    },

    // =========================
    // LOCATION
    // =========================

    location: {
      city: {
        type: String,
        required: true,
        trim: true,
      },

      address: {
        type: String,
        required: true,
        trim: true,
      },
    },

    // =========================
    // IMAGES
    // =========================

    images: {
      type: [String],
      default: [],
    },

    // =========================
    // FACILITIES
    // =========================

    facilities: {
      bedrooms: {
        type: Number,
        default: 0,
        min: 0,
      },

      bathrooms: {
        type: Number,
        default: 0,
        min: 0,
      },

      parking: {
        type: Boolean,
        default: false,
      },

      pool: {
        type: Boolean,
        default: false,
      },

      capacity: {
        type: Number,
        default: 1,
        min: 1,
      },
    },

    // =========================
    // PRICING
    // =========================

    pricing: {
      daily: {
        type: Number,
        required: [true, "قیمت روزانه الزامی است"],
        min: 0,
      },

      monthly: {
        type: Number,
        min: 0,
      },
    },

    // =========================
    // RATING
    // =========================

    rating: {
      type: Number,

      default: 0,

      min: 0,

      max: 5,
    },

    // =========================
    // POPULARITY
    // =========================

    views: {
      type: Number,

      default: 0,

      min: 0,
    },

    // =========================
    // STATUS
    // =========================

    status: {
      type: String,

      enum: ["available", "reserved", "inactive"],

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

  {
    timestamps: true,
  },
);

// =========================
// INDEXES
// =========================

// سرچ سریع
PropertySchema.index({
  title: "text",
  "location.city": "text",
  "location.address": "text",
});

// مرتب سازی محبوب ترین
PropertySchema.index({
  views: -1,
});

// مرتب سازی ارزان ترین
PropertySchema.index({
  "pricing.daily": 1,
});

// فیلتر شهر
PropertySchema.index({
  "location.city": 1,
});

// =========================
// MODEL
// =========================

const Property: Model<IProperty> =
  mongoose.models.Property ||
  mongoose.model<IProperty>("Property", PropertySchema);

export default Property;
