const router = require('express').Router();
const brCtrl = require('../controllers/battleRoyale');
const {
  validateGameId,
  validateGameData,
  handleValidationErrors,
} = require('../middlewares/validation');

router.get('/', brCtrl.getAll);
router.get('/:id', validateGameId, brCtrl.getById);
router.post('/', validateGameData, handleValidationErrors, brCtrl.createGame);
router.put(
  '/:id',
  validateGameId,
  validateGameData,
  handleValidationErrors,
  brCtrl.updateGame,
);
router.delete('/:id', validateGameId, brCtrl.deleteGame);

module.exports = router;
