import { patientRepository } from "../repositories/patient.repository.js";
import { ApiError } from "../utils/ApiError.js";

class PatientService {
  async createPatient(patientData) {
    const patient = await patientRepository.createPatient(patientData);
    return { message: "Patient created successfully", data: patient };
  }

  async getAllPatients() {
    const patients = await patientRepository.getAllPatients();
    return { message: "Patients retrieved successfully", data: patients };
  }

  async getPatientById(id) {
    const patient = await patientRepository.getPatientById(id);
    if (!patient) {
      throw new ApiError(404, "Patient not found");
    }
    return { message: "Patient retrieved successfully", data: patient };
  }

  async updatePatient(id, updateData) {
    const patient = await patientRepository.updatePatient(id, updateData);
    if (!patient) {
      throw new ApiError(404, "Patient not found");
    }
    return { message: "Patient updated successfully", data: patient };
  }

  async deletePatient(id) {
    const patient = await patientRepository.deletePatient(id);
    if (!patient) {
      throw new ApiError(404, "Patient not found");
    }
    return { message: "Patient deleted successfully", data: patient };
  }
}

export const patientService = new PatientService();
