import { AttributesEntity } from "../attributes/attributes.entity";
import { ImageEntity } from "../image/image.entity";
import { ShopTypeEntity } from "./shopType.entity";

export class ShopEntity {
  id: string;
  name: string;
  minStockProducts: number;
  logo: ImageEntity;
  shopType: ShopTypeEntity;
  attribute: AttributesEntity;

  constructor(
    id: string,
    name: string,
    minStockProducts: number,
    logo: ImageEntity,
    shopType: ShopTypeEntity,
    attribute: AttributesEntity
  ) {
    this.id = id;
    this.name = name;
    this.minStockProducts = minStockProducts;
    this.logo = logo;
    this.shopType = shopType;
    this.attribute = attribute;
  }

    //   from json
  static fromJson(json: any): ShopEntity {
    return new ShopEntity(
      json.id,
      json.name,
      json.minStockProducts,
      ImageEntity.fromJson(json.logo),
      ShopTypeEntity.fromJson(json.shopType),
      AttributesEntity.fromJson(json.attribute)
    );
  }
}
