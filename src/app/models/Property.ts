import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProperty extends Document {
  title: string;

  description?: string;

  type:
    | "apartment"
    | "villa"
    | "house"
    | "hotel"
    | "suite"
    | "land"
    | "office"
    | "commercial";

  // نوع معامله
  transactionType: "rent" | "mortgage" | "rent-mortgage" | "sale" | "none";

  // نوع رزرو
  bookingType: "daily" | "monthly" | "none";

  images: string[];

  location: {
    city: string;
    address: string;
  };

  facilities: {
    bedrooms: number;
    bathrooms: number;
    parking: boolean;
    pool: boolean;
    capacity: number;
  };

  area: number;

  pricing: {
    salePrice?: number;
    daily: number;
    monthly?: number;
    mortgage?: number;
    oldPrice?: number;
    discount?: number;
  };

  mapPosition?: {
    top: string;
    left: string;
  };

  rating: number;

  views: number;

  status: "available" | "reserved" | "inactive";

  isFeatured?: boolean;

  featuredOrder?: number;

  createdAt: Date;

  updatedAt: Date;
}

const PropertySchema = new Schema<IProperty>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    type: {
      type: String,

      enum: [
        "apartment",
        "villa",
        "house",
        "hotel",
        "suite",
        "land",
        "office",
        "commercial",
      ],

      required: true,
    },

    transactionType: {
      type: String,

      enum: ["rent", "mortgage", "rent-mortgage", "sale", "none"],

      default: "none",

      required: true,
    },

    bookingType: {
      type: String,

      enum: ["daily", "monthly", "none"],

      default: "none",
    },

    images: [
      {
        type: String,
      },
    ],

    location: {
      city: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },
    },

    facilities: {
      bedrooms: {
        type: Number,
        default: 0,
      },

      bathrooms: {
        type: Number,
        default: 0,
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
        default: 0,
      },
    },

    area: {
      type: Number,

      default: 0,
    },

    pricing: {
      salePrice: {
        type: Number,
      },

      daily: {
        type: Number,
        default: 0,
      },

      monthly: {
        type: Number,
      },

      mortgage: {
        type: Number,
      },

      oldPrice: {
        type: Number,
      },

      discount: {
        type: Number,
      },
    },

    mapPosition: {
      top: {
        type: String,
        default: "50%",
      },

      left: {
        type: String,
        default: "50%",
      },
    },

    rating: {
      type: Number,

      default: 0,
    },

    views: {
      type: Number,

      default: 0,
    },

    status: {
      type: String,

      enum: ["available", "reserved", "inactive"],

      default: "available",
    },

    isFeatured: {
      type: Boolean,

      default: false,
    },

    featuredOrder: {
      type: Number,

      default: 0,
    },
  },

  {
    timestamps: true,
  },
);

// جلوگیری از مدل قدیمی در hot reload

if (mongoose.models.Property) {
  delete mongoose.models.Property;
}

const Property: Model<IProperty> = mongoose.model<IProperty>(
  "Property",
  PropertySchema,
);

export default Property;
