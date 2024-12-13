import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const CategoryScreenLazy = lazy(() => import("../Category/CategoryScreen"));
const HistoryScreen = lazy(() => import("../Inventory/ProductHistoryScreen"));
const ProductScreen = lazy(() => import("../Product/ProductScreen"));
export default function InventoryRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="category" />} />
      <Route path="category" element={<CategoryScreenLazy />} />
      <Route path="history" element={<HistoryScreen />} />
      <Route path="product" element={<ProductScreen />} />
    </Routes>
  );
}
