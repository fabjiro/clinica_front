import { Autocomplete, AutocompleteItem, Button, Input } from "@nextui-org/react";
import { useGroupsStore } from "../store/groups.store";
import { useGetGroup } from "../query/group.query"
import { useFormikExam } from "../hooks/useFormikExam";




export function FormExam() {

    const {toggleForm: toggleFormGroup} = useGroupsStore();
    const { data: DataGroup, isLoading: isLoadingGroup } = useGetGroup();
    const { errors, values, handleSubmit, setFieldValue } = useFormikExam();

    const {
        group: groupError,
        name: nameError,
      } = errors;
      
    // const isLoadingUpdateExam = statusUpdatePatient === "pending";
    // const isLoadingAddExam = statusAddPatient === "pending";

    // useEffect(() => {
    //     if(statusAddExam == "success" || statusUpdateExam == "success"){ 
    //         toggleFormGroup();
    //     }
    //   },[statusAddExam, statusUpdateExam])


    return (
        <div className="flex flex-col gap-4 ">
            <div className="flex flex-row gap-2">
                <Autocomplete
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
            </Autocomplete>
            <Input
            isRequired
            isInvalid={!!nameError}
            errorMessage={nameError}
            value={values.name}
              onChange={(e) => setFieldValue("name", e.target.value)}
            size="sm"
            label="Nuevo examen"
            // disabled={isLoadingAddUser || isLoadingUpdateUser}
            />
            
        </div>
            
        <div className="flex flex-row gap-4 justify-end items-center">

        <Button onClick={() => toggleFormGroup()}>Cancelar</Button>
        <Button
            onClick={() => handleSubmit()}
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