import { useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import es from 'react-phone-input-2/lang/es.json';
import './WhatsAppModal.css';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhatsAppModal = ({ isOpen, onClose }: WhatsAppModalProps) => {
  const [phone, setPhone] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [acceptPrivacy, setAcceptPrivacy] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="whatsapp-modal-overlay" onClick={onClose}>
      <div className="whatsapp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="whatsapp-modal-header">
          <h2>WhatsApp</h2>
          <button className="whatsapp-modal-close" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>
        
        <div className="whatsapp-modal-content">
          <h3 className="whatsapp-modal-title">
            Escribile un mensaje al anunciante por esta propiedad
          </h3>
          
          <div className="whatsapp-form">
            <div className="whatsapp-form-row">
              <div className="whatsapp-form-field">
                <label>Nombre</label>
                <input type="text" placeholder="Nombre" />
              </div>
              <div className="whatsapp-form-field">
                <label>Email</label>
                <input type="email" placeholder="unemail@dibrand.com" />
              </div>
            </div>
            
            <div className="whatsapp-form-field whatsapp-form-field-phone">
              <label>Teléfono</label>
              <PhoneInput
                country={'ar'}
                value={phone}
                onChange={setPhone}
                inputClass="whatsapp-phone-input"
                buttonClass="whatsapp-phone-button"
                containerClass="whatsapp-phone-container"
                enableSearch
                searchPlaceholder="Buscar país..."
                searchNotFound="No se encontró el país"
                localization={es}
              />
            </div>
            
            <div className="whatsapp-form-checkbox">
              <label>
                <input 
                  type="checkbox" 
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                />
                <span className="whatsapp-checkbox-custom">
                  {acceptTerms && <FiCheck size={14} />}
                </span>
                Acepto los <a href="#">Términos y condiciones de Uso</a>
              </label>
            </div>
            
            <div className="whatsapp-form-checkbox">
              <label>
                <input 
                  type="checkbox"
                  checked={acceptPrivacy}
                  onChange={() => setAcceptPrivacy(!acceptPrivacy)}
                />
                <span className="whatsapp-checkbox-custom">
                  {acceptPrivacy && <FiCheck size={14} />}
                </span>
                Acepto la <a href="#">Política de Privacidad</a>
              </label>
            </div>
            
            <button className="whatsapp-submit-btn">
              Iniciar chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppModal;

