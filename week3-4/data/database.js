const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();
let database;

const initDb = async () => {
  if (database) {
    console.log('Database is already initialized!');
    return database;
  }
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    database = client.db();
    console.log('Connected to the database!');
    return database;
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    throw err;
  }
};

const getDb = () => {
  if (!database) {
    throw new Error('Database is not initialized. Call initDb first.');
  }
  return database;
};

module.exports = {
  initDb,
  getDb,
};
