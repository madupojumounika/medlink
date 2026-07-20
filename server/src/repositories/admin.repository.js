class AdminRepository {
  async getDashboard() {
    throw new Error('Method not implemented: getDashboard');
  }

  async getUsers(filters, pagination) {
    throw new Error('Method not implemented: getUsers');
  }

  async getUserById(id) {
    throw new Error('Method not implemented: getUserById');
  }

  async updateUser(id, updateData) {
    throw new Error('Method not implemented: updateUser');
  }

  async deleteUser(id) {
    throw new Error('Method not implemented: deleteUser');
  }

  async getDoctors(filters, pagination) {
    throw new Error('Method not implemented: getDoctors');
  }

  async getDoctorById(id) {
    throw new Error('Method not implemented: getDoctorById');
  }

  async updateDoctor(id, updateData) {
    throw new Error('Method not implemented: updateDoctor');
  }

  async getHospitals(filters, pagination) {
    throw new Error('Method not implemented: getHospitals');
  }

  async getHospitalById(id) {
    throw new Error('Method not implemented: getHospitalById');
  }

  async updateHospital(id, updateData) {
    throw new Error('Method not implemented: updateHospital');
  }

  async getAmbulances(filters, pagination) {
    throw new Error('Method not implemented: getAmbulances');
  }

  async getAmbulanceById(id) {
    throw new Error('Method not implemented: getAmbulanceById');
  }

  async updateAmbulance(id, updateData) {
    throw new Error('Method not implemented: updateAmbulance');
  }

  async getSettings() {
    throw new Error('Method not implemented: getSettings');
  }

  async updateSettings(settingsData) {
    throw new Error('Method not implemented: updateSettings');
  }

  async getReports(reportType, startDate, endDate) {
    throw new Error('Method not implemented: getReports');
  }
}

export default new AdminRepository();
