import { IAttributeModel } from "../attributes/attributes.model";
import { IImageModel } from "../image/image.model";
import { ShopTypeModel } from "./shopType.model";

export interface IShopModel {
  id: string;
  name: string;
  minStockProducts: number;
  logo: IImageModel;
  shopType: ShopTypeModel;
  attribute: IAttributeModel;
}
