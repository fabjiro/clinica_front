import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../storage/auth.storage";
import { lazy } from "react";
import { RolEnum } from "../../../enum/rol/rol.enum";
import { useGetMe } from "../../querys/auth/auth.query";
import { LoadingScreen } from "../LoadingScreen";

const AdminRoutesLazy = lazy(() => import("../Admin/AdminRoutes"));
const SellerRoutesLazy = lazy(() => import("../Seller/SellerRoutes"));
const CustomerRoutesLazy = lazy(() => import("../Customer/CustomerRoutes"));

export default function ShellRoutes() {
  const { isAuth } = useAuthStore(); // Obtener estado y funciones del store
  const { data: dataMe } = useGetMe(); // Llamada a la API para obtener datos del usuario

  const isAuthenticated = isAuth();


  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  if (isAuthenticated) {
    const rolid = dataMe?.rol?.rol?.id;

    if (rolid === RolEnum.ADMIN) {
      return <AdminRoutesLazy />;
    } else if (rolid === RolEnum.RECEPTION) {
      return <SellerRoutesLazy />;
    } else if (rolid === RolEnum.CUSTOMER) {
      return <CustomerRoutesLazy />;
    }
  }

  return <LoadingScreen/>;
}
