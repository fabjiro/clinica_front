import { Button } from "@nextui-org/react";
import { BaseScreen } from "../BaseScreen";
import { MdAdd } from "react-icons/md";

export function FileScreen() {
  return (
    <BaseScreen
      titlePage="Expedientes"
      actions={
        <>
          <Button startContent={<MdAdd/>} color="primary">Nuevo paciente</Button>
        </>
      }
    >
      <p>cuerpo</p>
    </BaseScreen>
  );
}
