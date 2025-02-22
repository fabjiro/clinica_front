import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";

// import { useFormikExam } from "../hooks/useFormikExam";
import { useEffect } from "react";
import { useSubRolStore } from "../store/subrol.store";
import { useFormikSubRol } from "../hooks/useFormikSubRol";
import { useGetAllRoles } from "../../../querys/rol/rol.query";
import { HiSelector } from "react-icons/hi";

export function FormSubRol() {
  const { toggleForm: toggleFormSubRol } = useSubRolStore();

  const { data: dataRoles, status: statusGetRoles } = useGetAllRoles();
  const isLoadingRoles = statusGetRoles === "pending";

  const {
    errors,
    values,
    handleSubmit,
    setFieldValue,
    addSubRolStatus,
    updateSubRolStatus,
  } = useFormikSubRol();

  const { rolId: rolError, name: nameError } = errors;

  // const isLoadingUpdateExam = statusUpdateExam === "pending";
  const isLoadingAddSubRol = addSubRolStatus === "pending";

  useEffect(() => {
    if (addSubRolStatus == "success" || updateSubRolStatus === "success") {
      toggleFormSubRol();
    }
  }, [addSubRolStatus, updateSubRolStatus]);

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-row gap-2">
        <Autocomplete
          isLoading={isLoadingRoles}
          isRequired
          defaultItems={dataRoles ?? []}
          label="Roles"
          size="sm"
          isInvalid={!!rolError}
          errorMessage={rolError}
          selectedKey={values.rolId ?? ""}
          onSelectionChange={(e) => setFieldValue("rolId", e)}
        >
          {(item) => (
            <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
          )}
        </Autocomplete>
        <Input
          isRequired
          isInvalid={!!nameError}
          errorMessage={nameError}
          value={values.name}
          onChange={(e) => setFieldValue("name", e.target.value)}
          size="sm"
          label="Nombre Sub-Rol"
        />
      </div>

      <b>
        <h3>Permisos:</h3>
      </b>
      <CheckboxGroup
        defaultValue={[]}
        label="Seleccione los permisos"
        orientation="horizontal"
      >
        <Checkbox value="Dashboard">Dashboard</Checkbox>
        <Checkbox value="Expedientes">Expedientes</Checkbox>
        <Checkbox value="Usuarios">Usuarios</Checkbox>
        <Checkbox value="Roles">Roles</Checkbox>
        <Checkbox value="Reportes">Reportes</Checkbox>
        <Checkbox value="Copias de seguridad">Copias de seguridad</Checkbox>
        <Checkbox value="Pacientes">Pacientes</Checkbox>
      </CheckboxGroup>

      <div className="flex flex-row gap-4 justify-end items-center">
        <Button onPress={() => toggleFormSubRol()}>Cancelar</Button>
        <Button
          onClick={() => handleSubmit()}
          isLoading={isLoadingAddSubRol}
          color="primary"
        >
          Guardar
        </Button>
      </div>
    </div>
  );
}
