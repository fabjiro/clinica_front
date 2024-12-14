import { Button } from "@nextui-org/react";
import { BaseScreen } from "../BaseScreen";
import { MdAdd } from "react-icons/md";
import { useGetAllPatient } from "./query/patient.query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";
import { ActionPatient } from "./components/ActionPatient";
import { usePatientStore } from "./store/patient.store";
import { ModalPatient } from "./components/ModalPatient";

const columns: GridColDef[] = [
  {
    field: "col1",
    headerName: "Nombre",
    flex: 1,
  },
  {
    field: "col2",
    headerName: "Telefono",
    flex: 1,
  },
  {
    field: "col3",
    headerName: "Dirreccion",
    flex: 1,
  },
  {
    field: "col4",
    headerName: "Telefono",
    flex: 1,
  },
  {
    field: "col5",
    headerName: "Sexo",
    flex: 1,
  },
  {
    field: "col6",
    headerName: "Estado Civil",
    flex: 1,
  },
  {
    field: "col7",
    headerName: "Acciones",
    width: 100,
    sortable: false,
    filterable: false,
    pinnable: false,
    renderCell: (params) => <ActionPatient id={params.id.toString()} />,
  },
];

export function FileScreen() {
  const { data: dataPatient, status: statusGetPatient } = useGetAllPatient();
  const toggleForm = usePatientStore((state) => state.toggleForm);

  const row = useMemo(() => {
    if (!dataPatient) return [];

    return dataPatient.map((patient) => ({
      id: patient.id,
      col1: patient.name,
      col2: patient.phone,
      col3: patient.address,
      col4: patient.phone,
      col5:
        patient.typeSex === "c2594acf-bb7c-49d0-9506-f556179670ab"
          ? "Masculino"
          : "Femenino",
      col6: patient.civilStatus.name,
    }));
  }, [dataPatient]);

  const isLoadingPatient = statusGetPatient === "pending";

  return (
    <>
      <BaseScreen
        titlePage="Expedientes"
        actions={
          <>
            <Button
              onClick={toggleForm}
              startContent={<MdAdd />}
              color="primary"
            >
              Nuevo paciente
            </Button>
          </>
        }
      >
        <div className="flex-1 overflow-auto">
          <DataGrid
            loading={isLoadingPatient}
            columns={columns}
            rows={row}
            disableColumnMenu
            hideFooter
          />
        </div>
      </BaseScreen>
      <ModalPatient />
    </>
  );
}
