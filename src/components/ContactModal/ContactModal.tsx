import { useState } from 'react';
import { FiX, FiCheck, FiMail } from 'react-icons/fi';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import es from 'react-phone-input-2/lang/es.json';
import './ContactModal.css';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [phone, setPhone] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [acceptPrivacy, setAcceptPrivacy] = useState(true);

  const questions = [
    '¿Sigue disponible?',
    '¿Cuáles son los requisitos?',
    '¿Acepta mascotas?',
    '¿Cuándo puedo visitarlo?'
  ];

  const toggleQuestion = (question: string) => {
    if (selectedQuestions.includes(question)) {
      setSelectedQuestions(selectedQuestions.filter(q => q !== question));
    } else {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
        <div className="contact-modal-header">
          <h2>Contactá al anunciante</h2>
          <button className="contact-modal-close" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>
        
        <div className="contact-modal-content">
          <div className="contact-modal-questions-section">
            <h3 className="contact-modal-title">Preguntas para el anunciante</h3>
            <p className="contact-modal-subtitle">
              Seleccioná una o más preguntas, o escribí tu consulta.
            </p>
            
            <div className="contact-modal-questions">
              {questions.map((question, index) => (
                <button 
                  key={index}
                  className={`contact-question-btn ${selectedQuestions.includes(question) ? 'active' : ''}`}
                  onClick={() => toggleQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          
          <div className="contact-form">
            <div className="contact-form-row">
              <div className="contact-form-field">
                <label>Nombre</label>
                <input type="text" placeholder="Nombre" />
              </div>
              <div className="contact-form-field">
                <label>Email</label>
                <input type="email" placeholder="unemail@dibrand.com" />
              </div>
            </div>
            
            <div className="contact-form-field contact-form-field-phone">
              <label>Teléfono</label>
              <PhoneInput
                country={'ar'}
                value={phone}
                onChange={setPhone}
                inputClass="contact-phone-input"
                buttonClass="contact-phone-button"
                containerClass="contact-phone-container"
                enableSearch
                searchPlaceholder="Buscar país..."
                searchNotFound="No se encontró el país"
                localization={es}
              />
            </div>
            
            <div className="contact-form-field contact-form-field-full">
              <label>Mensaje</label>
              <textarea placeholder="¡Hola! Quiero que se comuniquen conmigo por esta propiedad en alquiler que vi en Metroprop"></textarea>
            </div>
            
            <div className="contact-form-checkbox">
              <label>
                <input 
                  type="checkbox" 
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                />
                <span className="contact-checkbox-custom">
                  {acceptTerms && <FiCheck size={14} />}
                </span>
                Acepto los <a href="#">Términos y condiciones de Uso</a>
              </label>
            </div>
            
            <div className="contact-form-checkbox">
              <label>
                <input 
                  type="checkbox"
                  checked={acceptPrivacy}
                  onChange={() => setAcceptPrivacy(!acceptPrivacy)}
                />
                <span className="contact-checkbox-custom">
                  {acceptPrivacy && <FiCheck size={14} />}
                </span>
                Acepto la <a href="#">Política de Privacidad</a>
              </label>
            </div>
            
            <button className="contact-submit-btn">
              <FiMail size={20} />
              Contactar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;

