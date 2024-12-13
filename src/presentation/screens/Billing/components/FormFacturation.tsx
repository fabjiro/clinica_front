import { Input, Button } from "@nextui-org/react";
import { useFormikBilling } from "../hooks/useFormikBilling";
import { useBillingStore } from "../store/billing.store";
import { useEffect } from "react";

interface IProps {
  onSuccess: () => void;
}
export function FormFacturation({ onSuccess }: IProps) {
  const { errors, handleSubmit, setFieldValue, addFacturationStatus, values } =
    useFormikBilling();
  const totalAmount = useBillingStore((state) => state.total);

  const { ClientName: clientNameError, paymentReceived: paymentReceivedError } =
    errors;
  const { paymentReceived } = values;

  const isLoadingAddFacturation = addFacturationStatus === "pending";

  useEffect(() => {
    if (addFacturationStatus === "success") {
      onSuccess();
    }
  }, [addFacturationStatus]);

  return (
    <div className="flex flex-col gap-4 items-start justify-center">
      <div className="flex flex-row items-center justify-between w-full">
        {(paymentReceived ?? 0) >= totalAmount && (
          <p>Cambio: {(paymentReceived ?? 0) - totalAmount}</p>
        )}
        <p>Monto total: {totalAmount}</p>
      </div>
      <Input
        isRequired
        isInvalid={!!clientNameError}
        errorMessage={clientNameError}
        size="sm"
        label="Nombre del cliente"
        onChange={(e) => setFieldValue("ClientName", e.target.value)}
        disabled={isLoadingAddFacturation}
      />
      <Input
        isRequired
        isInvalid={!!paymentReceivedError}
        errorMessage={paymentReceivedError}
        size="sm"
        label="Cantidad de dinero recibido"
        onChange={(e) => setFieldValue("paymentReceived", e.target.value)}
        disabled={isLoadingAddFacturation}
        type="number"
      />
      <div className="w-full flex flex-row gap-2 justify-end  items-center">
        <Button
          isLoading={isLoadingAddFacturation}
          onClick={() => handleSubmit()}
          color="primary"
        >
          Generar
        </Button>
      </div>
    </div>
  );
}
