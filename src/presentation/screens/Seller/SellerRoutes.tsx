import { Routes, Route } from "react-router-dom";
import { ShellSellerLayout } from "./ShellSellerLayout";
import { lazy } from "react";


const DashboardRoutesLazy = lazy(() => import("../Dashboard/DashboardRoutes"));

export default function SellerRoutes() {
  return (
    <Routes>
      <Route element={<ShellSellerLayout />}>
              <Route path="dashboard" element={<DashboardRoutesLazy />} />
              
      </Route>
    </Routes>
  );
}
