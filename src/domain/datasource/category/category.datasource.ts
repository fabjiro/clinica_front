import { CreateCategoryReqDto } from "../../dto/request/category/createCategory.req.dto";
import { UpdateCategoryReqDto } from "../../dto/request/category/updateCategory.req.dto";
import { ICategoryModel } from "../../model/category/category.model";

export interface CategoryDataSource {
  getAll(): Promise<ICategoryModel[]>;
  delete(id: string): Promise<ICategoryModel>;
  add(category: CreateCategoryReqDto): Promise<ICategoryModel>;
  update(category: UpdateCategoryReqDto): Promise<ICategoryModel>;
}
