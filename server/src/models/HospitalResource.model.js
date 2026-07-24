import mongoose from "mongoose";

const hospitalResourceSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
      unique: true,
    },
    totalICUBeds: {
      type: Number,
      default: 0,
      min: 0,
    },
    availableICUBeds: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalGeneralBeds: {
      type: Number,
      default: 0,
      min: 0,
    },
    availableGeneralBeds: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalEmergencyBeds: {
      type: Number,
      default: 0,
      min: 0,
    },
    availableEmergencyBeds: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalVentilators: {
      type: Number,
      default: 0,
      min: 0,
    },
    availableVentilators: {
      type: Number,
      default: 0,
      min: 0,
    },
    availableDoctors: {
      type: Number,
      default: 0,
      min: 0,
    },
    bloodUnits: {
      type: Number,
      default: 0,
      min: 0,
    },
    nursesCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    operationTheatres: {
      type: Number,
      default: 0,
      min: 0,
    },
    availableAmbulances: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("HospitalResource", hospitalResourceSchema);
