import { z } from "zod";
import { STAFF_ROLES } from "../config/constants";
import { adminSchema, createAdminSchema } from "../db/schemas/admin";
import { roleSchema, staffSchema } from "../db/schemas/staff";
import { userSchema, resetPasswordDataSchema } from "../db/schemas/user";
import { chpsCompoundSchema } from "../db/schemas/chps-compound";

type ChpsData = z.infer<typeof chpsCompoundSchema>;
export type AdminData = z.infer<typeof adminSchema>;
export type CreateAdminData = z.infer<typeof createAdminSchema>;
export type LoginData = z.infer<typeof userSchema>;
export type UserData = z.infer<typeof userSchema>;
export type RoleData = z.infer<typeof roleSchema>;
export type StaffData = z.infer<typeof staffSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordDataSchema>;
export type ChpsCompundData = ChpsData & UserData;
export type TokenData = {
  user: string;
  staff: string;
  role: (typeof STAFF_ROLES)[number];
};
