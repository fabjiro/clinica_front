import axiosInstance from "../../../config/axios.config";
import { StatusDataSource } from "../../../domain/datasource/status/status.datasource";
import { IStatusModel } from "../../../domain/model/status/status.model";

export class StatusDataSourceImpl implements StatusDataSource {
  private readonly BASE_URL: string = "/status";
  async getAll(): Promise<IStatusModel[]> {
    const { data } = await axiosInstance.get<IStatusModel[]>(
      `${this.BASE_URL}`
    );
    return data;
  }
}
