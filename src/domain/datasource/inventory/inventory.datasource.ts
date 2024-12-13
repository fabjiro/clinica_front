import { IInventoryReqDto } from "../../dto/request/inventory/inventoryReqDto";
import { IInventoryModel } from "../../model/inventory/inventory.model";
import { IPagedResponse } from "../../model/PageResponseModel";

export interface InventoryDataSource {
  getAll(page: number, pageSize: number): Promise<IPagedResponse<IInventoryModel>>;
  addInventory(inventory: IInventoryReqDto): Promise<IInventoryModel>;
}
