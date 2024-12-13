import { IUpdateShopReqDto } from "../../dto/request/shop/UpdateShop.req.dto";
import { IShopModel } from "../../model/shop/shop.model";

export interface ShopDatasource {
  getShop(): Promise<IShopModel>;
  update(params: IUpdateShopReqDto): Promise<void>;
}
