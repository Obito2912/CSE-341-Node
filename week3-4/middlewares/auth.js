// Middleware to check if user is authenticated
const isLoggedIn = (req, res, next) =>
  req.user ? next() : res.sendStatus(401);

module.exports = isLoggedIn;
