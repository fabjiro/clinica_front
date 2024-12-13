import { Routes, Route } from "react-router-dom";
import { FileScreen } from "./FileScreen";

export default function FilesRoutes() {
  return (
    <Routes>
      <Route index element={<FileScreen />} />
    </Routes>
  );
}
