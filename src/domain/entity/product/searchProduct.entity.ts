import { ImageEntity } from "../image/image.entity";

export class SearchProductEntity {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: ImageEntity;

  constructor(
    id: string,
    name: string,
    price: number,
    stock: number,
    image: ImageEntity
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.image = image;
  }

  //   from json
  static fromJson(json: any): SearchProductEntity {
    return new SearchProductEntity(
      json.id,
      json.name,
      json.price,
      json.stock,
      new ImageEntity(
        json.image.id,
        json.image.originalUrl,
        json.image.compactUrl
      )
    );
  }
}
