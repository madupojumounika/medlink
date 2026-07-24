import mongoose from "mongoose";

const doctorProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    shift: {
      type: String,
      trim: true,
    },
    photoUrl: {
      type: String,
      trim: true,
    },
    qualifications: {
      type: [String],
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    opTimings: {
      type: String,
      trim: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    experience: {
      type: Number,
      min: 0,
    },
    department: {
      type: String,
      trim: true,
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

doctorProfileSchema.index({ hospitalId: 1 });

export default mongoose.model("DoctorProfile", doctorProfileSchema);

