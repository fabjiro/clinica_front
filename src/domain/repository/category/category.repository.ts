import { CreateCategoryReqDto } from "../../dto/request/category/createCategory.req.dto";
import { UpdateCategoryReqDto } from "../../dto/request/category/updateCategory.req.dto";
import { CategoryEntity } from "../../entity/category/category.entity";

export interface CategoryRepository {
  getAll(): Promise<CategoryEntity[]>;
  delete(id: string): Promise<CategoryEntity>;
  add(category: CreateCategoryReqDto): Promise<CategoryEntity>;
  update(category: UpdateCategoryReqDto): Promise<CategoryEntity>;
}
