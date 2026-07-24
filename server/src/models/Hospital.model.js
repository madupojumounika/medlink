import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      trim: true,
    },
    licenseDetails: {
      type: String,
      trim: true,
    },
    workingHours: {
      type: String,
      trim: true,
      default: "24/7",
    },
    emergencyContact: {
      type: String,
      trim: true,
    },
    hospitalName: {
      type: String,
      required: true,
      trim: true,
    },
    hospitalCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
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

hospitalSchema.index({ location: "2dsphere" });

export default mongoose.model("Hospital", hospitalSchema);

