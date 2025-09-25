const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/auth');

router.get('/', authController.homePageController);

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  authController.handleGoogleCallback,
);

router.get('/logout', authController.logout);

module.exports = router;
