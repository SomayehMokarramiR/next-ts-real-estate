import mongoose from "mongoose";

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  if (mongoose.connection.readyState >= 1) {
    return mongoose;
  }

  await mongoose.connect(String(MONGODB_URI));

  return mongoose;
}
