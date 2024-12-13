import { useFormik } from "formik";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";
import { useInventoryStore } from "../store/inventory.store";
import { IInventoryReqDto } from "../../../../domain/dto/request/inventory/inventoryReqDto";
import { TypeMovementEnum } from "../../../../enum/typemovement/typemovement.enum";
import { InventorySchemaValidation } from "../schema/inventory.schema";
import { useAddInventory } from "../query/history.query";

export function useFormikInventory() {
  const { modeForm } = useInventoryStore();

  const { status: addInventoryStatus, mutate: addInventory } =
    useAddInventory();

  const isCreateMode = modeForm === MODEFORMENUM.CREATE;

  const {
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    submitForm: submitForm,
    errors,
    values,
  } = useFormik<Partial<IInventoryReqDto>>({
    initialValues: {
      product: undefined,
      count: undefined,
      TypeMovement: isCreateMode
        ? TypeMovementEnum.INPUT
        : TypeMovementEnum.ADJUSTMENT,
    },
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    validationSchema: InventorySchemaValidation(),
    onSubmit: (values) => {
      addInventory({
        product: values.product!,
        count: values.count!,
        TypeMovement: values.TypeMovement!,
      });
    },
  });

  return {
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    submitForm,
    errors,
    values,
    addInventoryStatus,
  };
}
