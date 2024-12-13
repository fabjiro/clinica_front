import { IStatusModel } from "../../model/status/status.model";

export interface StatusDataSource {
  getAll(): Promise<IStatusModel[]>;
}
