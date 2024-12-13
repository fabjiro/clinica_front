import * as Yup from "yup";
import { IUpdateShopReqDto } from "../../../../domain/dto/request/shop/UpdateShop.req.dto";

export function ShopSchemaValidation(): Yup.Schema<Partial<IUpdateShopReqDto>> {
  return Yup.object().shape({
    Name: Yup.string().optional(),
    Logo: Yup.string().optional(),
    MinStockProducts: Yup.number()
      .optional()
      .typeError("El stock debe ser un número")
      .min(0, "El stock no puede ser negativo"),
  });
}
