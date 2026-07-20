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
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Patient", patientSchema);
