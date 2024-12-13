import { Input, Button } from "@nextui-org/react";
import { useFormikCategory } from "../hooks/useFormikCategory";
import { useCategoryStore } from "../store/category.store";
import { useEffect } from "react";

export function CategoryForm() {
  const { values, errors, setFieldValue, handleSubmit, createCategoryStatus, updateCategoryStatus } =
    useFormikCategory();
  const handleToggleModal = useCategoryStore((state) => state.toggleForm);

  const { name: nameError } = errors;

  const isLoadingAddCategory = createCategoryStatus === "pending";
  const isLoadingUpdateCategory = updateCategoryStatus === "pending";

  useEffect(() => {
    if (createCategoryStatus === "success" || updateCategoryStatus === "success") {
      handleToggleModal();
    }
  }, [createCategoryStatus, updateCategoryStatus]);

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
        disabled={isLoadingAddCategory || isLoadingUpdateCategory}
      />
      <div className="flex flex-row gap-4 justify-end items-center">
        <Button
          onClick={() => handleSubmit()}
          isLoading={isLoadingAddCategory || isLoadingUpdateCategory}
          color="primary"
        >
          Guardar
        </Button>
      </div>
    </div>
  );
}
