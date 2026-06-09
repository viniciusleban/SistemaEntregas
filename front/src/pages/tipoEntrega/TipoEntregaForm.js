import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { buscarTipo, criarTipo, atualizarTipo } from "../../services/tipoEntregaService";

export default function TipoEntregaForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [form, setForm] = useState({ nome: "", prazo_dias: "", valor: "" });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      buscarTipo(id)
        .then((res) => setForm(res.data))
        .catch(() => toast.error("Erro ao carregar tipo de entrega."))
        .finally(() => setLoading(false));
    }
  }, [id, isEditing]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.nome.trim()) { toast.warning("Informe o nome."); return; }
    if (!form.prazo_dias || Number(form.prazo_dias) < 1) { toast.warning("Informe um prazo válido."); return; }
    if (!form.valor || Number(form.valor) <= 0) { toast.warning("Informe um valor válido."); return; }

    try {
      setSaving(true);
      const payload = {
        nome: form.nome.trim(),
        prazo_dias: Number(form.prazo_dias),
        valor: Number(form.valor),
      };
      if (isEditing) {
        await atualizarTipo(id, payload);
        toast.success("Tipo de entrega atualizado!");
      } else {
        await criarTipo(payload);
        toast.success("Tipo de entrega cadastrado!");
      }
      navigate("/tipos-entrega");
    } catch {
      toast.error("Erro ao salvar tipo de entrega.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div style={{ padding: 32 }}><div className="shimmer-row" style={{ maxWidth: 400 }} /></div>;

  return (
    <div className="form-card">
      <div className="form-card-header">
        <i className="bi bi-tags" />
        {isEditing ? "Editar Tipo de Entrega" : "Novo Tipo de Entrega"}
      </div>
      <form className="form-card-body" onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label className="form-label-custom">Nome <span style={{ color: "var(--danger)" }}>*</span></label>
          <input className="form-control-custom" name="nome" value={form.nome} onChange={handleChange} placeholder="Ex: Normal, Expressa, Motoboy..." />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label className="form-label-custom">Prazo em Dias <span style={{ color: "var(--danger)" }}>*</span></label>
          <input className="form-control-custom" name="prazo_dias" type="number" min="1" value={form.prazo_dias} onChange={handleChange} placeholder="Ex: 7" />
          <div className="form-hint">A data prevista de entrega é calculada automaticamente pelo back-end.</div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label className="form-label-custom">Valor (R$) <span style={{ color: "var(--danger)" }}>*</span></label>
          <input className="form-control-custom" name="valor" type="number" min="0" step="0.01" value={form.valor} onChange={handleChange} placeholder="Ex: 15.90" />
        </div>
        <div className="form-actions">
          <button className="btn-primary-custom" type="submit" disabled={saving}>
            {saving ? <><span className="spinner-border spinner-border-sm" style={{ marginRight: 6 }} />Salvando...</> : <><i className="bi bi-check-lg" />{isEditing ? "Salvar alterações" : "Cadastrar"}</>}
          </button>
          <button className="btn-secondary-custom" type="button" onClick={() => navigate("/tipos-entrega")}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
