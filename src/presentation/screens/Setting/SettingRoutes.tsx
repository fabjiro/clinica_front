import { Routes, Route, Navigate } from "react-router-dom";
import { ShellSettingLayout } from "./ShellSettingLayout";
import { ShopScreen } from "../Shop/ShopScreen";

export default function SettingRoutes() {
  return (
    <Routes>
      <Route element={<ShellSettingLayout />}>
        <Route index element={<Navigate to="shop" />} />
        <Route path="/shop" element={<ShopScreen />} />
      </Route>
    </Routes>
  );
}
