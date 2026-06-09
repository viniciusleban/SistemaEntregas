import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  function handleNav(path) {
    navigate(path);
    onClose();
  }

  return (
    <>
      {/* overlay for mobile */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.4)",
            zIndex: 199,
          }}
          onClick={onClose}
        />
      )}

      <aside className={`sidebar${open ? " open" : ""}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <i className="bi bi-truck" />
          </div>
          <div>
            <div className="sidebar-brand-text">SistemaEntregas</div>
            <div className="sidebar-brand-sub">Gestão logística</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Geral</div>

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
            onClick={onClose}
          >
            <i className="bi bi-house-door" />
            Início
          </NavLink>

          <div className="sidebar-section-label" style={{ marginTop: 8 }}>
            Cadastros
          </div>

          <NavLink
            to="/tipos-entrega"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
            onClick={onClose}
          >
            <i className="bi bi-tags" />
            Tipos de Entrega
          </NavLink>

          <NavLink
            to="/entregas"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
            onClick={onClose}
          >
            <i className="bi bi-box-seam" />
            Entregas
          </NavLink>
        </nav>

        <div className="sidebar-footer">v1.0.0 · Programação I</div>
      </aside>
    </>
  );
}
