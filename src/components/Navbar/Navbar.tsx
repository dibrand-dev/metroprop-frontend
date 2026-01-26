import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';
import logo from '../../assets/logo.png';
import logoMobile from '../../assets/logomobile.png';

interface NavbarProps {
  showMobileSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  hasSearchError?: boolean;
}

interface SubMenuItem {
  label: string;
  items?: string[];
}

interface NavItem {
  label: string;
  hasDropdown: boolean;
  subMenus?: SubMenuItem[];
  otrosSection?: SubMenuItem;
}

const navItems: NavItem[] = [
  { 
    label: 'Comprar', 
    hasDropdown: true,
    subMenus: [
      { 
        label: 'Ubicación', 
        items: ['Capital Federal', 'GBA Norte', 'GBA Sur', 'Santa Fe', 'GBA Oeste', 'Buenos Aires Costa Atlántica', 'Córdoba', 'Buenos Aires (fuera de GBA)', 'Mendoza', 'Neuquén', 'Río Negro']
      },
      { 
        label: 'Tipo de propiedad', 
        items: ['Departamento', 'Casa', 'Terreno', 'PH', 'Local Comercial']
      }
    ],
    otrosSection: {
      label: 'Otros',
      items: ['Emprendimientos']
    }
  },
  { label: 'Alquilar', hasDropdown: true },
  { label: 'Temporal', hasDropdown: true },
];

const Navbar = ({ showMobileSearch = false, searchValue = '', onSearchChange, hasSearchError = false }: NavbarProps) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [expandedSubMenu, setExpandedSubMenu] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setUserMenuOpen(false); 
    if (mobileMenuOpen) {
      setExpandedMobileMenu(null);
      setExpandedSubMenu(null);
    }
  };

  const toggleMobileMenuItem = (label: string) => {
    setExpandedMobileMenu(expandedMobileMenu === label ? null : label);
    setExpandedSubMenu(null);
  };

  const toggleSubMenu = (label: string) => {
    setExpandedSubMenu(expandedSubMenu === label ? null : label);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    setMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className={`navbar ${showMobileSearch ? 'navbar-with-search' : ''}`}>
      <div className="navbar-container">
        <button className="mobile-menu-button" onClick={toggleMobileMenu} aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {showMobileSearch && (
          <div className="navbar-search-mobile">
            <input
              type="text"
              placeholder="Dirección, barrio, c..."
              className={`navbar-search-input ${hasSearchError ? 'navbar-search-error' : ''}`}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
            <svg className={`navbar-search-icon ${hasSearchError ? 'navbar-search-icon-error' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke={hasSearchError ? "#ef4444" : "#9ca3af"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}

        <ul className="navbar-menu" ref={dropdownRef}>
          {navItems.map((item) => (
            <li key={item.label} className="navbar-item">
              <button
                className="navbar-link"
                onClick={() => item.hasDropdown && toggleDropdown(item.label)}
              >
                {item.label}
                {item.hasDropdown && (
                  <svg
                    className={`dropdown-arrow ${activeDropdown === item.label ? 'active' : ''}`}
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
              {item.hasDropdown && activeDropdown === item.label && item.subMenus && (
                <div className="dropdown-menu">
                  <div className="dropdown-columns">
                    <div className="dropdown-column">
                      <span className="dropdown-column-title">{item.subMenus[0].label}</span>
                      {item.subMenus[0].items?.map((subItem) => (
                        <button key={subItem} className="dropdown-item">{subItem}</button>
                      ))}
                    </div>
                    <div className="dropdown-column">
                      <span className="dropdown-column-title">{item.subMenus[1].label}</span>
                      {item.subMenus[1].items?.map((subItem) => (
                        <button key={subItem} className="dropdown-item">{subItem}</button>
                      ))}
                      {item.otrosSection && (
                        <>
                          <span className="dropdown-column-title dropdown-otros-title">{item.otrosSection.label}</span>
                          {item.otrosSection.items?.map((subItem) => (
                            <button key={subItem} className="dropdown-item">{subItem}</button>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="navbar-logo">
          <a href="/">
            <img src={logo} alt="Metroprop" className="logo-desktop" />
            <img src={logoMobile} alt="Metroprop" className="logo-mobile" />
          </a>
        </div>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              <button className="btn-publicar">Publicar</button>
              <button className="btn-notification" aria-label="Notificaciones">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="user-menu-container" ref={userMenuRef}>
                <button className="btn-user" onClick={toggleUserMenu}>
                  <span className="user-avatar">{user?.initials}</span>
                  <svg 
                    className={`user-arrow ${userMenuOpen ? 'active' : ''}`}
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {userMenuOpen && (
                  <div className="user-dropdown">
                    <button className="user-dropdown-publicar">Publicar</button>
                    <div className="user-dropdown-header">
                      <span className="user-dropdown-avatar">{user?.initials}</span>
                      <div className="user-dropdown-info">
                        <span className="user-dropdown-name">{user?.name || 'Dibrand'}</span>
                        <span className="user-dropdown-email">{user?.email || 'usuariounmail@gmail.com'}</span>
                      </div>
                    </div>
                    <div className="user-dropdown-menu">
                      <button className="user-dropdown-item" onClick={() => navigate('/contactados')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        Contactados
                      </button>
                      <button className="user-dropdown-item" onClick={() => navigate('/favoritos')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        Favoritos
                      </button>
                      <button className="user-dropdown-item" onClick={() => navigate('/alertas')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"/>
                          <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"/>
                        </svg>
                        Búsquedas y alertas
                      </button>
                      <button className="user-dropdown-item" onClick={() => navigate('/mis-publicaciones')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                          <line x1="16" y1="13" x2="8" y2="13"/>
                          <line x1="16" y1="17" x2="8" y2="17"/>
                          <polyline points="10 9 9 9 8 9"/>
                        </svg>
                        Mis publicaciones
                      </button>
                      <button className="user-dropdown-item" onClick={() => navigate('/mi-cuenta')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                        Mi cuenta
                      </button>
                    </div>
                    <div className="user-dropdown-footer">
                      <button className="user-dropdown-item logout" onClick={handleLogout}>
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button className="btn-login" onClick={handleLoginClick}>Ingresar</button>
          )}
        </div>
      </div>

      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <a href="/" className="mobile-menu-logo">
            <img src={logoMobile} alt="Metroprop" className="mobile-menu-logo-icon" />
            <span className="mobile-menu-logo-text">METROPROP</span>
          </a>
          <button className="mobile-menu-close" onClick={toggleMobileMenu} aria-label="Fechar menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="mobile-menu-content">
          {navItems.map((item) => (
            <div key={item.label} className="mobile-menu-section">
              <button 
                className={`mobile-menu-link ${expandedMobileMenu === item.label ? 'active' : ''}`}
                onClick={() => item.hasDropdown && toggleMobileMenuItem(item.label)}
              >
                {item.label}
                {item.hasDropdown && (
                  <svg 
                    className={`mobile-menu-arrow ${expandedMobileMenu === item.label ? 'active' : ''}`}
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
              
              {item.hasDropdown && expandedMobileMenu === item.label && item.subMenus && (
                <div className="mobile-submenu">
                  {item.subMenus.map((subMenu) => (
                    <div key={subMenu.label} className="mobile-submenu-section">
                      <button 
                        className={`mobile-submenu-title ${expandedSubMenu === subMenu.label ? 'active' : ''}`}
                        onClick={() => toggleSubMenu(subMenu.label)}
                      >
                        {subMenu.label}
                        <svg 
                          className={`mobile-submenu-arrow ${expandedSubMenu === subMenu.label ? 'active' : ''}`}
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      
                      {expandedSubMenu === subMenu.label && subMenu.items && (
                        <div className="mobile-submenu-items">
                          {subMenu.items.map((subItem) => (
                            <button key={subItem} className="mobile-submenu-item">{subItem}</button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {item.otrosSection && (
                    <div className="mobile-menu-section mobile-emprendimientos">
                      <button className="mobile-menu-link-simple">
                        {item.otrosSection.items?.[0]}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
