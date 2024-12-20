import { Routes, Route } from "react-router-dom";
import { FileScreen } from "./FileScreen";
import { ExamScreen } from "./ExamScreen";

export default function FilesRoutes() {
  return (
    <Routes>
      <Route index element={<FileScreen />} />
      <Route path="exams" element={<ExamScreen />} />
    </Routes>
  );
}
