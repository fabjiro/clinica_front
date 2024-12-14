import { useFormik } from "formik";
import { IPatientReqDto } from "../../../../Dto/Request/patient.req.dto";
import { patientSchemaValidation } from "../schemas/patient.schema";
import { useAddPatient } from "../query/patient.query";

export function useFormikPatient() {
  const initialValues: Partial<IPatientReqDto> = {};

  const { mutate, status: statusAddPatient } = useAddPatient();

  const {
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    submitForm: submitForm,
    errors,
    values,
  } = useFormik<Partial<IPatientReqDto>>({
    initialValues,
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    validationSchema: () => patientSchemaValidation(),
    onSubmit: (values) => {
      mutate({
        name: values.name!,
        identification: values.identification!,
        phone: values.phone!,
        address: values.address!,
        age: values.age!,
        contactPerson: values.contactPerson!,
        contactPhone: values.contactPhone!,
        birthday: values.birthday!,
        typeSex: values.typeSex!,
        civilStatus: values.civilStatus!,
      });
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
    statusAddPatient,
  };
}
