import { z } from "zod";
import { userSchema, roleSchema, staffSchema } from "../db/schemas/user";
import { chpsCompoundSchema } from "../db/schemas/chps-compound";

type ChpsData = z.infer<typeof chpsCompoundSchema>;
export type UserData = z.infer<typeof userSchema>;
export type RoleData = z.infer<typeof roleSchema>;
export type StaffData = z.infer<typeof staffSchema>;
export type ChpsCompundData = ChpsData & Omit<UserData, "chpsCompoundId">;
