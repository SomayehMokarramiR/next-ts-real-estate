import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../src/app/models/User";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/realestate";

async function seedUsers() {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB connected");

    const password = await bcrypt.hash("123456789", 12);

    const users = [
      {
        name: "Admin",
        lastName: "User",
        email: "admin@test.com",
        password,
        phoneNumber: "09120000001",
        role: "admin",
      },
      {
        name: "Ali",
        lastName: "Ahmadi",
        email: "ali@test.com",
        password,
        phoneNumber: "09120000002",
        role: "user",
      },
      {
        name: "Sara",
        lastName: "Mohammadi",
        email: "sara@test.com",
        password,
        phoneNumber: "09120000003",
        role: "user",
      },
      {
        name: "Reza",
        lastName: "Rezaee",
        email: "reza@test.com",
        password,
        phoneNumber: "09120000004",
        role: "user",
      },
    ];

    for (const user of users) {
      const existingUser = await User.findOne({
        email: user.email,
      });

      if (existingUser) {
        console.log(`Skipped: ${user.email}`);
        continue;
      }

      await User.create(user);

      console.log(`Created: ${user.email}`);
    }

    console.log("Seed completed successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.error("SEED ERROR:", error);

    await mongoose.disconnect();

    process.exit(1);
  }
}

seedUsers();
