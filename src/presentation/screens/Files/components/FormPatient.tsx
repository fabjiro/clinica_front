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
import { useFormikPatient } from "../hooks/useFormikPatient";
import { useEffect } from "react";
import { parseDate } from "@internationalized/date";
import moment from "moment";
import toast from "react-hot-toast";
export function FormPatient() {
  const { data: DataCivilStatus, status: statusGetRoles } =
    useGetAllCivilStatus();
  const toggleForm = usePatientStore((state) => state.toggleForm);
  const {
    errors,
    values,
    handleSubmit,
    setFieldValue,
    statusAddPatient,
    statusUpdatePatient,
  } = useFormikPatient();

  const {
    name: nameError,
    identification: identificationError,
    address: addressError,
    phone: phoneError,
    civilStatus: civilStatusError,
    contactPerson: contactPersonError,
    contactPhone: contactPhoneError,
    birthday: birthdayError,
    typeSex: typeSexError,
    age: ageError,
  } = errors;

  const isLoadingCivilStatus = statusGetRoles === "pending";
  const isLoadingUpdatePatient = statusUpdatePatient === "pending";
  const isLoadingAddPatient = statusAddPatient === "pending";

  useEffect(() => {
    if (statusAddPatient == "success" || statusUpdatePatient == "success") {
      toggleForm();
    }
  }, [statusAddPatient, statusUpdatePatient]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2">
        <Input
          isRequired
          isInvalid={!!nameError}
          errorMessage={nameError}
          value={values.name}
          onChange={(e) => setFieldValue("name", e.target.value)}
          size="sm"
          label="Nombre"
          maxLength={50}
          // disabled={isLoadingAddUser || isLoadingUpdateUser}
        />
        <Input
          className="w-1/5"
          isRequired
          size="sm"
          label="Edad"
          type="number"
          isInvalid={!!ageError}
          errorMessage={ageError}
          value={values.age?.toString()}
          onChange={(e) => {
            const value = e.target.value;

            if (value.trim() === "") {
              setFieldValue("age", undefined); // O puedes usar null si prefieres
              return;
            }

            // Si el valor no está vacío, convertimos el texto a número
            const parsedValue = Number(value);

            // Solo actualizamos si el valor es un número válido
            if (!isNaN(parsedValue)) {
              setFieldValue("age", parsedValue);
            }
          }}
        />
        <Input
          isRequired
          isInvalid={!!identificationError}
          errorMessage={identificationError}
          value={values.identification}
          onChange={(e) => setFieldValue("identification", e.target.value)}
          size="sm"
          label="Identificacion"
          maxLength={16}
          // disabled={isLoadingAddUser || isLoadingUpdateUser}
        />
      </div>
      <div className="flex flex-row gap-2">
        <Input
          isRequired
          isInvalid={!!phoneError}
          errorMessage={phoneError}
          value={values.phone}
          onChange={(e) => setFieldValue("phone", e.target.value)}
          size="sm"
          label="Numero Telefono"
          maxLength={15}
          // disabled={isLoadingAddUser || isLoadingUpdateUser}
        />
        <Textarea
          isInvalid={!!addressError}
          errorMessage={addressError}
          value={values.address}
          onChange={(e) => setFieldValue("address", e.target.value)}
          size="sm"
          label="Direccion"
          maxLength={110}
          isRequired
        />
      </div>
      <div className="flex flex-row gap-2">
        <DatePicker
          isInvalid={!!birthdayError}
          errorMessage={birthdayError}
          onChange={(e) => setFieldValue("birthday", e?.toString())}
          isRequired
          size="sm"
          label="Fecha de nacimiento"
          showMonthAndYearPickers
          value={
            (values.birthday &&
              parseDate(moment.utc(values.birthday).format("YYYY-MM-DD"))) ||
            undefined
          }
          hideTimeZone={true}
          granularity="day"
        />
        <Autocomplete
          isInvalid={!!typeSexError}
          errorMessage={typeSexError}
          onSelectionChange={(e) => setFieldValue("typeSex", e)}
          isRequired
          defaultItems={SexType}
          label="Sexo"
          selectedKey={values.typeSex}
        >
          {(item) => (
            <AutocompleteItem key={item.Value}>{item.Label}</AutocompleteItem>
          )}
        </Autocomplete>
        <Autocomplete
          isLoading={isLoadingCivilStatus}
          isRequired
          defaultItems={DataCivilStatus ?? []}
          label="Estado civil"
          isInvalid={!!civilStatusError}
          errorMessage={civilStatusError}
          selectedKey={values.civilStatus}
          onSelectionChange={(e) => setFieldValue("civilStatus", e)}
        >
          {(item) => (
            <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
          )}
        </Autocomplete>
      </div>
      <div className="flex flex-row gap-2">
        <Input
          isRequired
          isInvalid={!!contactPersonError}
          errorMessage={contactPersonError}
          value={values.contactPerson}
          onChange={(e) => setFieldValue("contactPerson", e.target.value)}
          size="sm"
          label="Nombre de contacto"
          maxLength={50}
          // disabled={isLoadingAddUser || isLoadingUpdateUser}
        />
        <Input
          isRequired
          isInvalid={!!contactPhoneError}
          errorMessage={contactPhoneError}
          value={values.contactPhone}
          onChange={(e) => setFieldValue("contactPhone", e.target.value)}
          size="sm"
          label="Numero de contacto"
          maxLength={15}
          // disabled={isLoadingAddUser || isLoadingUpdateUser}
        />
      </div>
      <div className="flex flex-row gap-4 justify-end items-center">
        <Button onClick={() => toggleForm()}>Cancelar</Button>
        <Button
          onClick={() => handleSubmit()}
          isLoading={isLoadingAddPatient || isLoadingUpdatePatient}
          //   disabled={isLoadingRoles}
          color="primary"
        >
          Guardar
        </Button>
      </div>
    </div>
  );
}
