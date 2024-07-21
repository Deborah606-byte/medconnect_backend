import type { Request } from "express";
import type { TokenData } from "./chps-compound";

declare module "express-serve-static-core" {
  interface Request {
    auth?: TokenData;
    fileUrl?: string;
  }
}
