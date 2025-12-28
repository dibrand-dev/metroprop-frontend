import { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';

interface NavItem {
  label: string;
  hasDropdown: boolean;
}

const navItems: NavItem[] = [
  { label: 'Comprar', hasDropdown: true },
  { label: 'Alquilar', hasDropdown: true },
  { label: 'Temporal', hasDropdown: true },
];

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
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
              {item.hasDropdown && activeDropdown === item.label && (
                <div className="dropdown-menu">
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="navbar-logo">
          <a href="/">
            <img src={logo} alt="Metroprop" />
          </a>
        </div>

        <div className="navbar-actions">
          <button className="btn-login">Ingresar</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
