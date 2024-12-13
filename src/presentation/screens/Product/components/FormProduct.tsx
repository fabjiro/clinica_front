import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

import { useGetAllCategories } from "../../Category/query/category.query";
import { HiSelector } from "react-icons/hi";
import { useFilePicker } from "use-file-picker";
import { MdClear } from "react-icons/md";
import { FaFileImage } from "react-icons/fa";
import { useFormikProduct } from "../hooks/useFormikProduct";
import { FileUtils } from "../../../../utils/file.utils";
import { useEffect } from "react";
import { useProductStore } from "../store/product.store";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";

export function FormProduct() {
  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    addProductStatus,
    updateProductStatus,
  } = useFormikProduct();
  const { openFilePicker, plainFiles, loading, clear } = useFilePicker({
    accept: ".png, .jpg, .jpeg",
    multiple: false,
  });

  // fetchs
  const { data: dataCategory, status: statusGetCategory } =
    useGetAllCategories();

  const { toggleForm, modeForm } = useProductStore();

  useEffect(() => {
    if (addProductStatus === "success" || updateProductStatus === "success") {
      clear();
      toggleForm();
    }
  }, [addProductStatus, updateProductStatus]);

  useEffect(() => {
    if (plainFiles.length > 0) {
      (async () => {
        setFieldValue(
          "image",
          await FileUtils.convertFileToBase64(plainFiles[0])
        );
      })();
    }
  }, [plainFiles]);

  const {
    name: nameError,
    categoryId: categoryError,
    price: priceError,
    stock: stockError,
  } = errors;

  const isLoadingGetCategory = statusGetCategory === "pending";
  const isLoadingAddProduct = addProductStatus === "pending";
  const isLoadingUpdateProduct = updateProductStatus === "pending";

  const formModeCreate = modeForm === MODEFORMENUM.CREATE;

  return (
    <div className="flex flex-col gap-4">
      <Input
        isRequired
        isInvalid={!!nameError}
        errorMessage={nameError}
        value={values.name}
        onChange={(e) => setFieldValue("name", e.target.value)}
        size="sm"
        label="Nombre"
        disabled={isLoadingAddProduct || isLoadingUpdateProduct}
      />
      <Textarea
        label="Descripción"
        onChange={(e) => setFieldValue("description", e.target.value)}
        disabled={isLoadingAddProduct || isLoadingUpdateProduct}
      />
      <Input
        isInvalid={!!priceError}
        errorMessage={priceError}
        value={values.price?.toString() || ""}
        onChange={(e) => {
          const value = e.target.value;

          if (value.trim() === "") {
            setFieldValue("price", undefined); // O puedes usar null si prefieres
            return;
          }

          // Si el valor no está vacío, convertimos el texto a número
          const parsedValue = Number(value);

          // Solo actualizamos si el valor es un número válido
          if (!isNaN(parsedValue)) {
            setFieldValue("price", parsedValue);
          }
        }}
        size="sm"
        label="Precio"
        type="number"
        min={0}
        disabled={isLoadingAddProduct || isLoadingUpdateProduct}
      />
      <Input
        isInvalid={!!stockError}
        errorMessage={stockError}
        value={values.stock?.toString() || ""}
        onChange={(e) => {
          const value = e.target.value;

          if (value.trim() === "") {
            setFieldValue("stock", undefined); // O puedes usar null si prefieres
            return;
          }

          // Si el valor no está vacío, convertimos el texto a número
          const parsedValue = Number(value);

          // Solo actualizamos si el valor es un número válido
          if (!isNaN(parsedValue)) {
            setFieldValue("stock", parsedValue);
          }
        }}
        size="sm"
        label="Stock"
        type="number"
        inputMode="numeric"
        disabled={
          isLoadingAddProduct || isLoadingUpdateProduct || !formModeCreate
        }
      />
      <Select
        label="Categorias"
        isInvalid={!!categoryError}
        errorMessage={categoryError}
        disableSelectorIconRotation
        disabled={
          isLoadingGetCategory || isLoadingAddProduct || isLoadingUpdateProduct
        }
        selectorIcon={<HiSelector />}
        isRequired
        defaultSelectedKeys={[values.categoryId ?? ""]}
        value={values.categoryId}
        onChange={(e) => setFieldValue("categoryId", e.target.value)}
      >
        {(dataCategory ?? []).map((category) => (
          <SelectItem key={category.id}>{category.name}</SelectItem>
        ))}
      </Select>
      <div className="flex flex-row gap-2 items-center">
        {plainFiles.length > 0 && (
          <>
            <Image
              isBlurred
              src={values.image}
              className="rounded-md w-16 h-16 object-contain"
            />
            <Button
              isIconOnly
              color="danger"
              variant="flat"
              onClick={() => {
                clear();
                setFieldValue("image", undefined);
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
          disabled={isLoadingAddProduct || isLoadingUpdateProduct}
        >
          Imagen
        </Button>
      </div>
      <div className="flex flex-row gap-4 justify-end items-center">
        <Button
          onClick={() => handleSubmit()}
          isLoading={isLoadingAddProduct || isLoadingUpdateProduct}
          color="primary"
        >
          Guardar
        </Button>
      </div>
    </div>
  );
}
