import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import UnauthorizedPage from "./pages/errors/UnauthorizedPage";

const App = () => {
  return (
    <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route path="*" element={<UnauthorizedPage />} />
        {/* <Route path="*" element={<Navigate to="/admin/dashboard" replace />} /> */}
      </Routes>
  )
}

export default App