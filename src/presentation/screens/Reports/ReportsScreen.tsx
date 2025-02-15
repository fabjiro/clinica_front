import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BaseScreen } from "../BaseScreen";
import { Button } from "@nextui-org/react";
import { BaseModal } from "../../components/Base/BaseModal";
import { ReportForm } from "./components/ReportForm";
import { useReportFormStore } from "../../storage/form.storage";
import { useState } from "react";

export function ReportsScreen() {
  const [reportName, setReportName] = useState<string>("");
  const { toggleForm, showForm } = useReportFormStore();

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
            setReportName(params.row.col1); // Actualiza el nombre del reporte
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
      col1: "Maestro-detalle",
      col2: "#1",
    },
    {
      id: 2,
      col1: "Citas Pendientes",
      col2: "#2",
    },
    {
      id: 3,
      col1: "Pacientes Registrados recientemente",
      col2: "#3",
    },
    {
      id: 4,
      col1: "Consultas Recientes",
      col2: "#4",
    },
    {
      id: 5,
      col1: "Registros Realizados por usuarios ",
      col2: "#5",
    },
    {
      id: 6,
      col1: "Diagnosticos Realizados",
      col2: "#6",
    },
  ];

  return (
    <>
      <BaseScreen titlePage="Reportes">
        <DataGrid columns={columns} rows={rows} hideFooter />
      </BaseScreen>
      <BaseModal
        title={`Generar Reporte ${reportName}`}
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
