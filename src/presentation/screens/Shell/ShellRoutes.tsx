import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../storage/auth.storage";
import { lazy } from "react";
import { RolEnum } from "../../../enum/rol/rol.enum";
import { useGetMe } from "../../querys/auth/auth.query";
import { LoadingScreen } from "../LoadingScreen";

const AdminRoutesLazy = lazy(() => import("../Admin/AdminRoutes"));
const SellerRoutesLazy = lazy(() => import("../Seller/SellerRoutes"));
const CustomerRoutesLazy = lazy(() => import("../Customer/CustomerRoutes"));


const paginasPermitidas = [
  'dashboard',
  'files',
]

export default function ShellRoutes() {
  const { isAuth } = useAuthStore(); // Obtener estado y funciones del store
  const { data: dataMe } = useGetMe(); // Llamada a la API para obtener datos del usuario
  const location = useLocation();
  const rutaActual = location.pathname.split('/');
  const ultimaRuta = rutaActual[rutaActual.length - 1]; 
  
  const isAuthenticated = isAuth();


  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  if (isAuthenticated) {
    const rolid = dataMe?.rol?.rol?.id;


    if(dataMe?.routes && ultimaRuta !== "") {
      if(!dataMe.routes.includes(ultimaRuta)) {
        return <LoadingScreen message="No tienes permiso para acceder a esta página" />;
      }
    }

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
