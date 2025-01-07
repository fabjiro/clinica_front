import { useFormik } from "formik";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";
import { IConsultReqDto } from "../../../../Dto/Request/consult.req.dto";
import { useConsutlFormStore } from "../../../storage/form.storage";
import { consultSchemaValidation } from "../schemas/consult.schema";

export function useFormikConsult() {
  const { item, modeForm } = useConsutlFormStore();

  const isCreateMode = modeForm === MODEFORMENUM.CREATE;

  const initialValues: Partial<IConsultReqDto> = isCreateMode ?  {  } : { };

  const {
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    submitForm: submitForm,
    errors,
    values,
  } = useFormik<Partial<IConsultReqDto>>({
    initialValues,
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    validationSchema: () => consultSchemaValidation(),
    onSubmit: (values) => {
        console.table(values);
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
  };
}
