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

  const initialValues: Partial<IConsultReqDto> = isCreateMode ? {} : {
    patient: item?.patient?.id,
    nextappointment: item?.nextappointment,
    weight: item?.weight,
    size: item?.size,
    recipe: item?.recipe,
    motive: item?.motive,
    antecedentPerson: item?.antecedentPersonal,
    diagnostic: item?.diagnosis,
    clinicalhistory: item?.clinicalhistory,
    bilogicalEvaluation: item?.bilogicalEvaluation,
    psychologicalEvaluation: item?.psychologicalEvaluation,
    socialEvaluation: item?.socialEvaluation,
    functionalEvaluation: item?.functionalEvaluation,
    pulse: item?.pulse !== null ? Number(item?.pulse) : undefined,
    oxygenSaturation: item?.oxygenSaturation !== null ? Number(item?.oxygenSaturation) : undefined,
    systolicPressure: item?.systolicPressure !== null ? Number(item?.systolicPressure) : undefined,
    diastolicPressure: item?.diastolicPressure !== null ? Number(item?.diastolicPressure) : undefined,
    antecedentFamily: item?.antecedentFamily,
    examComplementary: item?.complementaryTest,
  };

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
