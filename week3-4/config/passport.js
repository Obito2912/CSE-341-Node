const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NODE_ENV,
  GOOGLE_CALLBACK_URL,
} = process.env;
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const callbackURL =
  NODE_ENV === 'production'
    ? GOOGLE_CALLBACK_URL
    : 'http://localhost:3003/google/callback';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL,
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => done(null, profile),
  ),
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

module.exports = passport;
