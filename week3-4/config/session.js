const session = require('express-session');
const passport = require('passport');

const { SESSION_SECRET } = process.env;

const sessionConfig = (app) => {
  // Set up session management
  app.use(session({ secret: SESSION_SECRET }));
  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = sessionConfig;
