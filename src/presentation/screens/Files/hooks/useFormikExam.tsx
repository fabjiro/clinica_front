import { useFormik } from "formik";
import { IExamReqDto } from "../../../../Dto/Request/exam.req.dto";
import { examSchemaValidation } from "../schemas/exam.schema";

export function useFormikExam() {
//   const { mutate, status: statusAddPatient } = useAddPatient();
//   const { mutate: mutateUpdate, status: statusUpdatePatient } = useUpdatePatient();
//   const { patient, modeForm } = usePatientStore();

//   const isCreateMode = modeForm === MODEFORMENUM.CREATE;

  const initialValues: Partial<IExamReqDto> = {};

  const {
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    submitForm: submitForm,
    errors,
    values,
  } = useFormik<Partial<IExamReqDto>>({
    initialValues,
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    validationSchema: () => examSchemaValidation(),
    onSubmit: (values) => {
      console.log(values);
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
