import dotenv from "dotenv";
import { z } from "zod";

const EnvSchema = z.object({
  PORT: z.coerce.number(),
  ATLAS_URI: z.string(),
  JWT_SECRET: z.string(),
  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.coerce.number(),
  EMAIL_USER: z.string(),
  EMAIL_PASSWORD: z.string(),
});

dotenv.config();

try {
  EnvSchema.parse(process.env);
  console.log("passed");
} catch (err) {
  console.log(err);
  process.exit(1);
}

export const config = EnvSchema.parse(process.env);
