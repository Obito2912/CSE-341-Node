const { ObjectId } = require('mongodb');
const { body, validationResult } = require('express-validator');

const validateMongoId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Id format' });
  }
  return next();
};

const createContactValidationRules = [
  body('firstName')
    .isString()
    .isLength({ min: 2, max: 50 })
    .notEmpty()
    .withMessage('First name is required'),
  body('lastName')
    .isString()
    .isLength({ min: 2, max: 50 })
    .notEmpty()
    .withMessage('Last name is required'),
  body('email').isEmail().notEmpty().withMessage('Valid email is required'),
  body('favoriteColor')
    .isString()
    .notEmpty()
    .withMessage('Favorite color is required'),
  body('birthday')
    .isISO8601()
    .isBefore(new Date().toISOString().split('T')[0])
    .notEmpty()
    .withMessage('Birthday is required and must be a valid date in the past'),
];

const updateContactValidationRules = [
  body('firstName')
    .optional()
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .optional()
    .isString()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('favoriteColor')
    .optional()
    .isString()
    .withMessage('Favorite color must be a string'),
  body('birthday')
    .optional()
    .isISO8601()
    .isBefore(new Date().toISOString().split('T')[0])
    .withMessage('Birthday must be a valid date in the past'),
];

const validateContact = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};

module.exports = {
  validateMongoId,
  createContactValidationRules,
  updateContactValidationRules,
  validateContact,
};
