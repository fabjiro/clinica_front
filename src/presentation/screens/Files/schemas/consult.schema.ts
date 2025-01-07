import * as Yup from "yup";
import { IConsultReqDto } from "../../../../Dto/Request/consult.req.dto";

export function consultSchemaValidation(): Yup.Schema<Partial<IConsultReqDto>> {
  return Yup.object().shape({
    patient: Yup.string().required("El paciente es requerido"),
    nextappointment: Yup.string().required("La proxima cita es requerida"),
    weight: Yup.number().required("El peso es requerido"),
    size: Yup.number().required("El tamaño es requerido"),
    diagnostic: Yup.string().required("El diagnostico es requerido"),
    motive: Yup.string().optional(),
    antecedentPerson: Yup.string().optional(),
    antecedentFamily: Yup.string().optional(),
    clinicalhistory: Yup.string().optional(),
    bilogicalEvaluation: Yup.string().optional(),
    psychologicalEvaluation: Yup.string().optional(),
    socialEvaluation: Yup.string().optional(),
    functionalEvaluation: Yup.string().optional(),
    pulse: Yup.number().optional(),
    oxygenSaturation: Yup.number().optional(),
    systolicPressure: Yup.number().optional(),
    diastolicPressure: Yup.number().optional(),
    imageExam: Yup.string().optional(),
    examComplementary: Yup.string().optional(),
});
}
