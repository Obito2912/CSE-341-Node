const { ObjectId } = require('mongodb');
const { body, validationResult } = require('express-validator');

const validateGameId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid Id format.' });
  }
  next();
};

const validateGameData = [
  body('name').notEmpty().withMessage('Name is required.'),
  body('genre').notEmpty().withMessage('Genre is required.'),
  body('developer').notEmpty().withMessage('Developer is required.'),
  body('releaseDate')
    .notEmpty()
    .withMessage('Release Date is required.')
    .isISO8601()
    .toDate()
    .withMessage('Release Date must be a valid date.'),
  body('platforms')
    .isArray({ min: 1 })
    .withMessage('Platforms must be an array with at least one platform.'),
  body('rating')
    .isFloat({ min: 1, max: 10 })
    .withMessage('Rating must be a number between 1 and 10.'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number.'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateGameId,
  validateGameData,
  handleValidationErrors,
};
