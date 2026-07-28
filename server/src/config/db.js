import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("✓ Database Connected");
    try {
      await mongoose.connection.collection("doctorprofiles").dropIndex("registrationNumber_1");
    } catch (e) {}
    try {
      await mongoose.connection.collection("users").dropIndex("email_1");
      await mongoose.connection.collection("users").dropIndex("username_1");
    } catch (e) {}
  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error);
    process.exit(1);
  }
};
