import { ICategoryModel } from "../category/category.model";
import { IImageModel } from "../image/image.model";

export interface IProductModel {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: ICategoryModel;
  image: IImageModel;
}
