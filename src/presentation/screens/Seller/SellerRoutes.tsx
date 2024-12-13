import { Routes, Route, Navigate } from "react-router-dom";
import { ShellSellerLayout } from "./ShellSellerLayout";
import { BillingScreen } from "../Billing/BillingScreen";

export default function SellerRoutes() {
  return (
    <Routes>
      <Route element={<ShellSellerLayout />}>
        <Route index element={<BillingScreen />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
