import axiosInstance from "../../../config/axios.config";
import { InventoryDataSource } from "../../../domain/datasource/inventory/inventory.datasource";
import { IInventoryReqDto } from "../../../domain/dto/request/inventory/inventoryReqDto";
import { IInventoryModel } from "../../../domain/model/inventory/inventory.model";
import { IPagedResponse } from "../../../domain/model/PageResponseModel";

export class InventoryDataSourceImpl implements InventoryDataSource {
  private readonly BASE_URL: string = "/inventory";

  async addInventory(inventory: IInventoryReqDto): Promise<IInventoryModel> {
    const { data } = await axiosInstance.post<IInventoryModel>(
      `${this.BASE_URL}`,
      inventory
    );

    return data;
  }
  async getAll(page: number, pageSize: number): Promise<IPagedResponse<IInventoryModel>> {
    const { data } = await axiosInstance.get<IPagedResponse<IInventoryModel>>(
      `${this.BASE_URL}/history?pageSize=${pageSize}&page=${page}`
    );
    return data;
  }
}
