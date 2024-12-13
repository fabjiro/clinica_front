import * as Yup from "yup";
import { IAddBillingReqDto } from "../../../../domain/dto/request/billing/AddBillingReqDto";
import { useBillingStore } from "../store/billing.store";

export function BillingSchemaValidation(): Yup.Schema<
  Partial<IAddBillingReqDto>
> {
  const totalAmount = useBillingStore.getState();
  return Yup.object().shape({
    ClientName: Yup.string().required("El nombre es requerido"),
    paymentReceived: Yup.number()
      .required("Cantidad recibida es requerida")
      .typeError("La cantidad debe ser un número")
      .min(totalAmount.total, "La cantidad recibida no puede ser menor al monto total"),
  });
}
