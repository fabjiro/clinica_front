import { useFormik } from "formik";
import { CreateProductReqDto } from "../../../../domain/dto/request/product/createProduct.req.dto";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";
import { useProductStore } from "../store/product.store";
import { ProductSchemaValidation } from "../schemas/product.schema";
import { useAddProduct, useUpdateProduct } from "../query/product.query";

export function useFormikProduct() {
  const { modeForm, product } = useProductStore();

  const { mutate: addProduct, status: addProductStatus } = useAddProduct();
  const { mutate: updateProduct, status: updateProductStatus } = useUpdateProduct();

  const isCreateMode = modeForm === MODEFORMENUM.CREATE;

  const initialValues: Partial<CreateProductReqDto> = isCreateMode
    ? {
        name: "",
      }
    : {
        name: product?.name,
        ...(product?.description && { description: product?.description }),
        price: product?.price,
        stock: product?.stock,
        categoryId: product?.category?.id,
      };

  const {
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    submitForm: submitForm,
    errors,
    values,
  } = useFormik<Partial<CreateProductReqDto>>({
    initialValues: initialValues,
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    validationSchema: ProductSchemaValidation,
    onSubmit: (values) => {
      if (isCreateMode) {
        addProduct({
          name: values.name!,
          description: values.description,
          categoryId: values.categoryId!,
          image: values.image,
          price: values.price,
          stock: values.stock,
        });
      } else {
        updateProduct({
          id: product?.id!,
          name: values.name,
          description: values.description,
          categoryId: values.categoryId,
          image: values.image,
          price: values.price,
          stock: values.stock,
        })
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
    addProductStatus,
    updateProductStatus,
  };
}
