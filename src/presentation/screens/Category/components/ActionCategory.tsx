import { Button, Tooltip } from "@nextui-org/react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDeleteCategory } from "../query/category.query";
import { useConfirmStore } from "../../../storage/confim.storage";
import { useQueryClient } from "@tanstack/react-query";
import { CategoryEntity } from "../../../../domain/entity/category/category.entity";
import { useCategoryStore } from "../store/category.store";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";

interface IProps {
  id: string;
}
export function ActionCategory({ id }: IProps) {
  const queryClient = useQueryClient();
  const { mutate: handleDeleteCategory, status: statusDelete } =
    useDeleteCategory();
  
  const { setCategory, setModeForm, toggleForm } = useCategoryStore();

  const showModalConfirm = useConfirmStore((state) => state.showConfirm);

  const handleEditCategory = () => {
    const category = (queryClient.getQueryData<CategoryEntity[]>(["getAllCategories"]) ?? []).find(
      category => category.id === id
    );

    if(!category) return;

    setCategory(category);
    setModeForm(MODEFORMENUM.UPDATE);
    toggleForm();
  };

  const isLoadingDelete = statusDelete === "pending";

  return (
    <div className="flex flex-row gap-2 items-center h-full w-full">
      <Tooltip content="Editar">
        <Button onClick={handleEditCategory} disabled={isLoadingDelete} isIconOnly>
          <MdEdit />
        </Button>
      </Tooltip>
      <Tooltip content="Eliminar">
        <Button
          isLoading={isLoadingDelete}
          onClick={() =>
            showModalConfirm("Eliminar", "¿Desea eliminar la categoria?", () =>
              handleDeleteCategory(id)
            )
          }
          isIconOnly
          color="danger"
        >
          <MdDelete />
        </Button>
      </Tooltip>
    </div>
  );
}
