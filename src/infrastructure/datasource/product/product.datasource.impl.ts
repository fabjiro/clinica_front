import axiosInstance from "../../../config/axios.config";
import { ProductDataSource } from "../../../domain/datasource/product/product.datasource";
import { CreateProductReqDto } from "../../../domain/dto/request/product/createProduct.req.dto";
import { UpdateProductReqDto } from "../../../domain/dto/request/product/updateProduct.req.dto";
import { IProductModel } from "../../../domain/model/product/product.model";

export class ProductDataSourceImpl implements ProductDataSource {
  private readonly BASE_URL: string = "/product";
  
  async searchProduct(word: string): Promise<IProductModel[]> {
    const { data } = await axiosInstance.get<IProductModel[]>(
      `${this.BASE_URL}/search/${word}`
    );
    return data;
  }

  async getAll(): Promise<IProductModel[]> {
    const { data } = await axiosInstance.get<IProductModel[]>(
      `${this.BASE_URL}`
    );
    return data;
  }
  async delete(id: string): Promise<IProductModel> {
    const { data } = await axiosInstance.delete<IProductModel>(
      `${this.BASE_URL}/${id}`
    );
    return data;
  }
  async add(product: CreateProductReqDto): Promise<IProductModel> {
    const { data } = await axiosInstance.post<IProductModel>(
      `${this.BASE_URL}`,
      product
    );
    return data;
  }
  async update(product: UpdateProductReqDto): Promise<IProductModel> {
    const { data } = await axiosInstance.put<IProductModel>(
      `${this.BASE_URL}`,
      product
    );
    return data;
  }
}
