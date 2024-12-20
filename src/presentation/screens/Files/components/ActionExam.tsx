import {
    Dropdown,
    DropdownTrigger,
    Button,
    DropdownMenu,
    DropdownItem,
  } from "@nextui-org/react";
  import { FaEllipsisVertical } from "react-icons/fa6";
  import { MdEdit, MdDelete } from "react-icons/md";
//   import { usePatientStore } from "../store/patient.store";
//   import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";
//   import { useQueryClient } from "@tanstack/react-query";
//   import { IPatient } from "../../../../interfaces/patient.interface";
//   import { useConfirmStore } from "../../../storage/confim.storage";
//   import { useDeletePatient } from "../query/patient.query";
  
  interface IProps {
    id: string;
  }
  
  export function ActionExam({ id }: IProps) {
    // const { toggleForm, setModeForm, setPatient } = usePatientStore();
    // const { status: statusDeletePatient, mutate: handleDeletePatient } =
    //   useDeletePatient();
    // const clientQuery = useQueryClient();
    // const showConfirm = useConfirmStore((state) => state.showConfirm);
  
    const handleUpdate = () => {
    //   const patient = (
    //     clientQuery.getQueryData<IPatient[]>(["getAllPatient"]) ?? []
    //   ).find((patient) => patient.id === id);
  
    //   if (!patient) return;
  
    //   setPatient(patient);
    //   setModeForm(MODEFORMENUM.UPDATE);
    //   toggleForm();
    console.log(id)
    };
  
    // const handleDelete = () => {
    // //   showConfirm("Eliminar", "¿Desea eliminar el paciente?", () => {
    // //     handleDeletePatient(id);
    // //   });
    // };
  
    return (
      <div className="flex flex-row gap-2 items-center justify-center h-full w-full">
        <Dropdown backdrop="blur" className="rounded-md">
          <DropdownTrigger>
            <Button
            //   isLoading={statusDeletePatient === "pending"}
              size="sm"
              isIconOnly
              variant="light"
            >
              <FaEllipsisVertical />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              showDivider
              startContent={<MdEdit />}
              key="edit"
              onClick={handleUpdate}
            >
              Editar
            </DropdownItem>
            <DropdownItem
              className="text-danger"
              color="danger"
              key="edit"
              startContent={<MdDelete />}
            //   onClick={handleDelete}
            >
              Eliminar
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
  