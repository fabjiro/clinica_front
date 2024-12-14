import * as Yup from "yup";
import { IPatientReqDto } from "../../../../Dto/Request/patient.req.dto";

export function patientSchemaValidation(): Yup.Schema<Partial<IPatientReqDto>> {
  return Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    identification: Yup.string().required("La identificación es requerida"),
    phone: Yup.string().required("El teléfono es requerido"),
    address: Yup.string().required("La dirección es requerida"),
    age: Yup.number().required("La edad es requerida"),
    contactPerson: Yup.string().required("La persona de contacto es requerida"),
    contactPhone: Yup.string().required("El teléfono de contacto es requerido"),
    birthday: Yup.string().required("La fecha de nacimiento es requerida"),
    typeSex: Yup.string().required("El sexo es requerido"),
    civilStatus: Yup.string().required("El estado civil es requerido"),
    // avatar: Yup.string().optional(),
  });
}
