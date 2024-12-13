export class RolEntity {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  // from json
  static fromJson(json: any): RolEntity {
    return new RolEntity(json.id, json.name);
  }
}
