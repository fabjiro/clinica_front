import { IImageModel } from "../image/image.model";
import { IRolModel } from "../rol/rol.model";
import { IStatusModel } from "../status/status.model";

export interface IUserModel {
  id: string;
  name: string;
  email: string;
  rol?: IRolModel;
  avatar?: IImageModel;
  status?: IStatusModel;
}
