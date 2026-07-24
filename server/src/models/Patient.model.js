import mongoose from "mongoose";
import { PATIENT_STATUS, REFERRAL_SEVERITY } from "../constants/referral.js";

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
    bloodGroup: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    emergencyContact: {
      type: String,
      trim: true,
    },
    symptoms: {
      type: String,
      trim: true,
    },
    diagnosis: {
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
    severity: {
      type: String,
      enum: Object.values(REFERRAL_SEVERITY),
      default: REFERRAL_SEVERITY.LOW,
    },
    requiredResources: {
      needsICU: { type: Boolean, default: false },
      needsVentilator: { type: Boolean, default: false },
      needsBlood: { type: Boolean, default: false },
      needsOperationTheatre: { type: Boolean, default: false },
      needsGeneralBed: { type: Boolean, default: false },
    },
    vitals: {
      heartRate: { type: Number, min: 0, max: 300 },
      systolicBP: { type: Number, min: 0, max: 300 },
      diastolicBP: { type: Number, min: 0, max: 200 },
      spo2: { type: Number, min: 0, max: 100 },
      respiratoryRate: { type: Number, min: 0, max: 100 },
      temperature: { type: Number, min: 20.0, max: 45.0 }
    },
    aiAssessment: {
      severity: { type: String, enum: Object.values(REFERRAL_SEVERITY) },
      confidence: { type: Number },
      riskScore: { type: Number },
      recommendation: { type: String },
      predictionTimestamp: { type: Date }
    },
    hospitalRecommendation: {
      recommendedHospital: { type: String },
      recommendationScore: { type: Number },
      distanceKm: { type: Number },
      icuBedsAvailable: { type: Number },
      availableDoctors: { type: Number },
      specialty: { type: String },
      recommendationReasons: [{ type: String }],
      recommendationTimestamp: { type: Date, default: Date.now }
    },
    doctorNotes: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(PATIENT_STATUS),
      default: PATIENT_STATUS.NEW,
    },
    createdByDoctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currentHospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
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

patientSchema.index({ currentHospitalId: 1 });
patientSchema.index({ createdByDoctorId: 1 });
patientSchema.index({ status: 1 });

export default mongoose.model("Patient", patientSchema);

