import * as Yup from "yup";
import { IInventoryReqDto } from "../../../../domain/dto/request/inventory/inventoryReqDto";

export function InventorySchemaValidation(): Yup.Schema<
  Partial<IInventoryReqDto>
> {
  return Yup.object().shape({
    product: Yup.string().required("El producto es requerido"),
    count: Yup.number()
      .required("La cantidad es requerida")
      .typeError("La cantidad debe ser un número")
      .min(0, "La cantidad no puede ser negativo"),
  });
}
