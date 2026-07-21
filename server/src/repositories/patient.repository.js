import Patient from "../models/Patient.model.js";

class PatientRepository {
  async createPatient(patientData) {
    const patient = new Patient(patientData);
    return await patient.save();
  }

  async getAllPatients(query = {}) {
    return await Patient.find(query);
  }

  async getPatientById(id) {
    return await Patient.findById(id);
  }

  async updatePatient(id, updateData) {
    return await Patient.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  async deletePatient(id) {
    return await Patient.findByIdAndDelete(id);
  }
}

export const patientRepository = new PatientRepository();
