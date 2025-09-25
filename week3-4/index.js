require('dotenv').config();
require('./config/passport');

// Destructure environment variables
const { PORT } = process.env;

// Import dependencies and modules
const express = require('express');
const sessionConfig = require('./config/session');
const mongodb = require('./data/database');
const mainRoute = require('./routes/index');
const authRoute = require('./routes/auth');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up session management
sessionConfig(app);

// Routes
app.use('/', authRoute);
app.use('/', mainRoute);

// Start the server after initializing the database
const startServer = async () => {
  try {
    await mongodb.initDb();
    app.listen(PORT, () => {
      console.log(`Database is listening and node is running on port: ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
