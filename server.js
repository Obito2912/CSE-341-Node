const express = require("express");
const app = express();
const client = require("./db");

const port = 3000;

async function main() {
  // We'll add code here soon
  try {
    await client.connect();
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` -${db.name}`));
}

app.listen(process.env.port || port);
console.log("Web Server is listening at port " + (process.env.port || port));
