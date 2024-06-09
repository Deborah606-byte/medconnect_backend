const express = require("express");
const { dbConnect } = require("./config/db");
const { config } = require("./config/env");
const { api } = require("./routes/index");
const { URLS } = require("./data/constants");

const app = express();

app.use(express.json());
app.use(URLS.root, api);

dbConnect().then((status) => {
  if (!status) return process.exit(1);

  app.listen(config.PORT, () =>
    console.log(`"server up on port: ${config.PORT}`)
  );
});
