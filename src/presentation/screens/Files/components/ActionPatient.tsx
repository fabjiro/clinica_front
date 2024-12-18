import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";
import { usePatientStore } from "../store/patient.store";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";
import { useQueryClient } from "@tanstack/react-query";
import { IPatient } from "../../../../interfaces/patient.interface";

interface IProps {
  id: string;
}

export function ActionPatient({ id }: IProps) {
  const { toggleForm, setModeForm, setPatient } = usePatientStore();
  const clientQuery = useQueryClient();

  const handleUpdate = () => {

    const patient = (clientQuery.getQueryData<IPatient[]>(["getAllPatient"]) ?? []).find(
      (patient) => patient.id === id
    );

    console.log((clientQuery.getQueryData<IPatient[]>(["patient"]) ?? []));
    console.log(id);
    console.log(patient)

    if(!patient) return;

    setPatient(patient);
    setModeForm(MODEFORMENUM.UPDATE);
    toggleForm();
  };

  return (
    <div className="flex flex-row gap-2 items-center justify-center h-full w-full">
      <Dropdown backdrop="blur" className="rounded-md">
        <DropdownTrigger>
          <Button size="sm" isIconOnly variant="light">
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
          >
            Eliminar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
