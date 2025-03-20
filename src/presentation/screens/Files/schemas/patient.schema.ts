import * as Yup from "yup";
import { IPatientReqDto } from "../../../../Dto/Request/patient.req.dto";

export function patientSchemaValidation(): Yup.Schema<Partial<IPatientReqDto>> {
  return Yup.object().shape({
    name: Yup.string()
    .required("El nombre es requerido")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, "El nombre solo puede contener letras y espacios"), // No permite números ni caracteres especiales
  identification: Yup.string()
    .required("La identificación es requerida")
    .matches(/^[A-Z0-9-]+$/, "La identificación solo puede contener letras mayúsculas, números y guiones"), // Solo permite letras mayúsculas, números y guiones
  phone: Yup.string()
    .required("El teléfono es requerido")
    .matches(/^[\d()+-\s]*$/, "El teléfono solo puede contener números, el símbolo '+' y paréntesis '()'"), // Solo permite números, + y ()
  address: Yup.string().required("La dirección es requerida"),
  age: Yup.number().required("La edad es requerida").positive("La edad debe ser un número positivo") // Solo permite números positivos
  .integer("La edad debe ser un número entero"),
  contactPerson: Yup.string().required("La persona de contacto es requerida")
    .matches(/^[A-Za-z\s]+$/, "El nombre de la persona de contacto solo puede contener letras y espacios"), // No permite números ni caracteres especiales
  contactPhone: Yup.string()
    .required("El teléfono de contacto es requerido")
    .matches(/^[\d()+-\s]*$/, "El teléfono de contacto solo puede contener números, el símbolo '+' y paréntesis '()'"), // Solo permite números, + y ()
  birthday: Yup.string().required("La fecha de nacimiento es requerida"),
  typeSex: Yup.string().required("El sexo es requerido"),
  civilStatus: Yup.string().required("El estado civil es requerido"),
    // avatar: Yup.string().optional(),
  });
}
