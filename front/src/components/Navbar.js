import React from "react";
import { useLocation } from "react-router-dom";

const TITLES = {
  "/": "Início",
  "/tipos-entrega": "Tipos de Entrega",
  "/tipos-entrega/novo": "Novo Tipo de Entrega",
  "/entregas": "Entregas",
  "/entregas/nova": "Nova Entrega",
};

function getTitle(pathname) {
  if (pathname.includes("/tipos-entrega/editar")) return "Editar Tipo de Entrega";
  if (pathname.includes("/entregas/editar")) return "Editar Entrega";
  return TITLES[pathname] || "Sistema de Entregas";
}

export default function Navbar({ onMenuClick }) {
  const { pathname } = useLocation();

  return (
    <header className="topbar">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={onMenuClick}
          style={{
            background: "none",
            border: "none",
            fontSize: 20,
            cursor: "pointer",
            color: "var(--primary)",
            display: "flex",
            alignItems: "center",
          }}
          aria-label="Menu"
        >
          <i className="bi bi-list" />
        </button>
        <span className="topbar-title">{getTitle(pathname)}</span>
      </div>

      <span className="topbar-badge">
        <i className="bi bi-truck" style={{ marginRight: 4 }} />
        Entregas
      </span>
    </header>
  );
}
