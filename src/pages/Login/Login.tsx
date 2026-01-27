import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';
import logo from '../../assets/logo.png';
import loginImage from '../../assets/logIn.png';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', { email, password });
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      console.error('Login failed:', result.error);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login');
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="login-form-section">
        <div className="login-header">
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

        <div className="login-form-container">
          <img src={logo} alt="Metroprop" className="login-logo" />

          <h1 className="login-title">Iniciar sesión</h1>

          <form onSubmit={handleSubmit} className="login-form">
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
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 10C2.5 10 5 4.16667 10 4.16667C15 4.16667 17.5 10 17.5 10C17.5 10 15 15.8333 10 15.8333C5 15.8333 2.5 10 2.5 10Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.82083 8.82083C8.50868 9.13298 8.33333 9.55749 8.33333 10C8.33333 10.4425 8.50868 10.867 8.82083 11.1792C9.13298 11.4913 9.55749 11.6667 10 11.6667C10.4425 11.6667 10.867 11.4913 11.1792 11.1792" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14.95 14.95C13.5255 16.0358 11.7909 16.6374 10 16.6667C4.16667 16.6667 1.66667 10 1.66667 10C2.69554 8.06825 4.14558 6.38051 5.90833 5.05833M8.25 3.53333C8.82361 3.39907 9.41089 3.33195 10 3.33333C15.8333 3.33333 18.3333 10 18.3333 10C17.8291 10.9463 17.2199 11.8373 16.5167 12.6583" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1.66667 1.66667L18.3333 18.3333" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <a href="#" className="forgot-password">Olvidé mi contraseña</a>

            <button type="submit" className="login-button">
              Iniciar sesión
            </button>
          </form>

          <p className="signup-text">
            ¿No tenés cuenta? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/register'); }} className="signup-link">Crear una cuenta</a>
          </p>

          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-text">O Iniciar sesión con</span>
            <span className="divider-line"></span>
          </div>

          <button className="google-button" onClick={handleGoogleLogin}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.1711 8.36788H17.4999V8.33329H9.99992V11.6666H14.7095C14.0224 13.607 12.1761 15 9.99992 15C7.2385 15 4.99992 12.7614 4.99992 9.99996C4.99992 7.23854 7.2385 4.99996 9.99992 4.99996C11.2744 4.99996 12.4341 5.48079 13.3169 6.26621L15.6744 3.90871C14.1857 2.52187 12.1949 1.66663 9.99992 1.66663C5.39784 1.66663 1.66659 5.39788 1.66659 9.99996C1.66659 14.602 5.39784 18.3333 9.99992 18.3333C14.6019 18.3333 18.3333 14.602 18.3333 9.99996C18.3333 9.44121 18.2757 8.89579 18.1711 8.36788Z" fill="#1f2937"/>
              <path d="M2.62744 6.12121L5.36536 8.12913C6.10619 6.29496 7.90036 4.99996 9.99994 4.99996C11.2745 4.99996 12.4341 5.48079 13.317 6.26621L15.6745 3.90871C14.1858 2.52187 12.1949 1.66663 9.99994 1.66663C6.79911 1.66663 4.02327 3.47371 2.62744 6.12121Z" fill="#1f2937"/>
              <path d="M10 18.3334C12.1525 18.3334 14.1084 17.5096 15.5871 16.17L13.008 13.9875C12.1432 14.6452 11.0865 15.0009 10 15C7.83255 15 5.99213 13.618 5.2988 11.6892L2.5813 13.783C3.96047 16.4817 6.76172 18.3334 10 18.3334Z" fill="#1f2937"/>
              <path d="M18.1712 8.36796H17.5V8.33337H10V11.6667H14.7096C14.3809 12.5902 13.7889 13.3972 13.0067 13.988L13.0079 13.9871L15.5871 16.1696C15.4046 16.3355 18.3333 14.1667 18.3333 10C18.3333 9.44129 18.2758 8.89587 18.1712 8.36796Z" fill="#1f2937"/>
            </svg>
            Google
          </button>
        </div>
      </div>

      <div className="login-image-section">
        <img src={loginImage} alt="Login" className="login-image" />
      </div>
    </div>
  );
};

export default Login;
