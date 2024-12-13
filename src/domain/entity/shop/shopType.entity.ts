export class ShopTypeEntity {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  // from json
  static fromJson(json: any): ShopTypeEntity {
    return new ShopTypeEntity(json.id, json.name);
  }
}
