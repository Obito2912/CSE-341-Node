const express = require("express");

const mongodb = require("./data/database");
const app = express();
const mainRoute = require("./routes/index");

const PORT = process.env.PORT || 3003;

app.use("/", mainRoute);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  }
  app.listen(PORT, () => {
    console.log(`Database is listening and node is running on port: ${PORT}`);
  });
});
