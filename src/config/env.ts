import dotenv from "dotenv";
import { z } from "zod";

const EnvSchema = z.object({
  PORT: z.coerce.number(),
  ATLAS_URI: z.string(),
});

dotenv.config();

try {
  EnvSchema.parse(process.env);
  console.log("passed");
} catch (err) {
  console.log(err);
  process.exit(1);
}

const env = EnvSchema.parse(process.env);
export const config = { PORT: env.PORT, ATLAS_URI: env.ATLAS_URI };
