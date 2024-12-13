import { CategoryDataSource } from "../../../domain/datasource/category/category.datasource";
import { CreateCategoryReqDto } from "../../../domain/dto/request/category/createCategory.req.dto";
import { UpdateCategoryReqDto } from "../../../domain/dto/request/category/updateCategory.req.dto";
import { CategoryEntity } from "../../../domain/entity/category/category.entity";
import { CategoryRepository } from "../../../domain/repository/category/category.repository";

export class CategoryRepositoryImpl implements CategoryRepository {
  private readonly datasource: CategoryDataSource;
  constructor(datasource: CategoryDataSource) {
    this.datasource = datasource;
  }
  async getAll(): Promise<CategoryEntity[]> {
    const reponse = await this.datasource.getAll();
    return reponse.map((item) => new CategoryEntity(item.id, item.name, item.countProducts));
  }
  async delete(id: string): Promise<CategoryEntity> {
    const reponse = await this.datasource.delete(id);
    return new CategoryEntity(reponse.id, reponse.name, 0);
  }
  async add(category: CreateCategoryReqDto): Promise<CategoryEntity> {
    const reponse = await this.datasource.add(category);
    return new CategoryEntity(reponse.id, reponse.name, 0);
  }
  async update(category: UpdateCategoryReqDto): Promise<CategoryEntity> {
    const reponse = await this.datasource.update(category);
    return new CategoryEntity(reponse.id, reponse.name, 0);
  }
}
