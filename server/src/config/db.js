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
    if (error.code === "ENOTFOUND" || error.syscall === "querySrv") {
      console.error("\n[MongoDB Troubleshooting Tips]:");
      console.error("1. MongoDB Atlas Cluster Status: Verify your cluster is not PAUSED in cloud.mongodb.com.");
      console.error("2. IP Whitelist: In Atlas -> Network Access, ensure 0.0.0.0/0 (Allow from anywhere) is added.");
      console.error("3. Render MONGO_URI: Ensure the URI matches your cluster and password does not contain unencoded special characters.");
      console.error("4. Non-SRV format: You can also use the standard replica set connection string instead of mongodb+srv://\n");
    }
    process.exit(1);
  }
};
