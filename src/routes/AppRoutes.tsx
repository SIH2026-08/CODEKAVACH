import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";

import Dashboard from "../pages/user/Dashboard";
import LiveMap from "../pages/user/LiveMap";
import SendSOS from "../pages/user/SendSOS";
import Shelters from "../pages/user/Shelters";
import Alerts from "../pages/user/Alerts";
import Settings from "../pages/user/Settings";


export default function AppRoutes() {
  return (
    <Routes>

      {/* =====================================================
          AUTH
      ===================================================== */}

      <Route
        path="/login"
        element={<Login />}
      />


      {/* =====================================================
          USER PAGES
      ===================================================== */}

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/map"
        element={<LiveMap />}
      />

      <Route
        path="/sos"
        element={<SendSOS />}
      />

      <Route
        path="/shelters"
        element={<Shelters />}
      />

      <Route
        path="/alerts"
        element={<Alerts />}
      />

      <Route
        path="/settings"
        element={<Settings />}
      />


      {/* =====================================================
          DEFAULT ROUTE
      ===================================================== */}

      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />


      {/* =====================================================
          UNKNOWN ROUTES
      ===================================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

    </Routes>
  );
}