import { IUpdateShopReqDto } from "../../dto/request/shop/UpdateShop.req.dto";
import { ShopEntity } from "../../entity/shop/shop.entity";

export interface ShopRepository {
  getShop(): Promise<ShopEntity>;
  update(params: IUpdateShopReqDto): Promise<void>;
}
