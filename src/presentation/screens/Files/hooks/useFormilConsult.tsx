import { useFormik } from "formik";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";
import { IConsultReqDto } from "../../../../Dto/Request/consult.req.dto";
import { useConsutlFormStore } from "../../../storage/form.storage";
import { consultSchemaValidation } from "../schemas/consult.schema";
import { useCreateConsult } from "../query/consult.query";

export function useFormikConsult() {
  const { status: addConsultStatus, mutate: createConsult } =
    useCreateConsult();
  const { item, modeForm } = useConsutlFormStore();

  const isCreateMode = modeForm === MODEFORMENUM.CREATE;

  const initialValues: Partial<IConsultReqDto> = isCreateMode ? {} : {};

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

      console.log(values.nextappointment);
      
      if (isCreateMode) {
        createConsult({
          ...values,
          patient: values.patient!,
          nextappointment: values.nextappointment!,
          weight: values.weight!,
          size: values.size!,
          diagnostic: values.diagnostic!,
          recipe: values.recipe!,
          antecedentPerson: values.antecedentPerson!,
          motive: values.motive!
        });
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
    addConsultStatus,
  };
}
