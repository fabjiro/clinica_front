import axiosInstance from "../../../config/axios.config";
import { CategoryDataSource } from "../../../domain/datasource/category/category.datasource";
import { CreateCategoryReqDto } from "../../../domain/dto/request/category/createCategory.req.dto";
import { UpdateCategoryReqDto } from "../../../domain/dto/request/category/updateCategory.req.dto";
import { ICategoryModel } from "../../../domain/model/category/category.model";

export class CategoryDataSourceImpl implements CategoryDataSource {
  private readonly BASE_URL: string = "/category";

  async getAll(): Promise<ICategoryModel[]> {
    const { data } = await axiosInstance.get<ICategoryModel[]>(
      `${this.BASE_URL}`
    );
    return data;
  }
  async delete(id: string): Promise<ICategoryModel> {
    const { data } = await axiosInstance.delete<ICategoryModel>(
      `${this.BASE_URL}/${id}`
    );
    return data;
  }
  async add(category: CreateCategoryReqDto): Promise<ICategoryModel> {
    const { data } = await axiosInstance.post<ICategoryModel>(
      `${this.BASE_URL}`,
      category
    );
    return data;
  }
  async update(category: UpdateCategoryReqDto): Promise<ICategoryModel> {
    const { data } = await axiosInstance.put<ICategoryModel>(
      `${this.BASE_URL}`,
      category
    );
    return data;
  }
}
