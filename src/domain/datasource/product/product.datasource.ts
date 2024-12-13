import { CreateProductReqDto } from "../../dto/request/product/createProduct.req.dto";
import { UpdateProductReqDto } from "../../dto/request/product/updateProduct.req.dto";
import { IProductModel } from "../../model/product/product.model";

export interface ProductDataSource {
  getAll(): Promise<IProductModel[]>;
  delete(id: string): Promise<IProductModel>;
  add(product: CreateProductReqDto): Promise<IProductModel>;
  update(product: UpdateProductReqDto): Promise<IProductModel>;
  searchProduct(word: string): Promise<IProductModel[]>;
}
