import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";
import { useConfirmStore } from "../../../storage/confim.storage";
import { useDeleteProduct } from "../query/product.query";
import { useProductStore } from "../store/product.store";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";
import { useQueryClient } from "@tanstack/react-query";
import { ProductEntity } from "../../../../domain/entity/product/product.entity";
import { CiBarcode } from "react-icons/ci";

interface IProps {
  id: string;
}
export function ActionProduct({ id }: IProps) {
  const queryClient = useQueryClient();
  const handlerConfirmModal = useConfirmStore((state) => state.showConfirm);
  const { mutate: handleDeleteProduct, status: statusDelete } =
    useDeleteProduct();
  const { setModeForm, toggleForm, setProduct, toggleDialogBarCode } =
    useProductStore();

  const handlerClickDelete = () => {
    handlerConfirmModal("Eliminar", "¿Desea eliminar el producto?", () =>
      handleDeleteProduct(id)
    );
  };

  const handleClickEdit = () => {
    const product = (
      queryClient.getQueryData<ProductEntity[]>(["getAllProducts"]) ?? []
    ).find((product: any) => product.id === id);

    if (!product) return;

    setProduct(product);
    setModeForm(MODEFORMENUM.UPDATE);
    toggleForm();
  };

  const handlerClickBarCode = () => {
    const product = (
      queryClient.getQueryData<ProductEntity[]>(["getAllProducts"]) ?? []
    ).find((product: any) => product.id === id);

    if (!product) return;

    setProduct(product);
    toggleDialogBarCode();
  };

  const isLoadingDeleteProduct = statusDelete === "pending";

  return (
    <div className="flex flex-row gap-2 items-center justify-center h-full w-full">
      <Dropdown backdrop="blur" className="rounded-md">
        <DropdownTrigger>
          <Button
            isLoading={isLoadingDeleteProduct}
            size="sm"
            isIconOnly
            variant="light"
          >
            <FaEllipsisVertical />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            onClick={handlerClickBarCode}
            startContent={<CiBarcode />}
            key="barcode"
          >
            Barra de codigo
          </DropdownItem>
          <DropdownItem
            onClick={handleClickEdit}
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
            onClick={handlerClickDelete}
          >
            Eliminar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
