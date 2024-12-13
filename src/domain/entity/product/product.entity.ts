import { CategoryEntity } from "../category/category.entity";
import { ImageEntity } from "../image/image.entity";

export class ProductEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: CategoryEntity;
  image?: ImageEntity;
  inStock: boolean;

  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    category?: CategoryEntity,
    image?: ImageEntity
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.image = image;
    this.inStock = stock > 0;
  }

  // from json
  static fromJson(json: any): ProductEntity {
    return new ProductEntity(
      json.id,
      json.name,
      json.description,
      json.price,
      json.stock,
      json.category !== null ? CategoryEntity.fromJson(json.category) : undefined,
      json.image !== null ? ImageEntity.fromJson(json.image) : undefined
    );
  }
}
