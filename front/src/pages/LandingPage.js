import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-hero">
      <div className="landing-icon-bg">
        <i className="bi bi-truck" />
      </div>

      <h1 className="landing-title">Sistema de Entregas</h1>
      <p className="landing-subtitle">
        Gerencie tipos de entrega e acompanhe suas remessas em um só lugar.
        Simples, rápido e organizado.
      </p>

      <div className="landing-cards">
        <div
          className="landing-card"
          onClick={() => navigate("/tipos-entrega")}
        >
          <div className="landing-card-icon orange">
            <i className="bi bi-tags" />
          </div>
          <div className="landing-card-title">Tipos de Entrega</div>
          <div className="landing-card-desc">
            Cadastre e gerencie as modalidades de entrega com seus prazos
            (ex: Sedex, PAC, Motoboy).
          </div>
        </div>

        <div
          className="landing-card"
          onClick={() => navigate("/entregas")}
        >
          <div className="landing-card-icon blue">
            <i className="bi bi-box-seam" />
          </div>
          <div className="landing-card-title">Entregas</div>
          <div className="landing-card-desc">
            Registre entregas vinculando remetente, destinatário e tipo de
            envio. A data prevista é calculada automaticamente.
          </div>
        </div>
      </div>
    </div>
  );
}
