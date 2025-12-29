import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import logo from '../../assets/logo.png';
import loginImage from '../../assets/logIn.png';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle register logic here
    console.log('Register:', { email, password, confirmPassword, acceptTerms, acceptPrivacy });
  };

  const handleGoogleRegister = () => {
    // Handle Google register logic here
    console.log('Google register');
  };

  return (
    <div className="register-page">
      <div className="register-form-section">
        <div className="register-header">
          <button className="back-button" onClick={() => navigate('/')}>
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

        <div className="register-form-container">
          <img src={logo} alt="Metroprop" className="register-logo" />

          <h1 className="register-title">Crear cuenta</h1>

          <form onSubmit={handleSubmit} className="register-form">
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
                  placeholder="Contraseña"
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
            </div>

            <div className="form-group">
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 10C2.5 10 5 4.16667 10 4.16667C15 4.16667 17.5 10 17.5 10C17.5 10 15 15.8333 10 15.8333C5 15.8333 2.5 10 2.5 10Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <button type="submit" className="register-button">
              Crear cuenta
            </button>
          </form>

          <p className="login-text">
            ¿Ya tenés cuenta? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="login-link">Iniciar sesión</a>
          </p>

          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-text">O Crear cuenta con</span>
            <span className="divider-line"></span>
          </div>

          <button className="google-button" onClick={handleGoogleRegister}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.1711 8.36788H17.4999V8.33329H9.99992V11.6666H14.7095C14.0224 13.607 12.1761 15 9.99992 15C7.2385 15 4.99992 12.7614 4.99992 9.99996C4.99992 7.23854 7.2385 4.99996 9.99992 4.99996C11.2744 4.99996 12.4341 5.48079 13.3169 6.26621L15.6744 3.90871C14.1857 2.52187 12.1949 1.66663 9.99992 1.66663C5.39784 1.66663 1.66659 5.39788 1.66659 9.99996C1.66659 14.602 5.39784 18.3333 9.99992 18.3333C14.6019 18.3333 18.3333 14.602 18.3333 9.99996C18.3333 9.44121 18.2757 8.89579 18.1711 8.36788Z" fill="#1f2937"/>
              <path d="M2.62744 6.12121L5.36536 8.12913C6.10619 6.29496 7.90036 4.99996 9.99994 4.99996C11.2745 4.99996 12.4341 5.48079 13.317 6.26621L15.6745 3.90871C14.1858 2.52187 12.1949 1.66663 9.99994 1.66663C6.79911 1.66663 4.02327 3.47371 2.62744 6.12121Z" fill="#1f2937"/>
              <path d="M10 18.3334C12.1525 18.3334 14.1084 17.5096 15.5871 16.17L13.008 13.9875C12.1432 14.6452 11.0865 15.0009 10 15C7.83255 15 5.99213 13.618 5.2988 11.6892L2.5813 13.783C3.96047 16.4817 6.76172 18.3334 10 18.3334Z" fill="#1f2937"/>
              <path d="M18.1712 8.36796H17.5V8.33337H10V11.6667H14.7096C14.3809 12.5902 13.7889 13.3972 13.0067 13.988L13.0079 13.9871L15.5871 16.1696C15.4046 16.3355 18.3333 14.1667 18.3333 10C18.3333 9.44129 18.2758 8.89587 18.1712 8.36796Z" fill="#1f2937"/>
            </svg>
            Google
          </button>

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

          <div className="professional-section">
            <p className="professional-text">
              ¿Formás parte del mercado inmobiliario<br />
              y aún no tenés cuenta?
            </p>
            <a href="#" className="professional-link">Crear cuenta profesional</a>
          </div>
        </div>
      </div>

      <div className="register-image-section">
        <img src={loginImage} alt="Register" className="register-image" />
      </div>
    </div>
  );
};

export default Register;
