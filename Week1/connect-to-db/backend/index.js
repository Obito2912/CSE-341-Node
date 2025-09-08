require("dotenv").config();
const express = require("express");
const app = express();
const mainRouter = require("./routes/index");
const PORT = process.env.PORT;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
