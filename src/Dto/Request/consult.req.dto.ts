export interface IConsultReqDto {
  patient: string;
  nextappointment: string;
  weight: number;
  size: number;
  examComplementary?: string;
  diagnostic: string;
  motive: string;
  antecedentPerson: string;
  recipe: string;
  antecedentFamily?: string;
  clinicalhistory?: string;
  bilogicalEvaluation?: string;
  psychologicalEvaluation?: string;
  socialEvaluation?: string;
  functionalEvaluation?: string;
  pulse?: number;
  oxygenSaturation?: number;
  systolicPressure?: number;
  diastolicPressure?: number;
  imageExam?: string;

}
