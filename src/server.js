const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const { dbConnect } = require("./config/db");
const { config } = require("./config/env");
const { api } = require("./routes/index");
const { URLS, CORS_OPTIONS } = require("./data/constants");

const app = express();

app.use(express.json());
app.use(cors(CORS_OPTIONS));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("common"));
app.use(URLS.root, api);

dbConnect().then((status) => {
  if (!status) return process.exit(1);

  app.listen(config.PORT, () =>
    console.log(`"server up on port: ${config.PORT}`)
  );
});
