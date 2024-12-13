import { IInventoryReqDto } from "../../dto/request/inventory/inventoryReqDto";
import { InventoryEntity } from "../../entity/inventory/inventory.entity";
import { PagedResponseEntity } from "../../entity/PageResponseEntity";

export interface InventoryRepository {
  getAll(page: number, pageSize: number): Promise<PagedResponseEntity<InventoryEntity>>;
  addInventory(inventory: IInventoryReqDto): Promise<InventoryEntity>;
}
