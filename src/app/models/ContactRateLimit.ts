import mongoose, { HydratedDocument, Model, Schema } from "mongoose";

export interface IContactRateLimit {
  ip: string;
  count: number;
  windowStart: Date;
}

export type ContactRateLimitDocument = HydratedDocument<IContactRateLimit>;

const ContactRateLimitSchema = new Schema<IContactRateLimit>(
  {
    ip: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    count: {
      type: Number,
      required: true,
      default: 0,
    },

    windowStart: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const ContactRateLimit: Model<IContactRateLimit> =
  (mongoose.models.ContactRateLimit as Model<IContactRateLimit>) ||
  mongoose.model<IContactRateLimit>("ContactRateLimit", ContactRateLimitSchema);

export default ContactRateLimit;
