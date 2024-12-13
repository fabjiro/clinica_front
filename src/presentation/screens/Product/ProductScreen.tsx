import { Button, Chip, Input, Tooltip } from "@nextui-org/react";
import { BaseScreen } from "../BaseScreen";
import { IoAdd } from "react-icons/io5";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetAllProducts } from "./query/product.query";
import { useMemo, useState } from "react";
import { ProductTitleAndImage } from "./components/ProductTitleAndImage";
import { ActionProduct } from "./components/ActionProduct";
import { BaseModal } from "../../components/Base/BaseModal";
import { FormProduct } from "./components/FormProduct";
import { useProductStore } from "./store/product.store";
import { MODEFORMENUM } from "../../../enum/mode/mode.enum";
import { useGetMeShop } from "../../querys/shop/shop.query";
import { MdHistory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { BarCodeModal } from "./components/BarCodeModal";
import { ConstData } from "../../../const/const";
import { RefreshButton } from "../../components/Buttons/RefreshButton";

const columns: GridColDef[] = [
  {
    field: "col1",
    headerName: "Nombre",
    flex: 1,
    renderCell: (params) => (
      <ProductTitleAndImage name={params.value.name} url={params.value.url} />
    ),
  },
  { field: "col2", headerName: "Precio", flex: 1 },
  { field: "col3", headerName: "Stock", flex: 1 },
  // { field: "col4", headerName: "En Stock", flex: 1 },
  // {
  //   field: "col7",
  //   headerName: "Atributos",
  //   flex: 1,
  // },
  {
    field: "col5",
    headerName: "Category",
    flex: 1,
    renderCell: (params) => <Chip>{params.value}</Chip>,
  },
  {
    field: "col6",
    headerName: "Acciones",
    flex: 1,
    sortable: false,
    filterable: false,
    pinnable: false,
    renderCell: (params) => <ActionProduct id={params.id.toString()} />,
  },
];
export default function ProductScreen() {
  // fetchs
  const { data, status, refetch: refetchProducts, isRefetching } = useGetAllProducts();
  const { data: dataMeShop, status: statusMeShop } = useGetMeShop();
  // states
  const [searchByWord, setSearchByWord] = useState("");

  const { showForm, toggleForm, titleForm, setModeForm } = useProductStore();
  const navigate = useNavigate();

  const rows = useMemo(() => {
    if (!data) {
      return [];
    }

    const normalizedSearchWord = searchByWord.trim().toLowerCase();

    const filteredProducts = data.filter(({ name }) => {
      if (!normalizedSearchWord) return true; // Si no hay palabra de búsqueda, devuelve todo
      return name.toLowerCase().includes(normalizedSearchWord);
    });

    return filteredProducts.map((product) => ({
      id: product.id,
      col1: { name: product.name, url: product.image?.compactUrl },
      col2: product.price,
      col3: product.stock,
      // col4: product.inStock ? "Si" : "No",
      col5: product.category?.name,
    }));
  }, [data, searchByWord]);

  const columnsMod = useMemo(() => {
    if (!dataMeShop) return columns;

    return columns.map((row) => {
      if (row.field === "col7") {
        return {
          ...row,
          headerName: dataMeShop.attribute.name,
        };
      }

      return row;
    });
  }, [statusMeShop]);

  const handleClickNewProduct = () => {
    setModeForm(MODEFORMENUM.CREATE);
    toggleForm();
  };

  const isLoadingProducts = status === "pending" || isRefetching;

  return (
    <>
      <BaseScreen
        titlePage="Productos"
        actions={
          <>
            <Tooltip content="Historial" showArrow>
              <Button
                onClick={() => navigate("/inventory/history")}
                startContent={<MdHistory />}
              />
            </Tooltip>
            <Button
              onClick={handleClickNewProduct}
              color="primary"
              startContent={<IoAdd />}
            >
              Producto
            </Button>
            {ConstData.HasElectronMode && (
              <RefreshButton onClick={() => refetchProducts()} />
            )}
          </>
        }
      >
        <>
          <div className="w-full sm:w-1/3">
            <Input
              label=""
              placeholder="Buscar producto..."
              variant="bordered"
              startContent={<CiSearch />}
              onChange={(e) => setSearchByWord(e.target.value)}
            />
          </div>
          <div className="flex-1 overflow-auto">
            <DataGrid
              loading={isLoadingProducts}
              disableColumnMenu
              hideFooter
              rows={rows}
              columns={columnsMod}
            />
          </div>
        </>
      </BaseScreen>
      <BarCodeModal />
      <BaseModal isOpen={showForm} onOpenChange={toggleForm} title={titleForm}>
        <FormProduct />
      </BaseModal>
    </>
  );
}
