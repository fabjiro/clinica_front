export class StatusEntity {
  id: string;
  name: string;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  // from json
  static fromJson(json: any): StatusEntity {
    return new StatusEntity(json.id, json.name);
  }
}
