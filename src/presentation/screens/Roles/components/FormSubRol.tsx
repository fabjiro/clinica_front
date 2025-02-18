import {
  Autocomplete,
  AutocompleteItem,
  Button,
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
        {/* <Autocomplete
            isLoading={isLoadingGroup}
            isRequired
            defaultItems={DataGroup ?? []}
            label="Grupos"
            size="sm"
            isInvalid={!!groupError}
            errorMessage={groupError}
            selectedKey={values.group}
            onSelectionChange={(e) => setFieldValue("group", e)}
            >
            {(item) => (
                <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
            )}
            </Autocomplete> */}
        {/* <Select
          isInvalid={!!rolError}
          errorMessage={rolError}
          label="Rol"
          disableSelectorIconRotation
          disabled={isLoadingRoles}
          required
          selectorIcon={<HiSelector />}
          defaultSelectedKeys={[values.rolId ?? ""]}
          onChange={(e) => setFieldValue("Rol", e.target.value)}
        >
          {(dataRoles ?? []).map((roles) => (
            <SelectItem key={roles.id}>{roles.name}</SelectItem>
          ))}
        </Select> */}
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
          label="Nuevo Sub-Rol"
        />
      </div>

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
