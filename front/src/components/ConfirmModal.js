import React from "react";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-icon">
          <i className="bi bi-exclamation-triangle" />
        </div>
        <div className="modal-title">Confirmar exclusão</div>
        <div className="modal-desc">{message}</div>
        <div className="modal-actions">
          <button className="btn-secondary-custom" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn-danger-custom" onClick={onConfirm}>
            <i className="bi bi-trash" style={{ marginRight: 5 }} />
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
