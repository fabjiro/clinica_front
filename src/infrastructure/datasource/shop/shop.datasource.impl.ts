import axiosInstance from "../../../config/axios.config";
import { ShopDatasource } from "../../../domain/datasource/shop/shop.datasource";
import { IUpdateShopReqDto } from "../../../domain/dto/request/shop/UpdateShop.req.dto";
import { IShopModel } from "../../../domain/model/shop/shop.model";

export class ShopDataSourceImpl implements ShopDatasource {
  private readonly BASE_URL: string = "/shop";
  async update(params: IUpdateShopReqDto): Promise<void> {
    await axiosInstance.put(`${this.BASE_URL}`, params);
  }
  async getShop(): Promise<IShopModel> {
    const { data } = await axiosInstance.get<IShopModel>(`${this.BASE_URL}/me`);

    return data;
  }
}
