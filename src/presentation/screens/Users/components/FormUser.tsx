import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useGetAllRoles } from "../../../querys/rol/rol.query";
import { useGetAllStatus } from "../../../querys/status/status.query";
import { HiSelector } from "react-icons/hi";
import { useFormikUser } from "../hooks/useFormikUser";
import { useFilePicker } from "use-file-picker";
import { FaFileImage } from "react-icons/fa";
import { Image } from "@nextui-org/react";
import { useEffect } from "react";
import { FileUtils } from "../../../../utils/file.utils";
import { MdClear } from "react-icons/md";
import { useUserStore } from "../store/user.store";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";

export function FormUser() {
  const { openFilePicker, plainFiles, loading, clear } = useFilePicker({
    accept: ".png, .jpg, .jpeg",
    multiple: false,
  });

  const { data: dataRoles, status: statusGetRoles } = useGetAllRoles();
  const { data: dataStatus, status: statusGetStatus } = useGetAllStatus();

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
    if (plainFiles.length > 0) {
      (async () => {
        setFieldValue(
          "Avatar",
          await FileUtils.convertFileToBase64(plainFiles[0])
        );
      })();
    }
  }, [plainFiles]);

  useEffect(() => {
    if (addUserStatus === "success" || updateUserStatus === "success") {
      toggleForm();
    }
  }, [addUserStatus, updateUserStatus]);

  const isLoadingRoles = statusGetRoles === "pending";
  const isLoadingStatus = statusGetStatus === "pending";
  const isLoadingAddUser = addUserStatus === "pending";
  const isLoadingUpdateUser = updateUserStatus === "pending";

  const isCreateMode = modeForm === MODEFORMENUM.CREATE;

  const {
    Name: nameError,
    Email: emailError,
    Rol: rolError,
    Status: statusError,
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
      <Select
        label="Status"
        isInvalid={!!statusError}
        errorMessage={statusError}
        disableSelectorIconRotation
        disabled={isLoadingStatus || isLoadingAddUser || isLoadingUpdateUser}
        selectorIcon={<HiSelector />}
        required
        defaultSelectedKeys={[values.Status ?? ""]}
        value={values.Status}
        onChange={(e) => setFieldValue("Status", e.target.value)}
      >
        {(dataStatus ?? []).map((status) => (
          <SelectItem key={status.id}>{status.name}</SelectItem>
        ))}
      </Select>
      <div className="flex flex-row gap-2 items-center">
        {plainFiles.length > 0 && (
          <>
            <Image
              isBlurred
              src={values.Avatar}
              className="rounded-md w-16 h-16 object-contain"
            />
            <Button
              isIconOnly
              color="danger"
              variant="flat"
              onClick={() => {
                clear();
                setFieldValue("Avatar", undefined);
              }}
            >
              <MdClear />
            </Button>
          </>
        )}
        <Button
          variant="flat"
          onClick={openFilePicker}
          isLoading={loading}
          startContent={<FaFileImage />}
          color="primary"
          fullWidth
          isDisabled={isLoadingAddUser || isLoadingUpdateUser}
        >
          Avatar
        </Button>
      </div>
      <div className="flex flex-row gap-4 justify-end items-center">
        <Button
          onClick={() => handleSubmit()}
          isLoading={isLoadingAddUser || isLoadingUpdateUser}
          disabled={isLoadingRoles || isLoadingStatus}
          color="primary"
        >
          Guardar
        </Button>
      </div>
    </div>
  );
}
