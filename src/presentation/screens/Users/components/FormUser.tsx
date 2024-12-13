import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useGetAllRoles } from "../../../querys/rol/rol.query";
import { HiSelector } from "react-icons/hi";
import { useFormikUser } from "../hooks/useFormikUser";
import { useEffect } from "react";
import { useUserStore } from "../store/user.store";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";

export function FormUser() {

  const { data: dataRoles, status: statusGetRoles } = useGetAllRoles();

  const {
    errors,
    handleSubmit,
    setFieldValue,
    values,
    addUserStatus,
    updateUserStatus,
  } = useFormikUser();

  const { modeForm, toggleForm } = useUserStore();

  useEffect(() => {
    if (addUserStatus === "success" || updateUserStatus === "success") {
      toggleForm();
    }
  }, [addUserStatus, updateUserStatus]);

  const isLoadingRoles = statusGetRoles === "pending";
  const isLoadingAddUser = addUserStatus === "pending";
  const isLoadingUpdateUser = updateUserStatus === "pending";

  const isCreateMode = modeForm === MODEFORMENUM.CREATE;

  const {
    Name: nameError,
    Email: emailError,
    Rol: rolError,
  } = errors;

  return (
    <div className="flex flex-col gap-4">
      <Input
        isRequired
        isInvalid={!!nameError}
        errorMessage={nameError}
        value={values.Name}
        onChange={(e) => setFieldValue("Name", e.target.value)}
        size="sm"
        label="Nombre"
        disabled={isLoadingAddUser || isLoadingUpdateUser}
      />
      {isCreateMode && (
        <Input
          isInvalid={!!emailError}
          errorMessage={emailError}
          value={values.Email}
          isRequired
          onChange={(e) => setFieldValue("Email", e.target.value)}
          size="sm"
          label="Correo"
          disabled={isLoadingAddUser}
        />
      )}
      <Select
        isInvalid={!!rolError}
        errorMessage={rolError}
        label="Rol"
        disableSelectorIconRotation
        disabled={isLoadingRoles || isLoadingAddUser || isLoadingUpdateUser}
        required
        selectorIcon={<HiSelector />}
        defaultSelectedKeys={[values.Rol ?? ""]}
        onChange={(e) => setFieldValue("Rol", e.target.value)}
      >
        {(dataRoles ?? []).map((roles) => (
          <SelectItem key={roles.id}>{roles.name}</SelectItem>
        ))}
      </Select>
      <div className="flex flex-row gap-4 justify-end items-center">
        <Button
          onClick={() => handleSubmit()}
          isLoading={isLoadingAddUser || isLoadingUpdateUser}
          disabled={isLoadingRoles}
          color="primary"
        >
          Guardar
        </Button>
      </div>
    </div>
  );
}
