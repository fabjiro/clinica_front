import { Avatar, Button, Input } from "@nextui-org/react";
import { BaseScreen } from "../BaseScreen";
import { useGetMeShop } from "../../querys/shop/shop.query";
import { MdSave } from "react-icons/md";
import { useFilePicker } from "use-file-picker";
import { useEffect } from "react";
import { FileUtils } from "../../../utils/file.utils";
import { useFormikShop } from "./hooks/useFormikShop";

export function ShopScreen() {
  const { data: shopData } = useGetMeShop();

  const { setFieldValue, values, errors, handleSubmit, updateShopStatus } = useFormikShop();

  const { openFilePicker, plainFiles, loading } = useFilePicker({
    accept: ".png, .jpg, .jpeg",
    multiple: false,
  });

  useEffect(() => {
    if (plainFiles.length > 0) {
      (async () => {
        setFieldValue(
          "Logo",
          await FileUtils.convertFileToBase64(plainFiles[0])
        );
      })();
    }
  }, [plainFiles]);

  const { Name: NameError } = errors;
  const isLoadinUpdate = updateShopStatus === "pending";

  return (
    <BaseScreen
      titlePage="Tienda"
      actions={
        <>
          <Button
            onClick={() => handleSubmit()}
            startContent={<MdSave />}
            color="primary"
            isLoading={isLoadinUpdate}
          >
            Guardar cambios
          </Button>
        </>
      }
    >
      <div className="flex-1 py-4">
        <div className="flex flex-row gap-6 w-full p-4">
          <Avatar
            className="p-4 w-1/6 h-1/6 object-contain cursor-pointer aspect-square"
            size="lg"
            src={values.Logo ?? shopData?.logo.originalUrl}
            onClick={() => {
              if (loading || isLoadinUpdate) return;
              openFilePicker();
            }}
          />
          <div className="flex flex-col gap-2 flex-1">
            <Input
              isRequired
              value={values.Name ?? shopData?.name}
              size="sm"
              label="Nombre"
              fullWidth
              errorMessage={NameError}
              isInvalid={!!NameError}
              onChange={(e) => setFieldValue("Name", e.target.value)}
              disabled={isLoadinUpdate}
            />
          </div>
        </div>
      </div>
    </BaseScreen>
  );
}
