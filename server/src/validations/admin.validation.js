import { body, query, param } from 'express-validator';

export const validateUserUpdate = [
  param('id').notEmpty().withMessage('User ID is required'),
  body('fullName')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Full name must be between 2 and 50 characters'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone')
    .optional()
    .isString()
    .matches(/^\+?[\d\s-]{10,15}$/)
    .withMessage('Valid phone number is required'),
  body('role')
    .optional()
    .isIn(['patient', 'doctor', 'hospital', 'ambulance', 'admin'])
    .withMessage('Invalid role specified'),
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'suspended'])
    .withMessage('Invalid status specified'),
];

export const validateSystemSettings = [
  body('applicationName')
    .notEmpty()
    .withMessage('Application name is required')
    .isString()
    .trim(),
  body('maintenanceMode')
    .isBoolean()
    .withMessage('Maintenance mode must be a boolean'),
  body('supportEmail')
    .notEmpty()
    .withMessage('Support email is required')
    .isEmail()
    .withMessage('Valid support email is required'),
  body('emergencyContact')
    .notEmpty()
    .withMessage('Emergency contact is required')
    .isString()
    .trim(),
];

export const validateReports = [
  query('reportType')
    .notEmpty()
    .withMessage('Report type is required')
    .isString()
    .trim(),
  query('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Start date must be a valid ISO date'),
  query('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('End date must be a valid ISO date')
    .custom((value, { req }) => {
      if (new Date(value) < new Date(req.query.startDate)) {
        throw new Error('End date must be after or equal to start date');
      }
      return true;
    }),
];
