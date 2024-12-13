import { IStatusModel } from "../../model/status/status.model";

export interface StatusRepository {
  getAll(): Promise<IStatusModel[]>;
}
