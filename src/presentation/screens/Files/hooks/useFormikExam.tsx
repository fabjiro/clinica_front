import { useFormik } from "formik";
import { IExamReqDto } from "../../../../Dto/Request/exam.req.dto";
import { examSchemaValidation } from "../schemas/exam.schema";
import { useAddExam } from "../query/exam.query";

export function useFormikExam() {
  const { mutate, status: statusAddExam } = useAddExam();
//   const { mutate: mutateUpdate, status: statusUpdatePatient } = useUpdatePatient();
//   const { patient, modeForm } = usePatientStore();

//   const isCreateMode = modeForm === MODEFORMENUM.CREATE;

  const initialValues: Partial<IExamReqDto> = { group: "", name: "" };

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
      mutate({group: values.group!, name: values.name!});
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
    statusAddExam
  };
}
