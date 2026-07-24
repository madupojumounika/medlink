import User from '../models/User.model.js';
import Hospital from '../models/Hospital.model.js';
import Patient from '../models/Patient.model.js';
import Referral from '../models/Referral.model.js';
import mongoose from 'mongoose';

class AdminRepository {
  async getDashboard() {
    // Execute aggregations in parallel
    const [userStats, hospitalStats, patientStats, referralData, recentActivity] = await Promise.all([
      User.aggregate([
        {
          $facet: {
            doctors: [{ $match: { role: 'doctor', isActive: true } }, { $count: 'count' }],
            ambulances: [{ $match: { role: 'ambulance', isActive: true } }, { $count: 'count' }],
            ambulanceStatus: [
              { $match: { role: 'ambulance', isActive: true } },
              { $group: { _id: '$isAvailable', count: { $sum: 1 } } }
            ]
          }
        }
      ]),
      Hospital.aggregate([{ $match: { isActive: true } }, { $count: 'count' }]),
      Patient.aggregate([{ $match: { isActive: true } }, { $count: 'count' }]),
      Referral.aggregate([
        { $match: { isActive: true } },
        {
          $facet: {
            statusCounts: [
              { $group: { _id: '$status', count: { $sum: 1 } } }
            ],
            severityCounts: [
              { $group: { _id: '$severity', count: { $sum: 1 } } }
            ],
            priorityCounts: [
              { $group: { _id: '$aiPriorityAssessment.priority', count: { $sum: 1 } } }
            ],
            ambulanceStatusCounts: [
              { $match: { ambulanceStatus: { $exists: true } } },
              { $group: { _id: '$ambulanceStatus', count: { $sum: 1 } } }
            ],
            hospitalCounts: [
              { $match: { toHospitalId: { $exists: true } } },
              { $group: { _id: '$toHospitalId', count: { $sum: 1 } } }
            ]
          }
        }
      ]),
      Referral.find({ isActive: true })
        .sort({ createdAt: -1 })
        .limit(10)
        .populate('patientId', 'name')
        .populate('fromHospitalId', 'hospitalName')
        .populate('toHospitalId', 'hospitalName')
        .lean()
    ]);

    return {
      userStats: userStats[0],
      hospitalStats: hospitalStats[0],
      patientStats: patientStats[0],
      referralData: referralData[0],
      recentActivity,
    };
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
