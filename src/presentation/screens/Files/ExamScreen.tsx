import { Button, Input } from "@nextui-org/react";
import { BaseScreen } from "../BaseScreen";
import { IoIosAdd } from "react-icons/io";
import { useGroupsStore } from "./store/groups.store";
import { ModalExam } from "./components/ModalExam";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetExam } from "./query/exam.query";
import { useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";


export function ExamScreen() {
    
    const {toggleForm: toggleFormGroup} = useGroupsStore();
    const [searchByWord, setSearchByWord] = useState<string | undefined>();
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
        // renderCell: (params) => <ActionExam id={params.id.toString()} />,
      },
    ];

    const row = useMemo(() => {
        if (!dataExam) return [];

        if (searchByWord) {
              return dataExam
                .filter((Exam) =>
                  Exam.name.toLowerCase().includes(searchByWord.toLowerCase())
                )
                .map((Exam, index) => ({
                  colId: index + 1,
                  id: Exam.id,
                  col1: Exam.group.name,
                  col2: Exam.name,
                  
                }));
            }
        
        return dataExam.map((exam, index) => ({
          colId: index + 1,
          id: exam.id,
          col1: exam.group.name,
          col2: exam.name,
        }));
      }, [dataExam, searchByWord]);
    

    return (
    <>
    <BaseScreen
        titlePage="Examenes"
        actions={
            <Button
              onClick={() => {
                toggleFormGroup();
              }}
              startContent={<IoIosAdd />}
              color="success"
            >
              Nuevo Examen
            </Button>
        }
    >
      <div className="flex flex-col gap-2 flex-1">
                <Input
                  label=""
                  placeholder="Buscar Examen..."
                  variant="bordered"
                  startContent={<CiSearch />}
                  onChange={(e) => setSearchByWord(e.target.value)}
                  className="max-w-sm"
                />
                
                <div className="flex-1 overflow-auto">
                  <DataGrid
                 //   loading={isLoadingExam}
                   columns={columns}
                  rows={row}
                  disableColumnMenu
                  hideFooter
                 />
        </div>
                

          </div>
      
        
    </BaseScreen>

    <ModalExam />
    </>
);
}