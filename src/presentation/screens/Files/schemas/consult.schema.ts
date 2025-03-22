import * as Yup from "yup";
import { IConsultReqDto } from "../../../../Dto/Request/consult.req.dto";

export function consultSchemaValidation(): Yup.Schema<Partial<IConsultReqDto>> {
  return Yup.object().shape({
    patient: Yup.string().required("El paciente es requerido"),
    nextappointment: Yup.string().required("La proxima cita es requerida"),
    weight: Yup.number().required("El peso es requerido").positive("Debe ser un número positivo").max(400, "El peso no puede ser mayor a 400 Kg"),
    size: Yup.number().required("El tamaño es requerido").positive("Debe ser un número positivo").integer("Debe ser un número entero").max(200, "La estatura no puede ser mayor a 220 Cm"),
    diagnostic: Yup.string().required("El diagnostico es requerido"),
    examComplementary: Yup.string().optional(),
    motive: Yup.string().required("El motivo es requerido"),
    antecedentPerson: Yup.string().required("El antecedente personal es requerido"),
    recipe: Yup.string().required("La receta es requerida"),
    antecedentFamily: Yup.string().optional(),
    clinicalhistory: Yup.string().optional(),
    bilogicalEvaluation: Yup.string().optional(),
    psychologicalEvaluation: Yup.string().optional(),
    socialEvaluation: Yup.string().optional(),
    functionalEvaluation: Yup.string().optional(),
    pulse: Yup.number().optional().positive("Debe ser un número positivo").integer("Debe ser un número entero").max(250, "El pulso no puede ser mayor a 250 Lpm"),
    oxygenSaturation: Yup.number().optional().positive("Debe ser un número positivo").max(100, "La saturación de oxigeno no puede ser mayor a 100 %"),
    systolicPressure: Yup.number().optional().positive("Debe ser un número positivo").max(200, "La presión sistólica no puede ser mayor a 200 mmHg"),
    diastolicPressure: Yup.number().optional().positive("Debe ser un número positivo").max(140, "La presión diastólica no puede ser mayor a 140 mmHg"),
    imageExam: Yup.string().optional(),
});
}
