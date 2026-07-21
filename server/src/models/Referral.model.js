import mongoose from "mongoose";
import { REFERRAL_STATUS, REFERRAL_SEVERITY, REFERRAL_PRIORITY } from "../constants/referral.js";

const referralSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
      index: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorProfile",
      required: true,
      index: true,
    },
    fromHospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
      index: true,
    },
    toHospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: false,
      index: true,
    },
    severity: {
      type: String,
      enum: Object.values(REFERRAL_SEVERITY),
      required: true,
    },
    priority: {
      type: String,
      enum: Object.values(REFERRAL_PRIORITY),
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(REFERRAL_STATUS),
      default: REFERRAL_STATUS.PENDING,
      index: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    acceptedAt: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    deletedAt: {
      type: Date,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Referral", referralSchema);

