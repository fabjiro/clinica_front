import { Button, Input, Progress } from "@nextui-org/react";
import { BaseScreen } from "../BaseScreen";
import { useBounce } from "../../hooks/useBounce";
import { HiSelector } from "react-icons/hi";
import { useSearchProduct } from "../Product/query/product.query";
import { memo, useEffect, useMemo, useRef } from "react";
import { Image } from "@nextui-org/react";
import { useToggle } from "../../hooks/useToggle";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useBillingStore } from "./store/billing.store";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { useConfirmStore } from "../../storage/confim.storage";
import { InputCounter } from "../../components/Input/InputCounter";
import { SearchProductEntity } from "../../../domain/entity/product/searchProduct.entity";
import { BaseModal } from "../../components/Base/BaseModal";
import { FormFacturation } from "./components/FormFacturation";

const columns: GridColDef[] = [
  {
    field: "col1",
    headerName: "Nombre",
    renderCell: (params) => {
      return (
        <div className="flex items-center gap-2">
          <Image
            src={params.row.col1.url}
            alt={params.row.col1.name}
            className="rounded-md w-12 h-12 object-contain aspect-square bg-white"
          />
          <span>{params.row.col1.name}</span>
        </div>
      );
    },
    flex: 1,
  },
  {
    field: "col2",
    headerName: "Precio Unidad",
    flex: 1,
  },
  {
    field: "col6",
    headerName: "Stock",
    flex: 1,
  },
  {
    field: "col3",
    headerName: "Cantidad",
    flex: 1,
    renderCell: (params) => {
      const updateCounter = useBillingStore((state) => state.updateCounter);
      return (
        <InputCounter
          onChange={(value) => {
            console.log(value);
            if (value != params.row.col3) {
              updateCounter(params.id.toString(), value);
            }
          }}
          initialValue={params.row.col3}
        />
      );
    },
  },
  {
    field: "col4",
    headerName: "Subtotal",
    flex: 1,
  },
  {
    field: "col5",
    headerName: "Accion",
    width: 100,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      return (
        <Button
          onClick={() =>
            useBillingStore.getState().removeProduct(params.id.toString())
          }
        >
          Eliminar
        </Button>
      );
    },
  },
];

const MemoizedDataGrid = memo(() => {
  const products = useBillingStore((state) => state.products);

  const productMemo = useMemo(() => {
    return products.map((product) => ({
      id: product.id,
      col1: { name: product.name, url: product.image },
      col2: product.price,
      col3: product.quantity,
      col4: product.subTotal,
      col6: product.stock,
    }));
  }, [products]);

  return (
    <div className="flex-1 h-full w-full">
      <DataGrid
        disableColumnMenu
        hideFooter
        rows={productMemo}
        columns={columns}
      />
    </div>
  );
});

export function BillingScreen() {
  // stores
  const { addProduct, clearCart, total, products } = useBillingStore();
  const showConfirm = useConfirmStore((state) => state.showConfirm);

  const { isLoading, setValue, valueBounce } = useBounce<string>(1000);
  const [
    showContentSearchProduct,
    handleShowContentSearchProduct,
    setShowContent,
  ] = useToggle();
  const [showModalFacturation, handleShowModalFacturation] = useToggle();

  // reft
  const searchRef = useRef<HTMLDivElement | null>(null);

  const {
    data: searchProduct,
    isLoading: isLoadingSearchProduct,
    refetch: refetchSearchProduct,
    status: statusSearchProduct,
  } = useSearchProduct(valueBounce ?? "");

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getAppVersion().then((version: string) => {
        console.log("La versión de la aplicación es:", version);
      });
    }

    const handleClickOutside = (event: MouseEvent) => {
      // Verificar si el clic es fuera del contenedor de búsqueda
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowContent(false); // Cerrar el listado si el clic es fuera del contenedor
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (valueBounce) {
      refetchSearchProduct();
    }

    if ((valueBounce?.length ?? 0) === 0) {
      setShowContent(false);
    }
  }, [valueBounce]);

  useEffect(() => {
    if (statusSearchProduct === "success") {
      handleShowContentSearchProduct();
    }
  }, [statusSearchProduct]);

  // useEffect(() => {
  //   if(addFacturationStatus === "success") {
  //     handleShowModalFacturation();
  //     clearCart();
  //   }
  // },[addFacturationStatus])

  const hasProducts = products.length > 0;

  return (
    <>
      <BaseScreen
        titlePage="Facturación"
        actions={
          <>
            {hasProducts && (
              <Button
                onClick={() =>
                  showConfirm("Eliminar todo", "¿Desea eliminar todo?", () =>
                    clearCart()
                  )
                }
              >
                Eliminar todo
              </Button>
            )}
            <Button
              startContent={<MdOutlineShoppingCartCheckout />}
              color="primary"
              onClick={() => {
                if (hasProducts) {
                  handleShowModalFacturation();
                }
              }}
            >
              Facturar
            </Button>
          </>
        }
      >
        <div className="flex-1 flex flex-col h-full gap-4 w-full">
          <div className="w-full flex flex-row justify-between items-end">
            <div className="relative w-1/3 justify-center flex flex-col">
              <div className="w-full relative" ref={searchRef}>
                <Input
                  placeholder="Busqueda rapida"
                  labelPlacement="outside"
                  className="w-full"
                  endContent={
                    <HiSelector
                      className="cursor-pointer"
                      onClick={() => {
                        if ((searchProduct ?? []).length > 0) {
                          handleShowContentSearchProduct();
                        }
                      }}
                    />
                  }
                  onChange={(e) => setValue(e.target.value)}
                />
                {showContentSearchProduct && (
                  <ul className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto select-none">
                    {(searchProduct ?? []).map((item) => (
                      <li
                        key={item.id}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                        onClick={() =>
                          addProduct(
                            new SearchProductEntity(
                              item.id,
                              item.name,
                              item.price,
                              item.stock,
                              item.image!
                            )
                          )
                        }
                      >
                        <div className="flex flex-row sm:flex-row gap-2 items-center">
                          <Image
                            isBlurred
                            src={item.image?.compactUrl}
                            className="rounded-md w-16 h-16 object-contain aspect-square bg-white"
                          />
                          <div className="flex flex-col">
                            <p className="font-semibold">Nombre: {item.name}</p>
                            <p className="text-gray-500">
                              Precio: {item.price}
                            </p>
                            <p className="text-gray-500">Stock: {item.stock}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {(isLoading || isLoadingSearchProduct) && (
                <Progress
                  size="sm"
                  isIndeterminate
                  aria-label="Loading..."
                  className="w-[98%] rounded-full absolute bottom-0"
                />
              )}
            </div>

            {products.length > 0 && <p>Monto total: {total}</p>}
          </div>
          <MemoizedDataGrid />
        </div>
      </BaseScreen>
      <BaseModal
        title="Detalles de la factura"
        isOpen={showModalFacturation}
        onOpenChange={handleShowModalFacturation}
      >
        <FormFacturation
          onSuccess={() => {
            handleShowModalFacturation();
            clearCart();
          }}
        />
      </BaseModal>
    </>
  );
}
