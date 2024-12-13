import { Button, Input } from "@nextui-org/react";
import { BaseScreen } from "../BaseScreen";
import { IoAdd } from "react-icons/io5";
import { useGetAllCategories } from "./query/category.query";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { ActionCategory } from "./components/ActionCategory";
import { BaseModal } from "../../components/Base/BaseModal";
import { CategoryForm } from "./components/CategoryForm";
import { useCategoryStore } from "./store/category.store";
import { MODEFORMENUM } from "../../../enum/mode/mode.enum";
import { CiSearch } from "react-icons/ci";
import { ConstData } from "../../../const/const";
import { RefreshButton } from "../../components/Buttons/RefreshButton";

const columns: GridColDef[] = [
  {
    field: "col1",
    headerName: "Nombre",
    flex: 1,
  },
  {
    field: "col2",
    headerName: "Cantidad de productos",
    flex: 1,
  },
  {
    field: "col3",
    headerName: "Acciones",
    renderCell: (params) => <ActionCategory id={params.id.toString()} />,
    flex: 1,
    sortable: false,
    filterable: false,
    pinnable: false,
  },
];
export default function CategoryScreen() {
  // fetchs
  const { data: CategoryData, status: statusGetAllCategory, refetch: refetchCategory, isRefetching: isRefetchingCategory } =
    useGetAllCategories();
  // states
  const [searchByWord, setSearchByWord] = useState("");

  const isLoadingCategories = statusGetAllCategory === "pending" || isRefetchingCategory;

  const rows = useMemo(() => {
    if (!CategoryData) {
      return [];
    }
    const normalizedSearchWord = searchByWord.trim().toLowerCase();

    const filteredCategories = CategoryData.filter(({ name }) => {
      if (!normalizedSearchWord) return true; // Si no hay palabra de búsqueda, devuelve todo
      return name.toLowerCase().includes(normalizedSearchWord);
    });

    return filteredCategories.map(({ id, name, countProducts }) => ({
      id,
      col1: name,
      col2: countProducts,
    }));
  }, [CategoryData, searchByWord]);

  const { showForm, setModeForm, toggleForm, titleForm } = useCategoryStore();

  const handleClickNew = () => {
    setModeForm(MODEFORMENUM.CREATE);
    toggleForm();
  };

  return (
    <BaseScreen
      titlePage="Categorias"
      actions={
        <>
          <Button
            onClick={handleClickNew}
            color="primary"
            startContent={<IoAdd />}
          >
            Categoria
          </Button>
          {ConstData.HasElectronMode && (
            <RefreshButton onClick={() => refetchCategory()} />
          )}
        </>
      }
    >
      <>
        <div className="w-full sm:w-1/3">
          <Input
            label=""
            placeholder="Buscar categoria..."
            variant="bordered"
            startContent={<CiSearch />}
            onChange={(e) => setSearchByWord(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <DataGrid
            loading={isLoadingCategories}
            disableColumnMenu
            hideFooter
            rows={rows}
            columns={columns}
          />
        </div>
        <BaseModal
          title={titleForm}
          isOpen={showForm}
          onOpenChange={toggleForm}
        >
          <CategoryForm />
        </BaseModal>
      </>
    </BaseScreen>
  );
}
