import { InventoryDataSource } from "../../../domain/datasource/inventory/inventory.datasource";
import { IInventoryReqDto } from "../../../domain/dto/request/inventory/inventoryReqDto";
import { InventoryEntity } from "../../../domain/entity/inventory/inventory.entity";
import { PagedResponseEntity } from "../../../domain/entity/PageResponseEntity";
import { InventoryRepository } from "../../../domain/repository/inventory/inventory.repository";

export class InventoryRepositoryImpl implements InventoryRepository {
  private readonly datasource: InventoryDataSource;

  constructor(datasource: InventoryDataSource) {
    this.datasource = datasource;
  }
  async addInventory(inventory: IInventoryReqDto): Promise<InventoryEntity> {
    const response = await this.datasource.addInventory(inventory);
    return InventoryEntity.fromJson(response);
  }

  async getAll(page: number, pageSize: number): Promise<PagedResponseEntity<InventoryEntity>> {
    const reponse = await this.datasource.getAll(page, pageSize);

    const entity = PagedResponseEntity.fromJson({
      ...reponse,
      items: reponse.items.map((e) => InventoryEntity.fromJson(e))
    });

    return entity;
  }
}
