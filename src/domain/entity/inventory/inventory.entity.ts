import moment from "moment";
import { ProductEntity } from "../product/product.entity";
import { UserEntity } from "../user/user.entity";
import {
  stringToTypeMovementEnum,
  translateMovementType,
} from "../../../enum/typemovement/typemovement.enum";

export class InventoryEntity {
  id: string;
  product: ProductEntity;
  count: number;
  priceUnit: number;
  typeMovement: string;
  typeMovementString: string;
  user: UserEntity;
  createdAt: string;
  relactiveDate: string;

  constructor(
    id: string,
    product: ProductEntity,
    count: number,
    priceUnit: number,
    typeMovement: string,
    user: UserEntity,
    createdAt: string
  ) {
    this.id = id;
    this.product = product;
    this.count = count;
    this.priceUnit = priceUnit;
    this.typeMovement = typeMovement;
    this.user = user;
    this.createdAt = createdAt;
    this.createdAt = moment(createdAt).format("MMM Do YY");
    this.relactiveDate = moment(createdAt).fromNow();
    this.typeMovementString = translateMovementType(
      stringToTypeMovementEnum(typeMovement)!
    );
  }

  // from json
  static fromJson(json: any): InventoryEntity {
    return new InventoryEntity(
      json.id,
      ProductEntity.fromJson(json.product),
      json.count,
      json.priceUnit,
      json.typeMovement,
      UserEntity.fromJson(json.user),
      json.createdAt
    );
  }
}
