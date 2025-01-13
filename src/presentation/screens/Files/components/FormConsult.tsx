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
import {parseDate } from "@internationalized/date";
import moment from "moment";

export function FormConsult() {
  const { data: allPatient, status: statusGetAllPatient } = useGetAllPatient();
  const { data: allExamns, status: statusGetAllExam } = useGetExam();

  const { values, errors, setFieldValue, handleSubmit } = useFormikConsult();

  const { openFilePicker, plainFiles, loading, clear } = useFilePicker({
    accept: ".png, .jpg, .jpeg",
    multiple: false,
  });

  const isLoading =
    statusGetAllPatient === "pending" || statusGetAllExam === "pending";

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
          />
          <Textarea
            onChange={(e) =>
              setFieldValue("psychologicalEvaluation", e.target.value)
            }
            label="Psicologico"
          />
          <Textarea
            onChange={(e) => setFieldValue("socialEvaluation", e.target.value)}
            label="Social"
          />
          <Textarea
            onChange={(e) =>
              setFieldValue("functionalEvaluation", e.target.value)
            }
            label="Funcional"
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
          />
          <Input
            onChange={(e) => setFieldValue("oxygenSaturation", e.target.value)}
            size="sm"
            label="Saturacion de oxigeno"
            endContent="%"
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
            />
            {/* <Button variant="light">/</Button> */}
            <Input
              onChange={(e) =>
                setFieldValue("diastolicPressure", e.target.value)
              }
              size="sm"
              label="Diastolica"
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
          />
        </div>
        <div className="flex flex-row gap-4">
          <Autocomplete
            isLoading={isLoading}
            defaultItems={allExamns ?? []}
            label="Examen complementario"
            size="sm"
            onSelectionChange={(e) => setFieldValue("examComplementary", e)}
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
            Imagen del examen
          </Button>
          <DatePicker
            isRequired
            label="Proxima cita"
            value={values.nextappointment && parseDate(moment.utc(values.nextappointment).format("YYYY-MM-DD")) || undefined}
            isInvalid={!!errors.nextappointment}
            errorMessage={errors.nextappointment}
            onChange={(e) => setFieldValue("nextappointment", e?.toString())}
            hideTimeZone={true}
            granularity="day"

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
          {/* <Button onClick={() => toggleForm()}>Cancelar</Button> */}
          <Button
            onClick={() => handleSubmit()}
            isLoading={isLoading}
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
