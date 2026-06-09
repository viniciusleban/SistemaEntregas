import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";

import TipoEntregaList from "./pages/tipoEntrega/TipoEntregaList";
import TipoEntregaForm from "./pages/tipoEntrega/TipoEntregaForm";

import EntregaList from "./pages/entrega/EntregaList";
import EntregaForm from "./pages/entrega/EntregaForm";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="app-shell">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="content-area">
          <Navbar onMenuClick={() => setSidebarOpen((o) => !o)} />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/tipos-entrega" element={<TipoEntregaList />} />
              <Route path="/tipos-entrega/novo" element={<TipoEntregaForm />} />
              <Route path="/tipos-entrega/editar/:id" element={<TipoEntregaForm />} />
              <Route path="/entregas" element={<EntregaList />} />
              <Route path="/entregas/nova" element={<EntregaForm />} />
              <Route path="/entregas/editar/:id" element={<EntregaForm />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}
