import { ShopDatasource } from "../../../domain/datasource/shop/shop.datasource";
import { IUpdateShopReqDto } from "../../../domain/dto/request/shop/UpdateShop.req.dto";
import { ShopEntity } from "../../../domain/entity/shop/shop.entity";
import { ShopRepository } from "../../../domain/repository/shop/shop.repository";

export class ShopRepositoryImpl implements ShopRepository {
    private readonly datasource: ShopDatasource;

    constructor(datasource: ShopDatasource) {
        this.datasource = datasource;
    }
    async update(params: IUpdateShopReqDto): Promise<void> {
        await this.datasource.update(params);
    }

    async getShop(): Promise<ShopEntity> {
        const reponse = await this.datasource.getShop();
        return ShopEntity.fromJson(reponse);
    }
}