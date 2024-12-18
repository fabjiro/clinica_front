import { ICivilStatus } from "./civil.status.interface";
import { IImage } from "./image.interface";
import { IRol } from "./rol.interface";

export interface IPatient {
  id: string;
  name: string;
  rol: IRol;
  avatar: IImage;
  identification: string;
  phone: string;
  address: string;
  age: number;
  contactPhone: string;
  birthday: string;
  typeSex: string;
  createdAt: Date;
  civilStatus: ICivilStatus;
}
