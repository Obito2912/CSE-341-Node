if (process.env.NODE_ENV !== "production") require("dotenv").config();

require("dotenv").config();
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);

module.exports = client;
