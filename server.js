if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const app = express();
const client = require("./db");
const routes = require("./routes/index");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", routes);

async function main() {
  try {
    await client.connect();
    console.log("✅ Mongo connected");

    app.listen(PORT, () => {
      console.log("Web Server is listening at port " + PORT);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main().catch(console.error);
