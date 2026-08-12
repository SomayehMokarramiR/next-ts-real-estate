import mongoose, { Schema, Document, Model } from "mongoose";

// =========================
// INTERFACE
// =========================

export interface IProperty extends Document {
  title: string;

  description?: string;

  type: "apartment" | "villa" | "house" | "hotel" | "suite";

  // نوع معامله
  transactionType: "rent" | "mortgage" | "rent-mortgage" | "sale";

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

  // متراژ ملک
  area: number;

  pricing: {
    daily: number;
    monthly?: number;
    mortgage?: number;
    oldPrice?: number;
  };

  rating: number;

  views: number;

  // Featured
  isFeatured: boolean;

  featuredOrder: number;

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
    // TRANSACTION TYPE
    // =========================

    transactionType: {
      type: String,
      enum: ["rent", "mortgage", "rent-mortgage", "sale"],
      default: "rent",
      required: true,
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
    // AREA
    // =========================

    area: {
      type: Number,
      required: [true, "متراژ ملک الزامی است"],
      min: 1,
    },

    // =========================
    // PRICING
    // =========================

    pricing: {
      // قیمت روزانه
      daily: {
        type: Number,
        required: [true, "قیمت روزانه الزامی است"],
        min: 0,
      },

      // اجاره ماهانه
      monthly: {
        type: Number,
        min: 0,
      },

      // مبلغ رهن
      mortgage: {
        type: Number,
        min: 0,
      },

      // قیمت قبلی
      oldPrice: {
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
    // FEATURED
    // =========================

    isFeatured: {
      type: Boolean,
      default: false,
    },

    featuredOrder: {
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

PropertySchema.index({
  title: "text",
  "location.city": "text",
  "location.address": "text",
});

PropertySchema.index({
  views: -1,
});

PropertySchema.index({
  "pricing.daily": 1,
});

PropertySchema.index({
  "pricing.monthly": 1,
});

PropertySchema.index({
  "pricing.mortgage": 1,
});

PropertySchema.index({
  "location.city": 1,
});

PropertySchema.index({
  transactionType: 1,
});

PropertySchema.index({
  area: 1,
});

// برای صفحه بهترین‌ها
PropertySchema.index({
  isFeatured: 1,
  featuredOrder: 1,
});

// =========================
// MODEL
// =========================

const Property: Model<IProperty> =
  mongoose.models.Property ||
  mongoose.model<IProperty>("Property", PropertySchema);

export default Property;
