import { z } from "zod";
import { roleSchema, staffSchema } from "../db/schemas/staff";
import { userSchema, loginDataSchema } from "../db/schemas/user";
import { chpsCompoundSchema } from "../db/schemas/chps-compound";

type ChpsData = z.infer<typeof chpsCompoundSchema>;
export type LoginData = z.infer<typeof loginDataSchema>;
export type UserData = z.infer<typeof userSchema>;
export type RoleData = z.infer<typeof roleSchema>;
export type StaffData = z.infer<typeof staffSchema>;
export type ChpsCompundData = ChpsData & Omit<UserData, "chpsCompoundId">;
export type TokenData = { user: string; staff: string; role: string };
