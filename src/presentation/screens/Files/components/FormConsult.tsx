import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Divider,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useGetAllPatient } from "../query/patient.query";
import { useGetExam } from "../query/exam.query";
import { FaFileImage } from "react-icons/fa6";
import { useFilePicker } from "use-file-picker";
import { useFormikConsult } from "../hooks/useFormilConsult";
import { parseAbsoluteToLocal } from "@internationalized/date";
import moment from "moment";
import { useEffect } from "react";
import { useConsutlFormStore } from "../../../storage/form.storage";
import { FileUtils } from "../../../../utils/file.utils";

export function FormConsult() {
  const { data: allPatient, status: statusGetAllPatient } = useGetAllPatient();
  const { data: allExamns, status: statusGetAllExam } = useGetExam();

  const toggleForm = useConsutlFormStore((state) => state.toggleForm);
  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    addConsultStatus,
    updateConsultStatus,
  } = useFormikConsult();

  const { openFilePicker, plainFiles, loading, clear } = useFilePicker({
    accept: ".png, .jpg, .jpeg",
    multiple: false,
  });

  const isLoading =
    statusGetAllPatient === "pending" || statusGetAllExam === "pending";

  const isLoadingUpdateConsult = updateConsultStatus === "pending";
  const isLoadingAddConsult = addConsultStatus === "pending";

  useEffect(() => {
    if (addConsultStatus === "success" || updateConsultStatus === "success") {
      toggleForm();
    }

    if (plainFiles.length > 0) {
      (async () => {
        setFieldValue(
          "imageExam",
          await FileUtils.convertFileToBase64(plainFiles[0])
        );
      })();
    }
  }, [addConsultStatus, updateConsultStatus, plainFiles]);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col gap-4 w-10/12">
        <h1 className="text-2xl font-semibold">Consulta Medica</h1>
        <Divider />
        <Autocomplete
          isLoading={isLoading}
          isRequired
          defaultItems={allPatient ?? []}
          label="Paciente"
          size="sm"
          isInvalid={!!errors.patient}
          errorMessage={errors.patient}
          selectedKey={values.patient}
          onSelectionChange={(e) => setFieldValue("patient", e)}
        >
          {(item) => (
            <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
          )}
        </Autocomplete>
        <div className="flex flex-row gap-4">
          <Textarea
            value={values.motive}
            errorMessage={errors.motive}
            isInvalid={!!errors.motive}
            onChange={(e) => setFieldValue("motive", e.target.value)}
            isRequired
            label="Motivo"
          />
          <Textarea
            onChange={(e) => setFieldValue("clinicalhistory", e.target.value)}
            label="Historial clinico"
            value={values.clinicalhistory}
          />
        </div>
        <Divider />
        <h1 className="text-2xl font-semibold">Evaluacion Geriatrica</h1>
        <div className="flex flex-row gap-4">
          <Textarea
            onChange={(e) =>
              setFieldValue("bilogicalEvaluation", e.target.value)
            }
            label="Biologico"
            value={values.bilogicalEvaluation}
          />
          <Textarea
            onChange={(e) =>
              setFieldValue("psychologicalEvaluation", e.target.value)
            }
            label="Psicologico"
            value={values.psychologicalEvaluation}
          />
          <Textarea
            onChange={(e) => setFieldValue("socialEvaluation", e.target.value)}
            label="Social"
            value={values.socialEvaluation}
          />
          <Textarea
            onChange={(e) =>
              setFieldValue("functionalEvaluation", e.target.value)
            }
            label="Funcional"
            value={values.functionalEvaluation}
          />
        </div>
        <div className="flex flex-row gap-4">
          <Input
            isInvalid={!!errors.weight}
            errorMessage={errors.weight}
            isRequired
            size="sm"
            label="Peso"
            endContent="Kg"
            value={values.weight?.toString()}
            onChange={(e) => setFieldValue("weight", e.target.value)}
          />
          <Input
            isInvalid={!!errors.size}
            errorMessage={errors.size}
            isRequired
            size="sm"
            label="Talla"
            endContent="Cm"
            value={values.size?.toString()}
            onChange={(e) => setFieldValue("size", e.target.value)}
          />
          <Input
            onChange={(e) => setFieldValue("pulse", e.target.value)}
            size="sm"
            label="Pulso"
            endContent="Lpm"
            value={values.pulse?.toString()}
          />
          <Input
            onChange={(e) => setFieldValue("oxygenSaturation", e.target.value)}
            size="sm"
            label="Saturacion de oxigeno"
            endContent="%"
            value={values.oxygenSaturation?.toString()}
          />
        </div>
        <div className="flex flex-col">
          <h1>Presion arterial</h1>
          <div className="flex flex-row w-1/4 gap-4">
            <Input
              onChange={(e) =>
                setFieldValue("systolicPressure", e.target.value)
              }
              size="sm"
              label="Sistolica"
              value={values.systolicPressure?.toString()}
            />
            {/* <Button variant="light">/</Button> */}
            <Input
              onChange={(e) =>
                setFieldValue("diastolicPressure", e.target.value)
              }
              size="sm"
              label="Diastolica"
              value={values.diastolicPressure?.toString()}
            />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <Textarea
            isRequired
            isInvalid={!!errors.antecedentPerson}
            errorMessage={errors.antecedentPerson}
            value={values.antecedentPerson}
            onChange={(e) => setFieldValue("antecedentPerson", e.target.value)}
            label="Antecendentes Personales"
          />
          <Textarea
            onChange={(e) => setFieldValue("antecedentFamily", e.target.value)}
            label="Antecendentes Familiares"
            value={values.antecedentFamily}
          />
        </div>
        <div className="flex flex-row gap-4">
          <Autocomplete
            isLoading={isLoading}
            defaultItems={allExamns ?? []}
            label="Examen complementario"
            size="sm"
            onSelectionChange={(e) => setFieldValue("examComplementary", e)}
            defaultSelectedKey={values.examComplementary}
          >
            {(item) => (
              <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
            )}
          </Autocomplete>
          <Textarea
            isRequired
            label="Diagnostico"
            isInvalid={!!errors.diagnostic}
            errorMessage={errors.diagnostic}
            value={values.diagnostic}
            onChange={(e) => setFieldValue("diagnostic", e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-4">
          <Button
            variant="flat"
            onPress={openFilePicker}
            isLoading={loading}
            startContent={<FaFileImage />}
            color="primary"
            fullWidth
            // disabled={isLoadingAddProduct || isLoadingUpdateProduct}
          >
            {" "}
            Examen
          </Button>
          <DatePicker
            isRequired
            label="Proxima cita"
            showMonthAndYearPickers
            value={
              (values.nextappointment &&
                parseAbsoluteToLocal(values.nextappointment)) ||
              undefined
            }
            isInvalid={!!errors.nextappointment}
            errorMessage={errors.nextappointment}
            onChange={(e) => {
              if (e?.toAbsoluteString) {
                setFieldValue("nextappointment", e?.toAbsoluteString());
              } else {
                setFieldValue("nextappointment", new Date(e?.toString()!).toISOString());
              }
            }}
            hideTimeZone={true}
            // granularity="day"
          />
        </div>
        <Textarea
          isRequired
          label="Receta"
          isInvalid={!!errors.recipe}
          errorMessage={errors.recipe}
          value={values.recipe}
          onChange={(e) => setFieldValue("recipe", e.target.value)}
        />

        <div className="flex flex-row gap-4 justify-end items-center">
          <Button onClick={() => toggleForm()}>Cancelar</Button>
          <Button
            onClick={() => handleSubmit()}
            isLoading={
              isLoading || isLoadingAddConsult || isLoadingUpdateConsult
            }
            //   disabled={isLoadingRoles}
            color="primary"
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
}
