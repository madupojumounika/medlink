import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("✓ Database Connected");
  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error);
    process.exit(1);
  }
};
