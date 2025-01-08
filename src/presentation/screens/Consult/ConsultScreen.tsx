import { useNavigate, useParams } from "react-router-dom";
import { BaseScreen } from "../BaseScreen";
import { DataGrid } from "@mui/x-data-grid";
import { Input } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { id } from "inversify";
import { IPatient } from "../../../interfaces/patient.interface";
import { useQueryClient } from "@tanstack/react-query";

export function ConsultScreen() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const clientQuery = useQueryClient();

  if (!patientId) {
    navigate("/");
    return null;
  }

  console.log(patientId);

  const patient = (
    clientQuery.getQueryData<IPatient[]>(["getAllPatient"]) ?? []
  ).find((patient) => patient.id === patientId);

  console.log(patient);

  return (
    <BaseScreen showBackButton titlePage={`Consultas de ${patient?.name}`}>
      <div className="flex flex-col gap-2 flex-1">
        <Input
          label=""
          placeholder="Buscar consulta..."
          variant="bordered"
          startContent={<CiSearch />}
          className="max-w-sm"
        />
        <div className="flex-1 overflow-auto">
          <DataGrid columns={[]} rows={[]} disableColumnMenu />
        </div>
      </div>
    </BaseScreen>
  );
}
