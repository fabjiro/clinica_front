import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoMdDocument } from "react-icons/io";
import { useConfirmStore } from "../../../storage/confim.storage";
import { useDeleteConsult } from "../../Files/query/consult.query";
import { useQueryClient } from "@tanstack/react-query";
import { IConsult } from "../../../../interfaces/consult.interface";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";
import { useConsutlFormStore } from "../../../storage/form.storage";
import { useParams } from "react-router-dom";

interface IProps {
  id: string;
}

export function ActionConsult({ id }: IProps) {
  const { mutate: handleDeleteConsult, status: statusDelete } =
    useDeleteConsult();
  const { patientId } = useParams();
  const showConfirm = useConfirmStore((state) => state.showConfirm);
  const clientQuery = useQueryClient();
  const { toggleForm, setItem, setModeForm } = useConsutlFormStore();

  const handleUpdate = () => {
    const consult = (
      clientQuery.getQueryData<IConsult[]>(["getConsultByPatientId", patientId]) ?? []
    ).find((param) => param.id === id);

    if (!consult) return;

    setItem(consult);
    setModeForm(MODEFORMENUM.UPDATE);
    toggleForm();
  };

  const handleDelete = () => {
    showConfirm("Eliminar", "¿Desea eliminar el consulta?", () => {
      handleDeleteConsult(id);
    });
  };

  const isLoading = statusDelete === "pending";

  return (
    <div className="flex flex-row gap-2 items-center justify-center h-full w-full">
      <Dropdown backdrop="blur" className="rounded-md">
        <DropdownTrigger>
          <Button isLoading={isLoading} size="sm" isIconOnly variant="light">
            <FaEllipsisVertical />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            startContent={<HiOutlineClipboardDocumentList />}
            key="edit"
          >
            Generar Receta
          </DropdownItem>
          <DropdownItem startContent={<IoMdDocument />} key="edit">
            Generar Consulta
          </DropdownItem>
          <DropdownItem
            onPress={handleUpdate}
            showDivider
            startContent={<MdEdit />}
            key="edit"
          >
            Editar
          </DropdownItem>
          <DropdownItem
            className="text-danger"
            color="danger"
            key="edit"
            startContent={<MdDelete />}
            onPress={handleDelete}
          >
            Eliminar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
