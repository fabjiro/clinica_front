import { ImageEntity } from "../image/image.entity";
import { RolEntity } from "../rol/rol.entity";

export class UserEntity {
  id: string;
  name: string;
  email: string;
  rol?: RolEntity;
  avatar?: ImageEntity;

  constructor(
    id: string,
    name: string,
    email: string,
    rol?: RolEntity,
    avatar?: ImageEntity,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.rol = rol;
    this.avatar = avatar;
  }
  // from json
  static fromJson(json: any): UserEntity {
    return new UserEntity(
      json.id,
      json.name,
      json.email,
      json.rol !== null ? RolEntity.fromJson(json.rol) : undefined,
      json.avatar !== null ? ImageEntity.fromJson(json.avatar) : undefined,
    );
  }
}
