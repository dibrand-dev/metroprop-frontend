import { useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';
import './AlertModal.css';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AlertModal = ({ isOpen, onClose }: AlertModalProps) => {
  const [alertName, setAlertName] = useState('');
  const [frequency, setFrequency] = useState('Inmediata');

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAccept = () => {
    console.log('Alerta criada:', { alertName, frequency });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="alert-modal-overlay" onClick={handleOverlayClick}>
      <div className="alert-modal">
        <div className="alert-modal-header">
          <h2 className="alert-modal-title">Crear alerta</h2>
          <button className="alert-modal-close" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <div className="alert-modal-content">
          <div className="alert-modal-icon">
            <FiCheck size={32} />
          </div>

          <h3 className="alert-modal-message">
            ¡Tu alerta se creo correctamente respetando tus filtros!
          </h3>

          <div className="alert-modal-field">
            <label className="alert-modal-label">Nombre de tu alerta</label>
            <input
              type="text"
              className="alert-modal-input"
              placeholder="Input"
              value={alertName}
              onChange={(e) => setAlertName(e.target.value)}
            />
          </div>

          <div className="alert-modal-field">
            <label className="alert-modal-label">Elegí la frecuencia de notificaciones por mail</label>
            <select
              className="alert-modal-select"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="Inmediata">Inmediata</option>
              <option value="Diaria">Diaria</option>
              <option value="Semanal">Semanal</option>
              <option value="Mensual">Mensual</option>
            </select>
          </div>

          <button className="alert-modal-btn" onClick={handleAccept}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
