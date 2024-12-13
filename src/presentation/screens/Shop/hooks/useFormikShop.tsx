import { useFormik } from "formik";
import { IUpdateShopReqDto } from "../../../../domain/dto/request/shop/UpdateShop.req.dto";
import { ShopSchemaValidation } from "../schemas/shop.schema";
import { useUpdateShop } from "../query/shop.query";

export function useFormikShop() {
  const { status: updateShopStatus, mutate: mutateUpdate } = useUpdateShop();

  const {
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    submitForm: submitForm,
    errors,
    values,
  } = useFormik<Partial<IUpdateShopReqDto>>({
    initialValues: {},
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    validationSchema: ShopSchemaValidation(),
    onSubmit: (values) => {
      if (values) {
        mutateUpdate(values);
      }
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
    updateShopStatus,
  };
}
