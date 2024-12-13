import { IImageModel } from "../image/image.model";

export interface ISearchProductModel {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: IImageModel;
}
