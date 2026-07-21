import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    bloodGroup: {
      type: String,
      trim: true,
    },
    allergies: [
      {
        type: String,
        trim: true,
      },
    ],
    existingConditions: [
      {
        type: String,
        trim: true,
      },
    ],
    createdByDoctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoctorProfile",
    },
    currentHospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },
    needsReferral: {
      type: Boolean,
      default: false,
      index: true,
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

patientSchema.index({ hospitalId: 1 });
patientSchema.index({ doctorId: 1 });

export default mongoose.model("Patient", patientSchema);

