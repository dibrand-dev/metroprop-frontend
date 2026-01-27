import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';
import 'react-phone-input-2/lib/style.css';
import './RegisterProfessional.css';
import loginImage from '../../assets/logIn.png';

const RegisterProfessional = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nombre, setNombre] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [condicionFiscal, setCondicionFiscal] = useState('');
  const [cuit, setCuit] = useState('');
  const [telefono, setTelefono] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  const isFormValid = userType && email && password && nombre && condicionFiscal && cuit && telefono && acceptTerms && acceptPrivacy;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    console.log('Register Professional:', { userType, email, password, nombre, razonSocial, condicionFiscal, cuit, telefono });
  };

  return (
    <div className="register-pro-page">
      <div className="register-pro-form-section">
        <div className="register-pro-header">
          <button className="back-button" onClick={() => navigate('/register')}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver
          </button>
          <button className="close-button" onClick={() => navigate('/')}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="register-pro-form-container">
          <h1 className="register-pro-title">
            Ingresa los datos para<br />
            crear tu perfil profesional
          </h1>

          <form onSubmit={handleSubmit} className="register-pro-form">
            <div className="form-section">
              <label className="form-section-label">Tipo de usuario</label>
              <div className="select-container">
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="" disabled>Seleccionar*</option>
                  <option value="inmobiliaria">Inmobiliaria</option>
                  <option value="corredor">Corredor</option>
                  <option value="constructora">Constructora</option>
                </select>
                <svg className="select-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Correo electrónico*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <div className="password-input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 10C2.5 10 5 4.16667 10 4.16667C15 4.16667 17.5 10 17.5 10C17.5 10 15 15.8333 10 15.8333C5 15.8333 2.5 10 2.5 10Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <span className="password-hint">Usa de 6 a 10 caracteres</span>
            </div>

            <div className="form-section">
              <label className="form-section-label">Datos</label>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Razon social"
                  value={razonSocial}
                  onChange={(e) => setRazonSocial(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-section">
              <label className="form-section-label">Condición fiscal</label>
              <div className="select-container">
                <select
                  value={condicionFiscal}
                  onChange={(e) => setCondicionFiscal(e.target.value)}
                  className="form-select"
                  required
                >
                  <option value="" disabled>Seleccionar*</option>
                  <option value="monotributista">Monotributista</option>
                  <option value="responsable-inscripto">Responsable Inscripto</option>
                  <option value="exento">Exento</option>
                </select>
                <svg className="select-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Cuit*"
                  value={cuit}
                  onChange={(e) => setCuit(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group phone-input-group">
                <PhoneInput
                  country="ar"
                  value={telefono}
                  onChange={(value) => setTelefono(value)}
                  localization={es}
                  enableSearch
                  searchPlaceholder="Buscar país..."
                  inputProps={{
                    required: true,
                    placeholder: 'Teléfono móvil*'
                  }}
                  containerClass="phone-input-container"
                  inputClass="phone-input-field"
                  buttonClass="phone-input-button"
                  dropdownClass="phone-input-dropdown"
                  searchClass="phone-input-search"
                />
              </div>
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">Acepto Términos y condiciones de uso</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={acceptPrivacy}
                  onChange={(e) => setAcceptPrivacy(e.target.checked)}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">Acepto Política de privacidad</span>
              </label>
            </div>

            <button 
              type="submit" 
              className={`register-pro-button ${isFormValid ? 'active' : ''}`}
              disabled={!isFormValid}
            >
              Registrarme
            </button>
          </form>
        </div>
      </div>

      <div className="register-pro-image-section">
        <img src={loginImage} alt="Register Professional" className="register-pro-image" />
      </div>
    </div>
  );
};

export default RegisterProfessional;
