import mongoose from "mongoose";
import { env } from "./src/config/env.js";
import { referralService } from "./src/services/referral.service.js";
import { authService } from "./src/services/auth.service.js";

async function test() {
  await mongoose.connect(env.MONGO_URI);
  console.log("Connected to DB");
  
  // Find a referral to accept
  const Referral = (await import("./src/models/Referral.model.js")).default;
  const referral = await Referral.findOne({ status: "Sent To Hospital" });
  if (!referral) {
    console.log("No referral found in Sent To Hospital state");
    process.exit(0);
  }
  
  console.log("Testing accept on referral:", referral._id);
  try {
    const res = await referralService.acceptReferral(referral.toHospitalId, referral.coordinatorId || referral.doctorId, referral._id, "Test remark");
    console.log("Success:", res);
  } catch (err) {
    console.error("Error:", err);
  }
  process.exit(0);
}
test();
