import { IUserModel } from "../domain/model/user/user.model";
import { IImage } from "./image.interface";
import { IPatient } from "./patient.interface";

export interface IConsult {
  id: string;
  patientId: string;
  patient: IPatient;
  motive: string;
  clinicalhistory?: string;
  bilogicalEvaluation: string;
  psychologicalEvaluation: string;
  socialEvaluation: string;
  functionalEvaluation: string;
  weight: number;
  size: number;
  pulse: string;
  oxygenSaturation: string;
  systolicPressure: string;
  diastolicPressure: string;
  antecedentPersonal: string;
  antecedentFamily: string;
  examComplementaryId: string;
  complementaryTest: string;
  diagnosis: string;
  imageExamId: string;
  image: IImage;
  recipe: string;
  nextappointment: Date;
  createdAt: string;
  count: number;
  userCreatedBy: IUserModel,
}
