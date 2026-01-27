import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './NavbarPro.css';
import logo from '../../assets/logo.png';

const NavbarPro = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <nav className="navbar-pro">
      <div className="navbar-pro-container">
        <div className="navbar-pro-left">
          <button 
            className={`navbar-pro-link ${location.pathname === '/mis-publicaciones' ? 'active' : ''}`}
            onClick={() => navigate('/mis-publicaciones')}
          >
            Mis publicaciones
          </button>
          <button 
            className={`navbar-pro-link ${location.pathname === '/interesados' ? 'active' : ''}`}
            onClick={() => navigate('/interesados')}
          >
            Interesados
          </button>
        </div>

        <div className="navbar-pro-center">
          <img 
            src={logo} 
            alt="Metroprop" 
            className="navbar-pro-logo" 
            onClick={() => navigate('/')}
          />
        </div>

        <div className="navbar-pro-right">
          <button className="navbar-pro-publicar">Publicar</button>
          <button className="navbar-pro-notification" aria-label="Notificaciones">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="navbar-pro-user-container" ref={userMenuRef}>
            <button className="navbar-pro-user" onClick={toggleUserMenu}>
              <span className="navbar-pro-avatar">{user?.initials || 'DB'}</span>
              <svg 
                className={`navbar-pro-arrow ${userMenuOpen ? 'active' : ''}`}
                width="12" 
                height="12" 
                viewBox="0 0 12 12" 
                fill="none"
              >
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {userMenuOpen && (
              <div className="navbar-pro-dropdown">
                <button className="navbar-pro-dropdown-item" onClick={() => navigate('/inmobiliaria')}>
                  Inmobiliaria
                </button>
                <button className="navbar-pro-dropdown-item" onClick={() => navigate('/mi-cuenta')}>
                  Mi cuenta
                </button>
                <button className="navbar-pro-dropdown-item logout">
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarPro;

