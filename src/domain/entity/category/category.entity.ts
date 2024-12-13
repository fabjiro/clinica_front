export class CategoryEntity {
  id: string;
  name: string;
  countProducts: number;

  constructor(id: string, name: string, countProducts: number) {
    this.id = id;
    this.name = name;
    this.countProducts = countProducts;
  }
  // from json
  static fromJson(json: any): CategoryEntity {
    return new CategoryEntity(json.id, json.name, json.countProducts);
  }
}
