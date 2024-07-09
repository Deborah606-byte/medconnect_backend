import mongoose from "mongoose";
import { logger } from "../utils/logger";
import type { ObjectId } from "mongodb";
import type { Document } from "mongoose";

interface CompoundResource extends Document {
  chpsCompoundId: ObjectId;
}

export class IDGenerator<T extends CompoundResource> {
  private prefix: string = "MDC";
  private modelName: string = "";
  private modelInstance: T;
  private currentId: string | undefined = undefined;
  private error: string = `Failed to generate id for ${this.modelName.toLowerCase()}`;

  constructor(name: string, instance: T, idx: string | undefined) {
    this.modelName = name;
    this.modelInstance = instance;
    this.currentId = idx;
  }

  private generateStaffId = async () => {
    try {
      const staffCount = await mongoose
        .model(this.modelName)
        .countDocuments({ chpsCompoundId: this.modelInstance.chpsCompoundId });
      const index = `${staffCount + 1}`.padStart(4, "0");
      this.currentId = `${this.prefix}S${index}`;
    } catch (err) {
      const { message } = err as Error;
      logger.error({ action: "generateStaffId", msg: message });
    }
  };

  private generatePatientId = async () => {
    try {
      const patientCount = await mongoose
        .model(this.modelName)
        .countDocuments({ chpsCompoundId: this.modelInstance.chpsCompoundId });
      const chps = await mongoose
        .model("ChpsCompound")
        .findOne({ _id: this.modelInstance.chpsCompoundId });
      const index = `${patientCount + 1}`.padStart(3, "0");
      this.currentId = this.prefix + chps.getInitials() + index;
    } catch (err) {
      const { message } = err as Error;
      logger.error({ action: "generatePatientId", msg: message });
    }
  };

  private methods: Record<string, () => Promise<void>> = {
    Staff: this.generateStaffId,
    Patient: this.generatePatientId,
  };

  public generate = async () => {
    if (this.currentId) return { status: true, data: this.currentId };
    await this.methods[this.modelName]();
    return {
      status: !!this.currentId,
      data: !this.currentId ? this.error : (this.currentId as string),
    };
  };
}
