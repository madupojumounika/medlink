import { patientRepository } from "../repositories/patient.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { PATIENT_STATUS } from "../constants/referral.js";

class PatientService {
  async createPatient(hospitalId, doctorId, patientData) {
    const newPatient = {
      ...patientData,
      currentHospitalId: hospitalId,
      createdByDoctorId: doctorId,
      status: PATIENT_STATUS.NEW,
    };
    const patient = await patientRepository.create(newPatient);
    return { message: "Patient created successfully", data: patient };
  }

  async getPatients(hospitalId, doctorId, query) {
    const filters = {};
    if (doctorId) {
      filters.createdByDoctorId = doctorId;
    }
    if (query.status) {
      filters.status = query.status;
    }
    const patients = await patientRepository.findAll(hospitalId, filters);
    return { message: "Patients retrieved successfully", data: patients };
  }

  async getPatientById(hospitalId, patientId) {
    const patient = await patientRepository.findById(patientId, hospitalId);
    if (!patient) {
      throw new ApiError(404, "Patient not found");
    }
    return { message: "Patient retrieved successfully", data: patient };
  }

  async updatePatient(hospitalId, patientId, updateData) {
    // Avoid overriding system fields
    delete updateData.currentHospitalId;
    delete updateData.createdByDoctorId;

    const patient = await patientRepository.update(patientId, hospitalId, updateData);
    if (!patient) {
      throw new ApiError(404, "Patient not found");
    }
    return { message: "Patient updated successfully", data: patient };
  }

  async deletePatient(hospitalId, patientId, userId) {
    const patient = await patientRepository.delete(patientId, hospitalId, userId);
    if (!patient) {
      throw new ApiError(404, "Patient not found");
    }
    return { message: "Patient deleted successfully", data: patient };
  }

  async forwardToCoordinator(hospitalId, doctorId, patientId, referralData) {
    const patient = await patientRepository.findById(patientId, hospitalId);
    if (!patient) {
      throw new ApiError(404, "Patient not found");
    }
    if (patient.status === PATIENT_STATUS.REFERRED_TO_COORDINATOR) {
      throw new ApiError(400, "Patient is already referred to coordinator");
    }

    const result = await patientRepository.forwardToCoordinator(patientId, hospitalId, doctorId, referralData);
    return { message: "Patient forwarded to coordinator successfully", data: result };
  }
}

export const patientService = new PatientService();
