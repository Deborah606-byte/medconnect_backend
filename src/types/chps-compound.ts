import { z } from "zod";
import { chpsCompoundSchema } from "../zschemas/chps-compound";

export type ChpsCompundData = z.infer<typeof chpsCompoundSchema>;
