import mongoose, { Document, Schema } from "mongoose";

export type BlogStatus = "draft" | "published";

export interface IBlog extends Document {
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  minutes: number;
  isFree: boolean;
  date: string;
  views: number;
  status: BlogStatus;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    minutes: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },

    isFree: {
      type: Boolean,
      default: true,
    },

    date: {
      type: String,
      required: true,
    },

    views: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Blog ||
  mongoose.model<IBlog>("Blog", BlogSchema);
