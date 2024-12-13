import { ProductDataSource } from "../../../domain/datasource/product/product.datasource";
import { CreateProductReqDto } from "../../../domain/dto/request/product/createProduct.req.dto";
import { UpdateProductReqDto } from "../../../domain/dto/request/product/updateProduct.req.dto";
import { CategoryEntity } from "../../../domain/entity/category/category.entity";
import { ImageEntity } from "../../../domain/entity/image/image.entity";
import { ProductEntity } from "../../../domain/entity/product/product.entity";
import { ProductRepository } from "../../../domain/repository/product/product.repository";

export class ProductRepositoryImpl implements ProductRepository {
  private readonly dataSource: ProductDataSource;

  constructor(dataSource: ProductDataSource) {
    this.dataSource = dataSource;
  }
  async searchProduct(word: string): Promise<ProductEntity[]> {
    const reponse = await this.dataSource.searchProduct(word);

    return reponse.map(
      (item) =>
        new ProductEntity(
          item.id,
          item.name,
          item.description,
          item.price,
          item.stock,
          new CategoryEntity(item.category!.id, item.category!.name, 0),
          new ImageEntity(
            item.image!.id,
            item.image!.originalUrl,
            item.image!.compactUrl
          )
        )
    );
  }
  async getAll(): Promise<ProductEntity[]> {
    const reponse = await this.dataSource.getAll();
    return reponse.map(
      (item) =>
        new ProductEntity(
          item.id,
          item.name,
          item.description,
          item.price,
          item.stock,
          new CategoryEntity(item.category!.id, item.category!.name, 0),
          new ImageEntity(
            item.image!.id,
            item.image!.originalUrl,
            item.image!.compactUrl
          )
        )
    );
  }
  async delete(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }
  async add(product: CreateProductReqDto): Promise<void> {
    await this.dataSource.add(product);
  }
  async update(product: UpdateProductReqDto): Promise<void> {
    await this.dataSource.update(product);
  }
}
