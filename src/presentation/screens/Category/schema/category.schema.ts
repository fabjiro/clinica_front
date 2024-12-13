import * as Yup from "yup";

// Validation schema
export const categorySchemaValidation = () => {
  return Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
  });
};
