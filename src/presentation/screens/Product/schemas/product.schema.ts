import * as Yup from "yup";
import { CreateProductReqDto } from "../../../../domain/dto/request/product/createProduct.req.dto";

export function ProductSchemaValidation(): Yup.Schema<
  Partial<CreateProductReqDto>
> {
  return Yup.object()
    .shape({
      name: Yup.string().required("El nombre es requerido"),
      price: Yup.number()
        .optional()
        .typeError("El precio debe ser un número")
        .min(0, "El precio no puede ser negativo"),
      stock: Yup.number()
        .optional()
        .typeError("El stock debe ser un número")
        .min(0, "El stock no puede ser negativo"),
      categoryId: Yup.string().required("La categoria es requerida"),
      image: Yup.string().optional(),
      description: Yup.string().optional(),
    });
}
