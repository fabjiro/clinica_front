import { Button, Input } from "@nextui-org/react";
import { BaseScreen } from "../BaseScreen";
import { IoIosAdd } from "react-icons/io";

// import { ModalExam } from "./components/ModalExam";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { useGetExam } from "./query/exam.query";
import { useMemo, useState } from "react";
// import { CiSearch } from "react-icons/ci";

// import { ActionExam } from "./components/ActionExam";
import { MODEFORMENUM } from "../../../enum/mode/mode.enum";
import { ModalSubRol } from "./components/ModalSubRol";
import { useSubRolStore } from "./store/subrol.store";
import { ActionSubRol } from "./components/ActionSubRol";
import { useGetSubRol } from "./querys/subrol.query";

export function RolesScreen() {
  // const {toggleForm: toggleFormGroup, setModeForm} = useGroupsStore();
  // const [searchByWord, setSearchByWord] = useState<string | undefined>();
  // const { data: dataExam} = useGetExam();

  const { toggleForm: toggleFormSubRol, setModeForm } = useSubRolStore();
  const { data: dataSubRol } = useGetSubRol();

  console.log(dataSubRol);

  const columns: GridColDef[] = [
    { field: "colId", headerName: "N", width: 90 },
    {
      field: "col1",
      headerName: "Rol",
      flex: 1,
    },
    {
      field: "col2",
      headerName: "Nombre SubRol",
      flex: 1,
    },
    {
      field: "col3",
      headerName: "Acciones",
      width: 100,
      sortable: false,
      filterable: false,
      pinnable: false,
      renderCell: (params) => <ActionSubRol id={params.id.toString()} />,
    },
  ];

  const row = useMemo(() => {
    if (!dataSubRol) return [];

    //   if (searchByWord) {
    //         return dataSubRol
    //           .filter((rol) =>
    //             rol.name.toLowerCase().includes(searchByWord.toLowerCase())
    //           )
    //           .map((Exam, index) => ({
    //             colId: index + 1,
    //             id: Exam.id,
    //             col1: Exam.group.name,
    //             col2: Exam.name,

    //           }));
    //       }

    return dataSubRol.map((roldata, index) => ({
      colId: index + 1,
      id: roldata.id,
      // col1: roldata.rol.name,
      col2: roldata.name,
      //   col1: rol.group.name,
    }));
  }, [dataSubRol]);

  return (
    <>
      <BaseScreen
        titlePage="Roles"
        actions={
          <Button
            onClick={() => {
              setModeForm(MODEFORMENUM.CREATE);
              toggleFormSubRol();
            }}
            startContent={<IoIosAdd />}
            color="success"
          >
            Nuevo Rol
          </Button>
        }
      >
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex flex-col items-start gap-2"></div>
          {/* <Input
            label=""
            placeholder="Buscar Examen..."
            variant="bordered"
            startContent={<CiSearch />}
            onChange={(e) => setSearchByWord(e.target.value)}
            className="max-w-sm"
          /> */}

          <div className="flex-1 overflow-auto">
            <DataGrid
              columns={columns}
              rows={row}
              disableColumnMenu
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 7,
                  },
                },
              }}
              pageSizeOptions={[7]}
            />
          </div>
        </div>
      </BaseScreen>

      <ModalSubRol />
    </>
  );
}
