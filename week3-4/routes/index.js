const router = require('express').Router();

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');

// Import route modules
const battleRoyaleRoutes = require('./battleRoyale');
const rpgRoutes = require('./rpg');

// Authentication middleware
const isLoggedIn = require('../middlewares/auth');

// Public routes (no authentication required)
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Protected routes (authentication required)
router.use('/battle-royale', isLoggedIn, battleRoyaleRoutes);
router.use('/rpg', isLoggedIn, rpgRoutes);

module.exports = router;
