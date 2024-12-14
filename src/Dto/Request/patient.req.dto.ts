export interface IPatientReqDto {
  name: string;
  identification: string;
  phone: string;
  address: string;
  age: number;
  contactPerson: string;
  contactPhone: string;
  birthday: string;
  typeSex: string;
  civilStatus: string;
  avatar?: string;
}
