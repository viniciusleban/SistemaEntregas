import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { listarTipos, deletarTipo } from "../../services/tipoEntregaService";
import ConfirmModal from "../../components/ConfirmModal";

export default function TipoEntregaList() {
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalId, setModalId] = useState(null);
  const navigate = useNavigate();

  async function carregar() {
    try {
      setLoading(true);
      const res = await listarTipos();
      setTipos(res.data);
    } catch {
      toast.error("Erro ao carregar tipos de entrega.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleDelete() {
    try {
      await deletarTipo(modalId);
      toast.success("Tipo de entrega removido com sucesso!");
      setModalId(null);
      carregar();
    } catch {
      toast.error("Erro ao remover tipo de entrega.");
      setModalId(null);
    }
  }

  return (
    <>
      {modalId && (
        <ConfirmModal
          message="Tem certeza que deseja excluir este tipo de entrega? Esta ação não pode ser desfeita."
          onConfirm={handleDelete}
          onCancel={() => setModalId(null)}
        />
      )}

      <div className="card-custom">
        <div className="card-header-custom">
          <span className="card-header-title">
            <i className="bi bi-tags" />
            Tipos de Entrega
          </span>
          <button
            className="btn-accent"
            onClick={() => navigate("/tipos-entrega/novo")}
          >
            <i className="bi bi-plus-lg" />
            Novo Tipo
          </button>
        </div>

        <div style={{ padding: "0 6px" }}>
          {loading ? (
            <div style={{ padding: "16px" }}>
              {[1, 2, 3].map((n) => (
                <div key={n} className="shimmer-row" />
              ))}
            </div>
          ) : tipos.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-inbox" />
              <p>Nenhum tipo de entrega cadastrado ainda.</p>
            </div>
          ) : (
            <table className="table-custom">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Prazo (dias)</th>
                  <th>Valor</th>
                  <th style={{ textAlign: "right" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {tipos.map((t) => (
                  <tr key={t.id}>
                    <td style={{ color: "var(--text-muted)", width: 50 }}>
                      {t.id}
                    </td>
                    <td>
                      <strong>{t.nome}</strong>
                    </td>
                    <td>
                      <span
                        style={{
                          background: "rgba(232,130,12,.1)",
                          color: "var(--accent-dark)",
                          padding: "2px 10px",
                          borderRadius: 20,
                          fontWeight: 600,
                          fontSize: 13,
                        }}
                      >
                        {t.prazo_dias} {t.prazo_dias === 1 ? "dia" : "dias"}
                      </span>
                    </td>
                    <td>R$ {Number(t.valor).toFixed(2).replace(".", ",")}</td>
                    <td style={{ textAlign: "right" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: 6,
                          justifyContent: "flex-end",
                        }}
                      >
                        <button
                          className="btn-icon edit"
                          title="Editar"
                          onClick={() =>
                            navigate(`/tipos-entrega/editar/${t.id}`)
                          }
                        >
                          <i className="bi bi-pencil" />
                        </button>
                        <button
                          className="btn-icon delete"
                          title="Excluir"
                          onClick={() => setModalId(t.id)}
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
