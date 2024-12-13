import { Routes, Route } from "react-router-dom";
import { ShellSellerLayout } from "./ShellSellerLayout";

export default function SellerRoutes() {
  return (
    <Routes>
      <Route element={<ShellSellerLayout />}>
      </Route>
    </Routes>
  );
}
