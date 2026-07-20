import { Router } from 'express';
import adminController from '../controllers/admin.controller.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorize } from '../middleware/authorize.js';
import { validate } from '../middleware/validate.js';
import {
  validateUserUpdate,
  validateSystemSettings,
  validateReports,
} from '../validations/admin.validation.js';

const router = Router();

// Protect all admin routes
router.use(authenticate);
router.use(authorize('admin'));

// Dashboard
router.get('/dashboard', adminController.getDashboard);

// Users
router.get('/users', adminController.getUsers);
router.get('/users/:id', adminController.getUserById);
router.put(
  '/users/:id',
  validate(validateUserUpdate),
  adminController.updateUser
);
router.delete('/users/:id', adminController.deleteUser);

// Doctors
router.get('/doctors', adminController.getDoctors);
router.get('/doctors/:id', adminController.getDoctorById);
router.put('/doctors/:id', adminController.updateDoctor);

// Hospitals
router.get('/hospitals', adminController.getHospitals);
router.get('/hospitals/:id', adminController.getHospitalById);
router.put('/hospitals/:id', adminController.updateHospital);

// Ambulances
router.get('/ambulances', adminController.getAmbulances);
router.get('/ambulances/:id', adminController.getAmbulanceById);
router.put('/ambulances/:id', adminController.updateAmbulance);

// System Settings
router.get('/settings', adminController.getSettings);
router.put(
  '/settings',
  validate(validateSystemSettings),
  adminController.updateSettings
);

// Reports
router.get(
  '/reports',
  validate(validateReports),
  adminController.getReports
);

export default router;
