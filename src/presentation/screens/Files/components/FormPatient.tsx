import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
  Textarea,
} from "@nextui-org/react";
import { SexType } from "../../../../const/sexType.const";
import { useGetAllCivilStatus } from "../query/civilstatus.query";
import { usePatientStore } from "../store/patient.store";

export function FormPatient() {
  const { data: DataCivilStatus, status: statusGetRoles } =
    useGetAllCivilStatus();
  const toggleForm = usePatientStore((state) => state.toggleForm);

  const isLoadingCivilStatus = statusGetRoles === "pending";
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <Input
          isRequired
          // isInvalid={!!nameError}
          // errorMessage={nameError}
          // value={values.Name}
          // onChange={(e) => setFieldValue("Name", e.target.value)}
          size="sm"
          label="Nombre"
          // disabled={isLoadingAddUser || isLoadingUpdateUser}
        />
        <Input
          className="w-1/5"
          isRequired
          size="sm"
          label="Edad"
          type="number"
        />
        <Input
          isRequired
          // isInvalid={!!nameError}
          // errorMessage={nameError}
          // value={values.Name}
          // onChange={(e) => setFieldValue("Name", e.target.value)}
          size="sm"
          label="Identificacion"
          // disabled={isLoadingAddUser || isLoadingUpdateUser}
        />
      </div>
      <div className="flex flex-row gap-2">
        <Input
          isRequired
          // isInvalid={!!nameError}
          // errorMessage={nameError}
          // value={values.Name}
          // onChange={(e) => setFieldValue("Name", e.target.value)}
          size="sm"
          label="Numero"
          // disabled={isLoadingAddUser || isLoadingUpdateUser}
        />
        <Textarea size="sm" label="Direccion" isRequired />
      </div>
      <div className="flex flex-row gap-2">
        <DatePicker isRequired size="sm" label="Fecha de nacimiento" />
        <Autocomplete isRequired defaultItems={SexType} label="Sexo">
          {(item) => (
            <AutocompleteItem key={item.Value}>{item.Label}</AutocompleteItem>
          )}
        </Autocomplete>
        <Autocomplete
          isLoading={isLoadingCivilStatus}
          isRequired
          defaultItems={DataCivilStatus ?? []}
          label="Estado civil"
        >
          {(item) => (
            <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
          )}
        </Autocomplete>
      </div>
      <div className="flex flex-row gap-2">
        <Input
          isRequired
          // isInvalid={!!nameError}
          // errorMessage={nameError}
          // value={values.Name}
          // onChange={(e) => setFieldValue("Name", e.target.value)}
          size="sm"
          label="Nombre de contacto"
          // disabled={isLoadingAddUser || isLoadingUpdateUser}
        />
        <Input
          isRequired
          // isInvalid={!!nameError}
          // errorMessage={nameError}
          // value={values.Name}
          // onChange={(e) => setFieldValue("Name", e.target.value)}
          size="sm"
          label="Numero de contacto"
          // disabled={isLoadingAddUser || isLoadingUpdateUser}
        />
      </div>
      <div className="flex flex-row gap-4 justify-end items-center">
        <Button onClick={() => toggleForm()}>Cancelar</Button>
        <Button
          //   onClick={() => handleSubmit()}
          //   isLoading={isLoadingAddUser || isLoadingUpdateUser}
          //   disabled={isLoadingRoles}
          color="primary"
        >
          Guardar
        </Button>
      </div>{" "}
    </div>
  );
}
