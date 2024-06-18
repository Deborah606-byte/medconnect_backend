import { z } from "zod";
import { STAFF_ROLES } from "../../config/constants";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  chpsId: z.string(),
});

const roleSchema = z.object({
  type: z.enum(STAFF_ROLES),
  staffId: z.string(),
});

export { userSchema, roleSchema };
