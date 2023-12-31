import app from "./app";
import config from "config";
const mongoose = require("mongoose");

const port = config.get("app.port");
(async () => {
  await mongoose.connect(config.get("mongodb.url"));

  app().listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
  });
})().catch((err) => {
  console.log("Error " + err);
  process.exit(1);
});
