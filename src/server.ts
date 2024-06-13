import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { config } from "./config/env";
import { dbConnect } from "./config/db";
import { URLS, CORS_OPTIONS } from "./config/constants";
import { api } from "./routes/index";
import { rlogger } from "./utils/logger";

const app = express();

app.use(express.json());
app.use(cors(CORS_OPTIONS));
app.use(cookieParser());
app.use(helmet());
app.use(rlogger);
app.use(URLS.root, api);

dbConnect().then((status) => {
  if (!status) return process.exit(1);

  app.listen(config.PORT, () =>
    console.log(`server up on port: ${config.PORT}`)
  );
});
