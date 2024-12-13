import { useFormik } from "formik";
import { IAddBillingReqDto } from "../../../../domain/dto/request/billing/AddBillingReqDto";
import { BillingSchemaValidation } from "../schema/billing.schema";
import { useBillingStore } from "../store/billing.store";
import { useAddFacturation } from "../query/facturation.query";

export function useFormikBilling() {
  const products = useBillingStore((state) => state.products);
  const { status: addFacturationStatus, mutate } = useAddFacturation();

  const initialValues: Partial<IAddBillingReqDto> = {
    ClientName: "",
  };

  const {
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    submitForm: submitForm,
    errors,
    values,
  } = useFormik<Partial<IAddBillingReqDto>>({
    initialValues: initialValues,
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    validationSchema: BillingSchemaValidation(),
    onSubmit: (values) => {
      if(products.length === 0) return;
      
      mutate({
        ClientName: values.ClientName ?? '',        
        paymentReceived: values.paymentReceived ?? 0,
        facturationDetails: products.map((e) => ({
          product: e.id,
          quantity: e.quantity,
        })),
      })
    },
  });

  return {
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    submitForm,
    errors,
    values,
    addFacturationStatus,
  };
}
