export class AttributesEntity {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
  //  from json
  static fromJson(json: any): AttributesEntity {
    return new AttributesEntity(json.id, json.name);
  }
}
