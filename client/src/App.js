import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { AuthProvider } from "./context/authContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import { LoginPage } from "scenes/login/LoginPage";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";
import { ProtectedRoute } from "routes";
import HomePage from "scenes/home/HomePage";
import HomeMayorista from "scenes/home/HomeMayorista";
import HomeProducto from "scenes/home/HomeProducto";
import RegisterPage from "scenes/login/RegisterPage";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/main" element={<Page />} /> */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/panel principal" element={<Dashboard />} />
                  <Route path="/productos" element={<Products />} />
                  <Route path="/clientes" element={<Customers />} />
                  <Route path="/facturas" element={<Transactions />} />
                  {/* <Route path="/registrar" element={<HomePage />} /> */}
                  <Route path="/mayorista" element={<HomeMayorista />} />
                  <Route path="/registrarproducto" element={<HomeProducto />} />
                  {/* <Route path="/geography" element={<Geography />} /> */}
                  <Route path="/overview" element={<Overview />} />
                  <Route path="/diarias" element={<Daily />} />
                  <Route path="/mensuales" element={<Monthly />} />
                  <Route path="/graficas" element={<Breakdown />} />
                  <Route path="/administradores" element={<Admin />} />
                  <Route path="/performance" element={<Performance />} />
                </Route>
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
