import { useNavigate, useParams } from "react-router-dom";
import { BaseScreen } from "../BaseScreen";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Input, User } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { IPatient } from "../../../interfaces/patient.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useGetConsultByPatientId } from "../Files/query/consult.query";
import { useMemo } from "react";
import moment from "moment/min/moment-with-locales";
import { ActionConsult } from "./components/ActionConsult";

const columns: GridColDef[] = [
  { field: "colId", headerName: "N.", width: 90 },
  {
    field: "col1",
    headerName: "Motivo",
    flex: 1,
  },
  {
    field: "col2",
    headerName: "Atendido por",
    flex: 1,
    renderCell: (params) => (
      <div className="flex items-center justify-start w-full h-full">

        <User
          name={params.row.col2.name}
          avatarProps={{
            src: params.row.col2.url,
          }}
        />
      </div>
    ),
  },
  {
    field: "col8",
    headerName: "Fecha de creación",
    flex: 1,
  },
  {
    field: "col7",
    headerName: "Acciones",
    width: 100,
    sortable: false,
    filterable: false,
    pinnable: false,
    renderCell: (params) => <ActionConsult id={params.id.toString()} />,
  },
];
export function ConsultScreen() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const clientQuery = useQueryClient();

  if (!patientId) {
    navigate("/");
    return null;
  }

  const patient = (
    clientQuery.getQueryData<IPatient[]>(["getAllPatient"]) ?? []
  ).find((patient) => patient.id === patientId);

  const { data: consultData, isFetching: isLoadingConsult } =
    useGetConsultByPatientId(patientId);

  const rows = useMemo(() => {
    if (!consultData) {
      return [];
    }

    return consultData.map((consult, index) => ({
      colId: index + 1,
      id: consult.id,
      col1: consult.motive,
      col2: {
        name: consult.userCreatedBy.name,
        url: consult.userCreatedBy.avatar?.compactUrl,
      },
      col8: moment(consult.createdAt).locale("es").format("L"),
    }));
  }, [consultData]);

  return (
    <BaseScreen
      isLoading={isLoadingConsult}
      showBackButton
      titlePage={`Consultas de ${patient?.name}`}
    >
      <div className="flex flex-col gap-2 flex-1">
        <Input
          label=""
          placeholder="Buscar consulta..."
          variant="bordered"
          startContent={<CiSearch />}
          className="max-w-sm"
        />
        <div className="flex-1 overflow-auto">
          <DataGrid columns={columns} rows={rows} disableColumnMenu />
        </div>
      </div>
    </BaseScreen>
  );
}
