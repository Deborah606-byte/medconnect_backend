import { z } from "zod";

const chpsCompoundSchema = z.object({
  name: z.string().min(6),
  email: z.string().email(),
  password: z.string().min(8),
  location: z.string(),
});

export { chpsCompoundSchema };
