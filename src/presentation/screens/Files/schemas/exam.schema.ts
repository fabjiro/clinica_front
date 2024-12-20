import * as Yup from "yup";
import { IExamReqDto } from "../../../../Dto/Request/exam.req.dto";

export function examSchemaValidation(): Yup.Schema<Partial<IExamReqDto>> {
  return Yup.object().shape({
    group: Yup.string().required("El grupo es requerido"),
    name: Yup.string().required("El nombre es requerido"),
  });
}
