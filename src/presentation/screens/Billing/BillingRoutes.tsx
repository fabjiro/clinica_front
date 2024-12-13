import { Route, Routes } from "react-router-dom";
import { BillingScreen } from "./BillingScreen";

export default function BillingRoutes() {
  return (
    <Routes>
      <Route index element={<BillingScreen />} />
    </Routes>
  );
}
