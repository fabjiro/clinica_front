import { Button, Progress, User } from "@nextui-org/react";
import { BaseScreen } from "../BaseScreen";
import { IoAdd, IoSettingsSharp } from "react-icons/io5";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { TypeMovementEnum } from "../../../enum/typemovement/typemovement.enum";
import { BaseModal } from "../../components/Base/BaseModal";
import { ProductTitleAndImage } from "../Product/components/ProductTitleAndImage";
import { FormHistory } from "./components/FormHistory";
import { useGetHistory } from "./query/history.query";
import { useInventoryStore } from "./store/inventory.store";
import { MODEFORMENUM } from "../../../enum/mode/mode.enum";
import { IPaginationReqDto } from "../../../domain/dto/request/PaginationReqDto";
import { InventoryEntity } from "../../../domain/entity/inventory/inventory.entity";
import { useTableScrollInfinitie } from "../../hooks/useTableScrollInfinitie";

const columns: GridColDef[] = [
  {
    field: "col1",
    headerName: "Nombre",
    flex: 1,
    filterable: false,
    sortable: false,
    renderCell: (params) => (
      <ProductTitleAndImage
        name={params.row.col1.name}
        url={params.row.col1.url}
      />
    ),
  },
  {
    field: "col2",
    headerName: "Cantidad",
    flex: 1,
  },
  {
    field: "col3",
    headerName: "Precio Unitario",
    flex: 1,
  },
  {
    field: "col6",
    headerName: "Tipo movimiento",
    flex: 1,
    valueGetter: (params: any) => params.type,
    renderCell: (params) => <p>{params.row.col6.name}</p>,
  },
  {
    field: "col4",
    headerName: "Usuario",
    flex: 1,
    valueGetter: (params: any) => params.name,

    renderCell: (params) => (
      <div className="flex items-center h-full w-full">
        <User
          name={params.row.col4.name}
          avatarProps={{
            src: params.row.col4.url,
          }}
        />
      </div>
    ),
  },
  {
    field: "col5",
    headerName: "Fecha",
    flex: 1,
  },
  {
    field: "col7",
    headerName: "Hace",
    flex: 1,
  },
];

export default function ProductHistoryScreen() {
  // states
  const [pagination, setPagination] = useState<IPaginationReqDto>({
    page: 1,
    pageSize: 40,
  });

  // querys
  const {
    data: dataQuery,
    status: statusGetHisotory,
    isFetching,
  } = useGetHistory(pagination);

  const [dataHistory, setDataHistory] = useState<InventoryEntity[]>([]);

  const { gridApiRef } = useTableScrollInfinitie({
    isLoading: isFetching, // api rest fetching
    threshold: 50, // fetch data when scroll to bottom
    onNextPage: () => {
      // fetch more data
      if (pagination.page < (dataQuery?.totalPages ?? 0)) {
        const nextPage = pagination.page + 1;
        setPagination((prev) => ({
          ...prev,
          page:
            nextPage >= (dataQuery?.totalPages ?? 0)
              ? dataQuery?.totalPages ?? 0
              : nextPage,
        }));
      }
    },
  });

  const { titleForm, toggleForm, showForm, setModeForm } = useInventoryStore();

  const rows = dataHistory.map((item) => ({
    id: item.id,
    col1: { name: item.product.name, url: item.product.image?.compactUrl },
    col2: item.count,
    col3: item.priceUnit,
    col4: { name: item.user.name, url: item.user.avatar?.compactUrl },
    col5: item.createdAt,
    col6: { name: item.typeMovementString, type: item.typeMovement },
    col7: item.relactiveDate,
  }));

  const isLoadingHistory = isFetching;

  useEffect(() => {
    if (statusGetHisotory === "success" && !isFetching) {
      // filter new data by pre data
      setDataHistory((prev) => {
        const prevIds = new Set(prev.map((item) => item.id)); // Crear un conjunto con los IDs previos
        const uniqueData = (dataQuery?.items ?? []).filter(
          (newItem) => !prevIds.has(newItem.id) // Filtrar solo los elementos nuevos no existentes
        );
        return [...prev, ...uniqueData];
      });
      // setDataHistory((prev) => [...prev, ...(dataQuery?.items ?? [])]);
    }
  }, [isFetching]);

  return (
    <>
      <BaseScreen
        showBackButton
        titlePage="Historial"
        actions={
          <>
            <Button
              onClick={() => {
                setModeForm(MODEFORMENUM.AJUSTMENT);
                toggleForm();
              }}
              startContent={<IoSettingsSharp />}
            >
              Ajuste
            </Button>
            <Button
              onClick={() => {
                setModeForm(MODEFORMENUM.CREATE);
                toggleForm();
              }}
              startContent={<IoAdd />}
              color="primary"
            >
              Nueva entrada
            </Button>
          </>
        }
      >
        <div className="flex-1 overflow-auto">
          <DataGrid
            apiRef={gridApiRef}
            loading={isLoadingHistory}
            disableColumnMenu
            // disableVirtualization
            hideFooter
            disableRowSelectionOnClick
            getRowClassName={(params) => {
              if (params.row.col6.type === TypeMovementEnum.INPUT) {
                return "bg-green-100";
              }

              if (params.row.col6.type === TypeMovementEnum.OUTPUT) {
                return "bg-red-100";
              }

              return "bg-yellow-100";
            }}
            rows={rows}
            columns={columns}
            slots={{
              loadingOverlay: () => <Progress isIndeterminate size="sm" />,
            }}
          />
        </div>
      </BaseScreen>
      <BaseModal isOpen={showForm} onOpenChange={toggleForm} title={titleForm}>
        <FormHistory />
      </BaseModal>
    </>
  );
}
