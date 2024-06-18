import { z } from "zod";
import { chpsCompoundSchema } from "../db/schemas/chps-compound";

export type ChpsCompundData = z.infer<typeof chpsCompoundSchema>;
