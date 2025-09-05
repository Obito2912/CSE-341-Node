if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const app = express();
const client = require("./db");
const routes = require("./routes");

const PORT = process.env.PORT;

app.use(express.json());
app.use("/", routes);

async function main() {
  try {
    await client.connect();
    console.log("✅ Mongo connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log("Web Server is listening at port " + PORT);
    });
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
