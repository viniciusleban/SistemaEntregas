import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { buscarEntrega, criarEntrega, atualizarEntrega } from "../../services/entregaService";
import { listarTipos } from "../../services/tipoEntregaService";

const EMPTY_FORM = {
  destinatario: "",
  endereco: "",
  tipo_entrega_id: "",
  data_postagem: "",
  data_entrega: "",
};

export default function EntregaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState(EMPTY_FORM);
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    listarTipos()
      .then((res) => setTipos(res.data))
      .catch(() => toast.error("Erro ao carregar tipos de entrega."));

    if (isEditing) {
      setLoading(true);
      buscarEntrega(id)
        .then((res) => {
          const e = res.data;
          setForm({
            destinatario: e.destinatario || "",
            endereco: e.endereco || "",
            tipo_entrega_id: e.tipo_entrega_id || "",
            data_postagem: e.data_postagem || "",
            data_entrega: e.data_entrega || "",
          });
        })
        .catch(() => toast.error("Erro ao carregar entrega."))
        .finally(() => setLoading(false));
    }
  }, [id, isEditing]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.destinatario.trim()) { toast.warning("Informe o destinatário."); return; }
    if (!form.endereco.trim()) { toast.warning("Informe o endereço."); return; }
    if (!form.tipo_entrega_id) { toast.warning("Selecione o tipo de entrega."); return; }
    if (!form.data_postagem) { toast.warning("Informe a data de postagem."); return; }

    try {
      setSaving(true);
      const payload = {
        destinatario: form.destinatario.trim(),
        endereco: form.endereco.trim(),
        tipo_entrega_id: Number(form.tipo_entrega_id),
        data_postagem: form.data_postagem,
        data_entrega: form.data_entrega || null,
      };
      if (isEditing) {
        await atualizarEntrega(id, payload);
        toast.success("Entrega atualizada com sucesso!");
      } else {
        await criarEntrega(payload);
        toast.success("Entrega cadastrada com sucesso!");
      }
      navigate("/entregas");
    } catch {
      toast.error("Erro ao salvar entrega.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div style={{ padding: 32 }}>{[1,2,3].map(n => <div key={n} className="shimmer-row" style={{ maxWidth: 500, marginBottom: 12 }} />)}</div>;

  return (
    <div className="form-card">
      <div className="form-card-header">
        <i className="bi bi-box-seam" />
        {isEditing ? "Editar Entrega" : "Nova Entrega"}
      </div>
      <form className="form-card-body" onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label className="form-label-custom">Destinatário <span style={{ color: "var(--danger)" }}>*</span></label>
          <input className="form-control-custom" name="destinatario" value={form.destinatario} onChange={handleChange} placeholder="Nome de quem vai receber" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label className="form-label-custom">Endereço <span style={{ color: "var(--danger)" }}>*</span></label>
          <input className="form-control-custom" name="endereco" value={form.endereco} onChange={handleChange} placeholder="Rua, número, cidade..." />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label className="form-label-custom">Tipo de Entrega <span style={{ color: "var(--danger)" }}>*</span></label>
          <select className="form-control-custom" name="tipo_entrega_id" value={form.tipo_entrega_id} onChange={handleChange}>
            <option value="">Selecione...</option>
            {tipos.map((t) => (
              <option key={t.id} value={t.id}>{t.nome} — {t.prazo_dias} {t.prazo_dias === 1 ? "dia" : "dias"} — R$ {Number(t.valor).toFixed(2).replace(".", ",")}</option>
            ))}
          </select>
          <div className="form-hint">A data prevista é calculada automaticamente pelo sistema com base no prazo do tipo escolhido.</div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label className="form-label-custom">Data de Postagem <span style={{ color: "var(--danger)" }}>*</span></label>
          <input className="form-control-custom" name="data_postagem" type="date" value={form.data_postagem} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label className="form-label-custom">Data de Entrega Real</label>
          <input className="form-control-custom" name="data_entrega" type="date" value={form.data_entrega || ""} onChange={handleChange} />
          <div className="form-hint">Preencha somente quando a entrega for realizada.</div>
        </div>
        <div className="form-actions">
          <button className="btn-primary-custom" type="submit" disabled={saving}>
            {saving ? <><span className="spinner-border spinner-border-sm" style={{ marginRight: 6 }} />Salvando...</> : <><i className="bi bi-check-lg" />{isEditing ? "Salvar alterações" : "Cadastrar"}</>}
          </button>
          <button className="btn-secondary-custom" type="button" onClick={() => navigate("/entregas")}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
