const { NODE_ENV, PORT } = process.env;

const homePageController = (req, res) => {
  res.send(
    `<h1>Home Page</h1>\
    <a href="/auth/google">Authenticate with Google</a>
    <h2>API Documentation</h2>
    <a href="/api-docs">API Documentation</a>
    <h2>If you are logged in, you now have access to:</h2>
    
    <a href="/battle-royale">Battle Royale</a><br/>
    <a href="/rpg">RPG</a>`,
  );
};

const handleGoogleCallback = (req, res) => {
  // Successful authentication - redirect based on environment
  const baseUrl =
    NODE_ENV === 'production'
      ? 'https://cse-341-node-1.onrender.com'
      : `http://localhost:${PORT}`;
  res.redirect(`${baseUrl}`);
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Logout failed');
    }

    return req.session.destroy((destroyErr) => {
      if (destroyErr) {
        return res.status(500).send('Session destruction failed');
      }
      return res.redirect('/');
    });
  });
};

module.exports = {
  handleGoogleCallback,
  logout,
  homePageController,
};
