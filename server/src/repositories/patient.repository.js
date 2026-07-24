import Patient from "../models/Patient.model.js";
import Referral from "../models/Referral.model.js";
import { PATIENT_STATUS, REFERRAL_STATUS } from "../constants/referral.js";

class PatientRepository {
  async create(patientData) {
    const patient = new Patient(patientData);
    return await patient.save();
  }

  async findById(patientId, hospitalId) {
    return await Patient.findOne({
      _id: patientId,
      currentHospitalId: hospitalId,
      isActive: true,
    }).populate("createdByDoctorId", "fullName email");
  }

  async findAll(hospitalId, filters = {}) {
    const query = { currentHospitalId: hospitalId, isActive: true, ...filters };
    return await Patient.find(query)
      .populate("createdByDoctorId", "fullName email")
      .sort({ createdAt: -1 });
  }

  async update(patientId, hospitalId, updateData) {
    return await Patient.findOneAndUpdate(
      { _id: patientId, currentHospitalId: hospitalId, isActive: true },
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }

  async delete(patientId, hospitalId, userId) {
    return await Patient.findOneAndUpdate(
      { _id: patientId, currentHospitalId: hospitalId, isActive: true },
      { $set: { isActive: false, deletedAt: new Date(), deletedBy: userId } },
      { new: true }
    );
  }

  async forwardToCoordinator(patientId, hospitalId, doctorId, referralData) {
    const session = await Patient.startSession();
    session.startTransaction();

    try {
      // 1. Update Patient Status
      const patient = await Patient.findOneAndUpdate(
        { _id: patientId, currentHospitalId: hospitalId, isActive: true },
        { $set: { status: PATIENT_STATUS.REFERRED_TO_COORDINATOR } },
        { new: true, session }
      );

      if (!patient) {
        throw new Error("Patient not found or inactive");
      }

      // 2. Create Referral Document
      const referral = new Referral({
        patientId,
        doctorId,
        fromHospitalId: hospitalId,
        severity: patient.severity,
        priority: referralData.priority || "Normal",
        diagnosis: patient.diagnosis || "Pending Diagnosis",
        status: REFERRAL_STATUS.PENDING,
        statusHistory: [
          {
            status: REFERRAL_STATUS.PENDING,
            updatedBy: doctorId,
            remarks: "Forwarded to Referral Coordinator",
          }
        ],
        notes: patient.doctorNotes
      });

      await referral.save({ session });

      await session.commitTransaction();
      session.endSession();

      return { patient, referral };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}

export const patientRepository = new PatientRepository();
