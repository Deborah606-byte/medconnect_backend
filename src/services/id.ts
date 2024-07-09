import mongoose from "mongoose";
import { logger } from "../utils/logger";
import type { ObjectId } from "mongodb";
import type { Document } from "mongoose";

interface CompoundResource extends Document {
  chpsCompoundId: ObjectId;
}

abstract class BaseIDGenerator<T extends CompoundResource> {
  protected readonly prefix: string = "MDC";
  protected abstract modelName: string;
  protected modelInstance: T;
  protected currentId: string | undefined = undefined;
  protected error: string = "";

  constructor(instance: T, idx: string | undefined) {
    this.modelInstance = instance;
    this.currentId = idx;
    this.setError();
  }

  protected abstract generateId(): Promise<boolean>;
  protected setError = () =>
    (this.error = `Failed to generate id for ${this.modelName.toLowerCase()}`);

  public generate = async () => {
    if (this.currentId) return { status: true, data: this.currentId };

    const status = await this.generateId();
    if (!status) return { status, data: this.error };
    return { status, data: this.currentId as string };
  };
}

export class StaffIdGenerator extends BaseIDGenerator<CompoundResource> {
  protected readonly modelName = "Staff";

  constructor(instance: CompoundResource, idx: string) {
    super(instance, idx);
    this.setError();
  }

  protected generateId = async () => {
    try {
      const staffCount = await mongoose
        .model(this.modelName)
        .countDocuments({ chpsCompoundId: this.modelInstance.chpsCompoundId });
      const index = `${staffCount + 1}`.padStart(4, "0");
      this.currentId = `${this.prefix}S${index}`;
      return true;
    } catch (err) {
      const { message } = err as Error;
      logger.error({ action: "generateStaffId", msg: message });
      return false;
    }
  };
}
export class PatientIdGenerator extends BaseIDGenerator<CompoundResource> {
  protected readonly modelName = "Patient";

  constructor(instance: CompoundResource, idx: string) {
    super(instance, idx);
    this.setError();
  }

  protected generateId = async () => {
    try {
      const patientCount = await mongoose.model(this.modelName).countDocuments({
        chpsCompoundId: this.modelInstance.chpsCompoundId,
      });
      const chps = await mongoose
        .model("ChpsCompound")
        .findOne({ _id: this.modelInstance.chpsCompoundId });
      const index = `${patientCount + 1}`.padStart(3, "0");
      this.currentId = this.prefix + chps.getInitials() + index;
      return true;
    } catch (err) {
      const { message } = err as Error;
      logger.error({ action: "generatePatientId", msg: message });
      return false;
    }
  };
}
