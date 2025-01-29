import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BaseScreen } from "../BaseScreen";
import { Button } from "@nextui-org/react";
import { BaseModal } from "../../components/Base/BaseModal";
import { ReportForm } from "./components/ReportForm";
import { useReportFormStore } from "../../storage/form.storage";

const columns: GridColDef[] = [
  { field: "id", headerName: "N.", width: 90 },
  {
    field: "col1",
    headerName: "Reporte",
    flex: 1,
  },
  {
    field: "col2",
    headerName: "Acciones",
    width: 200,
    sortable: false,
    filterable: false,
    pinnable: false,
    renderCell: (params: any) => (
      <Button
        size="sm"
        color="primary"
        onPress={() => {
          const stateForm = useReportFormStore.getState();
          stateForm.setItem(params.id);
          stateForm.toggleForm();
        }}
      >
        Generar Reporte
      </Button>
    ),
  },
];

const rows = [
  {
    id: 1,
    col1: "Reporte Maestro-detalle",
    col2: "#1",
  },
  {
    id: 2,
    col1: "Citas pendientes",
    col2: "#2",
  },
  {
    id: 3,
    col1: "Registros realizados por usuarios ",
    col2: "#3",
  },
  {
    id: 4,
    col1: "Pacientes Registrados",
    col2: "#4",
  },
  {
    id: 5,
    col1: "Diagnosticos realizados",
    col2: "#5",
  },
  {
    id: 6,
    col1: "Consultas realizadas",
    col2: "#6",
  },
];

export function ReportsScreen() {
  const { toggleForm, showForm } = useReportFormStore();
  return (
    <>
      <BaseScreen titlePage="Reportes">
        <DataGrid columns={columns} rows={rows} hideFooter />
      </BaseScreen>
      <BaseModal
        title="Generar Reporte"
        size="md"
        scrollBehavior="inside"
        isOpen={showForm}
        onOpenChange={toggleForm}
      >
        <ReportForm />
      </BaseModal>
    </>
  );
}
