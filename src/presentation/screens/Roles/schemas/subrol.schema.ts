import * as Yup from "yup";

import { ISubRolReqDto } from "../../../../Dto/Request/subrol.req.dto";

export function subRolSchemaValidation(): Yup.Schema<Partial<ISubRolReqDto>> {
  return Yup.object().shape({
    rolId: Yup.string().required("El Rol es requerido"),
    name: Yup.string().required("El Nombre es requerido"),
  });
}