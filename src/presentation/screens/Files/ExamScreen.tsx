import { Button } from "@nextui-org/react";
import { BaseScreen } from "../BaseScreen";
import { ImFilesEmpty } from "react-icons/im";
import { useGroupsStore } from "./store/groups.store";
import { ModalExam } from "./components/ModalExam";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetExam } from "./query/exam.query";
import { useMemo } from "react";






export function ExamScreen() {
    
    const {toggleForm: toggleFormGroup} = useGroupsStore();
    const { data: dataExam} = useGetExam();

    const columns: GridColDef[] = [
      { field: "colId", headerName: "N", width: 90 },
      {
        field: "col1",
        headerName: "Grupo",
        flex: 1,
      },
      {
        field: "col2",
        headerName: "Examen",
        flex: 1,
      },
      {
        field: "col3",
        headerName: "Acciones",
        width: 100,
        sortable: false,
        filterable: false,
        pinnable: false,
        // renderCell: (params) => <ActionPatient id={params.id.toString()} />,
      },
    ];

    const row = useMemo(() => {
        if (!dataExam) return [];
    
        
        return dataExam.map((exam, index) => ({
          colId: index + 1,
          id: exam.id,
          col1: exam.group.name,
          col2: exam.name,
        }));
      }, [dataExam]);
    

    return (
    <>
    <BaseScreen
        titlePage="Exámenes"
        actions={
            <Button
              onClick={() => {
                toggleFormGroup();
              }}
              startContent={<ImFilesEmpty />}
              color="success"
            >
              Examenes
            </Button>
        }
    >
        <div className="flex-1 overflow-auto">
                    <DataGrid
                    //   loading={isLoadingPatient}
                      columns={columns}
                      rows={row}
                      disableColumnMenu
                      hideFooter
                    />
                  </div>
    </BaseScreen>

    <ModalExam />
    </>
);
}