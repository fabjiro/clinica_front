import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  User,
} from "@nextui-org/react";
import { HiSelector } from "react-icons/hi";
import { useGetAllProducts } from "../../Product/query/product.query";
import { useFormikInventory } from "../hooks/useFormikInventory";
import { useEffect } from "react";
import { useInventoryStore } from "../store/inventory.store";

export function FormHistory() {
  const { data: products, status: statusGetAllProduct } = useGetAllProducts();

  const { errors, setFieldValue, submitForm, addInventoryStatus } =
    useFormikInventory();
  const toggleFormInventory = useInventoryStore((state) => state.toggleForm);

  useEffect(() => {
    if (addInventoryStatus === "success") {
      toggleFormInventory();
    }
  }, [addInventoryStatus]);

  const { product: ProductError, count: CountError } = errors;
  const isLoadingInventoryStatus = addInventoryStatus === "pending";
  const isLoadingGetAllProduct = statusGetAllProduct === "pending";

  return (
    <div className="flex flex-col gap-4">
      <Autocomplete
        errorMessage={ProductError}
        isInvalid={!!ProductError}
        placeholder="Buscar producto"
        defaultItems={products ?? []}
        labelPlacement="outside"
        disableSelectorIconRotation
        selectorIcon={<HiSelector />}
        fullWidth
        isRequired
        isLoading={isLoadingGetAllProduct}
        disabled={isLoadingInventoryStatus}
        onSelectionChange={(value) => {
          setFieldValue("product", value);
        }}
      >
        {(item) => (
          <AutocompleteItem key={item.id} textValue={item.name}>
            <User
              className="p-0"
              name={item.name}
              avatarProps={{
                src: item.image?.compactUrl,
              }}
            />
          </AutocompleteItem>
        )}
      </Autocomplete>

      <Input
        isInvalid={!!CountError}
        errorMessage={CountError}
        onChange={(e) => {
          const value = e.target.value;

          if (value.trim() === "") {
            setFieldValue("count", undefined); // O puedes usar null si prefieres
            return;
          }

          // Si el valor no está vacío, convertimos el texto a número
          const parsedValue = Number(value);

          // Solo actualizamos si el valor es un número válido
          if (!isNaN(parsedValue)) {
            setFieldValue("count", parsedValue);
          }
        }}
        size="sm"
        label="Cantidad"
        type="number"
        inputMode="numeric"
        isDisabled={isLoadingInventoryStatus}
      />

      <div className="flex flex-row gap-4 justify-end items-center">
        <Button
          isLoading={isLoadingInventoryStatus}
          disabled={isLoadingInventoryStatus}
          onClick={submitForm}
          color="primary"
        >
          Guardar
        </Button>
      </div>
    </div>
  );
}
