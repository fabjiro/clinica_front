import { CreateProductReqDto } from "../../dto/request/product/createProduct.req.dto";
import { UpdateProductReqDto } from "../../dto/request/product/updateProduct.req.dto";
import { ProductEntity } from "../../entity/product/product.entity";

export interface ProductRepository {
  getAll(): Promise<ProductEntity[]>;
  delete(id: string): Promise<void>;
  add(product: CreateProductReqDto): Promise<void>;
  update(product: UpdateProductReqDto): Promise<void>;
  searchProduct(word: string): Promise<ProductEntity[]>;
}
