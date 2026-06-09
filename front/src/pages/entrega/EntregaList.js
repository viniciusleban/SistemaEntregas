import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { listarEntregas, deletarEntrega } from "../../services/entregaService";
import ConfirmModal from "../../components/ConfirmModal";

function formatarData(dataStr) {
  if (!dataStr) return "—";
  const [y, m, d] = dataStr.split("-");
  return `${d}/${m}/${y}`;
}

export default function EntregaList() {
  const [entregas, setEntregas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalId, setModalId] = useState(null);
  const navigate = useNavigate();

  async function carregar() {
    try {
      setLoading(true);
      const res = await listarEntregas();
      setEntregas(res.data);
    } catch {
      toast.error("Erro ao carregar entregas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregar(); }, []);

  async function handleDelete() {
    try {
      await deletarEntrega(modalId);
      toast.success("Entrega removida com sucesso!");
      setModalId(null);
      carregar();
    } catch {
      toast.error("Erro ao remover entrega.");
      setModalId(null);
    }
  }

  return (
    <>
      {modalId && (
        <ConfirmModal
          message="Tem certeza que deseja excluir esta entrega?"
          onConfirm={handleDelete}
          onCancel={() => setModalId(null)}
        />
      )}
      <div className="card-custom">
        <div className="card-header-custom">
          <span className="card-header-title"><i className="bi bi-box-seam" />Entregas</span>
          <button className="btn-accent" onClick={() => navigate("/entregas/nova")}>
            <i className="bi bi-plus-lg" />Nova Entrega
          </button>
        </div>
        <div style={{ padding: "0 6px" }}>
          {loading ? (
            <div style={{ padding: 16 }}>{[1,2,3,4].map(n => <div key={n} className="shimmer-row" />)}</div>
          ) : entregas.length === 0 ? (
            <div className="empty-state"><i className="bi bi-inbox" /><p>Nenhuma entrega cadastrada ainda.</p></div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="table-custom">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Destinatário</th>
                    <th>Endereço</th>
                    <th>Tipo</th>
                    <th>Postagem</th>
                    <th>Prev. Entrega</th>
                    <th>Entregue em</th>
                    <th style={{ textAlign: "right" }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {entregas.map((e) => (
                    <tr key={e.id}>
                      <td style={{ color: "var(--text-muted)", width: 45 }}>{e.id}</td>
                      <td><strong>{e.destinatario}</strong></td>
                      <td style={{ color: "var(--text-muted)", fontSize: 13 }}>{e.endereco}</td>
                      <td>
                        {e.tipo ? (
                          <span style={{ background: "rgba(232,130,12,.1)", color: "var(--accent-dark)", padding: "2px 10px", borderRadius: 20, fontWeight: 600, fontSize: 12 }}>
                            {e.tipo.nome}
                          </span>
                        ) : "—"}
                      </td>
                      <td>{formatarData(e.data_postagem)}</td>
                      <td>{formatarData(e.data_prevista)}</td>
                      <td>{formatarData(e.data_entrega)}</td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                          <button className="btn-icon edit" title="Editar" onClick={() => navigate(`/entregas/editar/${e.id}`)}>
                            <i className="bi bi-pencil" />
                          </button>
                          <button className="btn-icon delete" title="Excluir" onClick={() => setModalId(e.id)}>
                            <i className="bi bi-trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
