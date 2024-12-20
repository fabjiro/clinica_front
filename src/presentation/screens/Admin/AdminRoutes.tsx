import { Routes, Route, Navigate } from "react-router-dom";
import { ShellAdminLayout } from "./ShellAdminLayout";
import { lazy } from "react";

const BackupsScreenLazy = lazy(() => import("../Backups/BackupScreen"));
const UserScreenLazy = lazy(() => import("../Users/UserScreen"));
const FilesRoutesLazy = lazy(() => import("../Files/FilesRoutes"));

const NotFoundScreenLazy = lazy(() => import("../NotFoundScreen"));


export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<ShellAdminLayout />}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<p>Dashboard</p>} />
        <Route path="users" element={<UserScreenLazy />} />
        <Route path="backups" element={<BackupsScreenLazy />} />
        <Route path="files/*" element={<FilesRoutesLazy />} />
        <Route path="*" element={<NotFoundScreenLazy />} />
      </Route>
    </Routes>
  );
}
