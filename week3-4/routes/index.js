const router = require('express').Router();
const battleRoyaleRoutes = require('./battleRoyale');
const rpgRoutes = require('./rpg');

router.use('/battle-royale', battleRoyaleRoutes);
router.use('/rpg', rpgRoutes);

module.exports = router;
