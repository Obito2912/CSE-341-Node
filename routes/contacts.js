const router = require('express').Router();

const contactsController = require('../controllers/contacts');
const {
  validateMongoId,
  createContactValidationRules,
  updateContactValidationRules,
  validateContact,
} = require('../middleware/validation');

router.get('/', contactsController.getAll);

router.get('/:id', validateMongoId, contactsController.getSingle);

router.post(
  '/',
  createContactValidationRules,
  validateContact,
  contactsController.createContact,
);

router.put(
  '/:id',
  validateMongoId,
  updateContactValidationRules,
  validateContact,
  contactsController.updateContact,
);

router.delete('/:id', validateMongoId, contactsController.deleteContact);

module.exports = router;
