import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  text: string;
  author: string;
  date: string;
  time: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Review ||
  mongoose.model<IReview>("Review", ReviewSchema);
