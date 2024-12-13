import { useFormik } from "formik";
import { useCategoryStore } from "../store/category.store";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";
import { CategoryEntity } from "../../../../domain/entity/category/category.entity";
import { categorySchemaValidation } from "../schema/category.schema";
import { useCreateCategory, useUpdateCategory } from "../query/category.query";

export function useFormikCategory() {
  const { modeForm, category } = useCategoryStore();
  const isCreatedMode = modeForm === MODEFORMENUM.CREATE;
  const { mutate: createCategory, status: createCategoryStatus } =
    useCreateCategory();
  const {
    mutate: updateCategory,
    status: updateCategoryStatus,
  } = useUpdateCategory();

  const initialValues: Partial<CategoryEntity> = isCreatedMode
    ? {
        name: "",
      }
    : {
        name: category?.name,
      };
  const {
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    submitForm: submitForm,
    errors,
    values,
  } = useFormik<Partial<CategoryEntity>>({
    initialValues: initialValues,
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    validationSchema: categorySchemaValidation,
    onSubmit: (values) => {
      if (isCreatedMode) {
        createCategory({
          name: values.name!,
        });
      } else {
        updateCategory({
          id: category?.id!,
          name: values.name!,
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
    createCategoryStatus,
    updateCategoryStatus
  };
}
