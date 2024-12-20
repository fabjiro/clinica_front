import { Autocomplete, AutocompleteItem, Button, Input } from "@nextui-org/react";
import { useGroupsStore } from "../store/groups.store";
import { useGetGroup } from "../query/group.query"



export function FormExam() {

    const {toggleForm: toggleFormGroup} = useGroupsStore();
    const { data: DataGroup, isLoading: isLoadingGroup } = useGetGroup();

    return (
        <div className="flex flex-col gap-4 ">
            <div className="flex flex-row gap-2">
                <Autocomplete
            isLoading={isLoadingGroup}
            isRequired
            defaultItems={DataGroup ?? []}
            label="Grupos"
            size="sm"
            //   isInvalid={!!civilStatusError}
            //   errorMessage={civilStatusError}
            //   selectedKey={values.civilStatus}
            //   onSelectionChange={(e) => setFieldValue("civilStatus", e)}
            >
            {(item) => (
                <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
            )}
            </Autocomplete>
            <Input
            isRequired
            //   isInvalid={!!contactPhoneError}
            //   errorMessage={contactPhoneError}
            //   value={values.contactPhone}
            //   onChange={(e) => setFieldValue("contactPhone", e.target.value)}
            size="sm"
            label="Nuevo examen"
            // disabled={isLoadingAddUser || isLoadingUpdateUser}
            />
            
        </div>
            
        <div className="flex flex-row gap-4 justify-end items-center">

        <Button onClick={() => toggleFormGroup()}>Cancelar</Button>
        <Button
            // onClick={() => handleSubmit()}
            // isLoading={isLoadingAddPatient || isLoadingUpdatePatient}
          //   disabled={isLoadingRoles}
          color="primary"
        >
          Guardar
        </Button>
        </div>
        
        </div>
    )
}