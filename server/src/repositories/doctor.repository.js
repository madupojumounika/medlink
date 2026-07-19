export class DoctorRepository {
  async getDoctorProfile(doctorId) {
    return null;
  }

  async updateDoctorProfile(doctorId, updateData) {
    return null;
  }

  async createPatient(doctorId, patientData) {
    return null;
  }

  async getPatients(doctorId) {
    return null;
  }

  async getPatientById(doctorId, patientId) {
    return null;
  }

  async updatePatient(doctorId, patientId, updateData) {
    return null;
  }

  async createReferral(doctorId, referralData) {
    return null;
  }

  async getReferrals(doctorId) {
    return null;
  }

  async getReferralById(doctorId, referralId) {
    return null;
  }
}

export const doctorRepository = new DoctorRepository();
