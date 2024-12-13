import { Routes, Route } from "react-router-dom";

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route index element={<p>Customer routes</p>} />
    </Routes>
  );
}
