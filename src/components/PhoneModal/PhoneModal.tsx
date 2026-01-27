import { useState } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import es from 'react-phone-input-2/lang/es.json';
import './PhoneModal.css';

interface PhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PhoneModal = ({ isOpen, onClose }: PhoneModalProps) => {
  const [phone, setPhone] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [acceptPrivacy, setAcceptPrivacy] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="phone-modal-overlay" onClick={onClose}>
      <div className="phone-modal" onClick={(e) => e.stopPropagation()}>
        <div className="phone-modal-header">
          <h2 className="phone-modal-title">Ver teléfono</h2>
          <button className="phone-modal-close" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>
        
        <div className="phone-modal-content">
          <h3 className="phone-modal-subtitle">
            Completá tus datos y podrás ver el teléfono del anunciante.
          </h3>
          
          <form className="phone-modal-form">
            <div className="phone-form-row">
              <div className="phone-form-field">
                <label>Nombre</label>
                <input type="text" placeholder="Nombre" />
              </div>
              <div className="phone-form-field">
                <label>Email</label>
                <input type="email" placeholder="unemail@dibrand.com" />
              </div>
            </div>
            
            <div className="phone-form-field phone-form-field-full">
              <label>Teléfono</label>
              <PhoneInput
                country={'ar'}
                value={phone}
                onChange={setPhone}
                inputClass="phone-input-field"
                buttonClass="phone-input-button"
                containerClass="phone-input-container"
                enableSearch
                searchPlaceholder="Buscar país..."
                searchNotFound="No se encontró el país"
                localization={es}
              />
            </div>
            
            <div className="phone-form-checkbox">
              <label>
                <input 
                  type="checkbox" 
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                />
                <span className="phone-checkbox-custom">
                  {acceptTerms && <FiCheck size={14} />}
                </span>
                Acepto los <a href="#">Términos y condiciones de Uso</a>
              </label>
            </div>
            
            <div className="phone-form-checkbox">
              <label>
                <input 
                  type="checkbox"
                  checked={acceptPrivacy}
                  onChange={() => setAcceptPrivacy(!acceptPrivacy)}
                />
                <span className="phone-checkbox-custom">
                  {acceptPrivacy && <FiCheck size={14} />}
                </span>
                Acepto la <a href="#">Política de Privacidad</a>
              </label>
            </div>
            
            <button className="phone-submit-btn" type="submit">
              Ver teléfono
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhoneModal;
