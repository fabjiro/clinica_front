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

export function FormConsult() {
  const { data: allPatient, status: statusGetAllPatient } = useGetAllPatient();
  const { data: allExamns, status: statusGetAllExam } = useGetExam();

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
          // isInvalid={!!groupError}
          // errorMessage={groupError}
          // selectedKey={values.group}
          // onSelectionChange={(e) => setFieldValue("group", e)}
        >
          {(item) => (
            <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
          )}
        </Autocomplete>
        <div className="flex flex-row gap-4">
          <Textarea label="Motivo" />
          <Textarea label="Historial clinico" />
        </div>
        <Divider />
        <h1 className="text-2xl font-semibold">Evaluacion Geriatrica</h1>
        <div className="flex flex-row gap-4">
          <Textarea label="Biologico" />
          <Textarea label="Psicologico" />
          <Textarea label="Socual" />
          <Textarea label="Funcional" />
        </div>
        <div className="flex flex-row gap-4">
          <Input isRequired size="sm" label="Peso" endContent="Kg" />
          <Input isRequired size="sm" label="Talla" endContent="Cm" />
          <Input size="sm" label="Pulso" endContent="Lpm" />
          <Input size="sm" label="Sturacion de oxigeno" endContent="%" />
        </div>
        <div className="flex flex-col">
          <h1>Presion arterial</h1>
          <div className="flex flex-row w-1/4 gap-4">
            <Input size="sm" label="Sistolica" />
            {/* <Button variant="light">/</Button> */}
            <Input size="sm" label="Diastolica" />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <Textarea label="Antecendentes Personlaes" />
          <Textarea label="Antecendentes Familiares" />
        </div>
        <div className="flex flex-row gap-4">
          <Autocomplete
            isLoading={isLoading}
            defaultItems={allExamns ?? []}
            label="Examen complemantarios"
            size="sm"
            // isInvalid={!!groupError}
            // errorMessage={groupError}
            // selectedKey={values.group}
            // onSelectionChange={(e) => setFieldValue("group", e)}
          >
            {(item) => (
              <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
            )}
          </Autocomplete>
          <Textarea isRequired label="Diagnostico" />
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
          <DatePicker isRequired label="Proxima cita" />;
        </div>
        <Textarea label="Receta" />

        <div className="flex flex-row gap-4 justify-end items-center">
          {/* <Button onClick={() => toggleForm()}>Cancelar</Button> */}
          <Button
            //   onClick={() => handleSubmit()}
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
