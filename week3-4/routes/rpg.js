const router = require('express').Router();
const rpgCtrl = require('../controllers/rpg');
const {
  validateGameId,
  validateGameData,
  handleValidationErrors,
} = require('../middlewares/validation');

router.get('/', rpgCtrl.getAll);
router.get('/:id', validateGameId, rpgCtrl.getById);
router.post('/', validateGameData, handleValidationErrors, rpgCtrl.createGame);
router.put(
  '/:id',
  validateGameId,
  validateGameData,
  handleValidationErrors,
  rpgCtrl.updateGame,
);
router.delete('/:id', validateGameId, rpgCtrl.deleteGame);

module.exports = router;
