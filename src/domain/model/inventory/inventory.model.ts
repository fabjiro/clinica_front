import { IProductModel } from "../product/product.model";
import { IUserModel } from "../user/user.model";

export interface IInventoryModel {
  id: string;
  product: Partial<IProductModel>;
  count: number;
  priceUnit: number;
  typeMovement: string;
  user: Partial<IUserModel>;
  createdAt: string;
}
