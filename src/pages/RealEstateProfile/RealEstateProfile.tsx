import { useState } from 'react';
import NavbarPro from '../../components/NavbarPro';
import { FiChevronRight, FiChevronLeft, FiEdit2, FiUpload, FiPlus, FiChevronDown, FiLock, FiTrash2, FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import './RealEstateProfile.css';
import tokkoLogo from '../../assets/tokko.png';
import remaxLogo from '../../assets/remax.png';

type MenuOption = 'datos' | 'sucursales' | 'destaques' | 'colaboradores';

const RealEstateProfile = () => {
  const [activeMenu, setActiveMenu] = useState<MenuOption>('datos');
  const [isMobileDetailView, setIsMobileDetailView] = useState(false);
  const [sucursalActiva, setSucursalActiva] = useState(true);
  const [isEditingSucursal, setIsEditingSucursal] = useState(false);
  const [sameContactData, setSameContactData] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [isAddingColaborador, setIsAddingColaborador] = useState(false);

  const menuOptions = [
    { id: 'datos' as MenuOption, label: 'Datos de inmobiliaria' },
    { id: 'sucursales' as MenuOption, label: 'Sucursales' },
    { id: 'destaques' as MenuOption, label: 'Destaques' },
    { id: 'colaboradores' as MenuOption, label: 'Colaboradores' },
  ];

  const handleMenuClick = (menuId: MenuOption) => {
    setActiveMenu(menuId);
    setIsMobileDetailView(true);
  };

  const handleBackClick = () => {
    if (isEditingSucursal) {
      setIsEditingSucursal(false);
    } else if (isAddingColaborador) {
      setIsAddingColaborador(false);
    } else {
      setIsMobileDetailView(false);
    }
  };

  const handleAddColaborador = () => {
    setIsAddingColaborador(true);
  };

  const renderAddColaboradorContent = () => (
    <div className="rep-content-section rep-add-colaborador-section">
      <div className="rep-add-colaborador-header">
        <h1 className="rep-content-title">Tus colaboradores</h1>
        <div className="rep-add-colaborador-buttons">
          <button className="rep-cancelar-btn" onClick={() => setIsAddingColaborador(false)}>Cancelar</button>
          <button className="rep-guardar-btn">Guardar</button>
        </div>
      </div>

      <div className="rep-roles-list">
        <div className="rep-role-item">
          <div className="rep-role-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <span className="rep-role-name">Administrador</span>
          <span className="rep-role-desc">Publica, edita, lee todos los avisos y edita datos de la empresa y administra usuarios.</span>
        </div>
        <div className="rep-role-item">
          <div className="rep-role-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <span className="rep-role-name">Supervisador</span>
          <span className="rep-role-desc">Publica, edita, lee todos los avisos y administra usuarios.</span>
        </div>
        <div className="rep-role-item">
          <div className="rep-role-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <span className="rep-role-name">Vendedor</span>
          <span className="rep-role-desc">Publica, edita y lee avisos en los que tiene permisos.</span>
        </div>
      </div>

      <div className="rep-form-divider"></div>

      <div className="rep-form-group">
        <label className="rep-form-label">Tipo de usuario</label>
        <div className="rep-select-container">
          <select className="rep-form-select">
            <option value="">Seleccionar</option>
            <option value="admin">Administrador</option>
            <option value="supervisor">Supervisador</option>
            <option value="vendedor">Vendedor</option>
          </select>
          <FiChevronDown className="rep-select-arrow" size={20} />
        </div>
      </div>

      <h2 className="rep-form-section-title">Datos del colaborador</h2>

      <div className="rep-form-group">
        <label className="rep-form-label">Email (opcional)</label>
        <input type="email" className="rep-form-input" placeholder="Email" />
      </div>

      <div className="rep-form-row">
        <div className="rep-form-group">
          <label className="rep-form-label">Teléfono</label>
          <input type="tel" className="rep-form-input" placeholder="Número de teléfono" />
        </div>
        <div className="rep-form-group">
          <label className="rep-form-label">Teléfono 2 (opcional)</label>
          <input type="tel" className="rep-form-input" placeholder="Número de teléfono" />
        </div>
      </div>

      <div className="rep-form-row rep-form-row-3">
        <div className="rep-form-group">
          <label className="rep-form-label">Provincia (opcional)</label>
          <div className="rep-select-container">
            <select className="rep-form-select">
              <option value="">Seleccionar</option>
            </select>
            <FiChevronDown className="rep-select-arrow" size={20} />
          </div>
        </div>
        <div className="rep-form-group">
          <label className="rep-form-label">Ciudad (opcional)</label>
          <div className="rep-select-container">
            <select className="rep-form-select">
              <option value="">Seleccionar</option>
            </select>
            <FiChevronDown className="rep-select-arrow" size={20} />
          </div>
        </div>
        <div className="rep-form-group">
          <label className="rep-form-label">Barrio (opcional)</label>
          <div className="rep-select-container">
            <select className="rep-form-select">
              <option value="">Seleccionar</option>
            </select>
            <FiChevronDown className="rep-select-arrow" size={20} />
          </div>
        </div>
      </div>

      <button className="rep-eliminar-colaborador-btn">Eliminar colaborador</button>

      <div className="rep-add-colaborador-footer">
        <button className="rep-cancelar-btn" onClick={() => setIsAddingColaborador(false)}>Cancelar</button>
        <button className="rep-guardar-btn">Guardar</button>
      </div>
    </div>
  );

  const handleEditSucursal = () => {
    setIsEditingSucursal(true);
  };

  const renderEditSucursalContent = () => (
    <div className="rep-content-section rep-edit-sucursal-section">
      <div className="rep-edit-header">
        <h1 className="rep-content-title">Modificar sucursal</h1>
        <button className="rep-guardar-btn">Guardar sucursal</button>
      </div>
      <div className="rep-edit-divider"></div>

      <div className="rep-form-group">
        <label className="rep-form-label">Nombre de la sucursal</label>
        <input type="text" className="rep-form-input" placeholder="Nombre de la sucursal" />
      </div>

      <h2 className="rep-form-section-title">Datos de contacto para venta</h2>

      <div className="rep-form-row">
        <div className="rep-form-group">
          <label className="rep-form-label">Email (opcional)</label>
          <input type="email" className="rep-form-input" placeholder="Email" />
        </div>
        <div className="rep-form-group">
          <label className="rep-form-label">Teléfono</label>
          <input type="tel" className="rep-form-input" placeholder="Número de teléfono" />
          <button className="rep-add-phone-btn">
            <FiPlus size={16} />
            <span>Agregar otro teléfono</span>
          </button>
        </div>
      </div>

      <label className="rep-checkbox-label">
        <input 
          type="checkbox" 
          checked={sameContactData} 
          onChange={() => setSameContactData(!sameContactData)} 
          className="rep-checkbox-input"
        />
        <span className="rep-checkbox-custom"></span>
        <span className="rep-checkbox-text">Los datos de contacto para venta son los mismos que para alquiler</span>
      </label>

      <div className="rep-form-group">
        <label className="rep-form-label">Agregar logo</label>
        <div className="rep-logo-upload-row">
          <button className="rep-upload-btn">
            <FiUpload size={20} />
            <span>Agregar logo</span>
          </button>
          <div className="rep-logo-preview">
            <img src={remaxLogo} alt="Logo" />
          </div>
        </div>
        <p className="rep-upload-hint">Tamaño recomendado 138px por 75px. Peso máximo 200 KB.</p>
      </div>

      <div className="rep-form-row">
        <div className="rep-form-group">
          <label className="rep-form-label">Dirección (opcional)</label>
          <input type="text" className="rep-form-input" placeholder="Dirección" />
        </div>
        <div className="rep-form-group">
          <label className="rep-form-label">Provincia (opcional)</label>
          <div className="rep-select-container">
            <select className="rep-form-select">
              <option value="">Seleccionar</option>
              <option value="buenos-aires">Buenos Aires</option>
              <option value="cordoba">Córdoba</option>
              <option value="santa-fe">Santa Fe</option>
            </select>
            <FiChevronDown className="rep-select-arrow" size={20} />
          </div>
        </div>
      </div>

      <div className="rep-form-row">
        <div className="rep-form-group">
          <label className="rep-form-label">Ciudad (opcional)</label>
          <div className="rep-select-container">
            <select className="rep-form-select">
              <option value="">Seleccionar</option>
            </select>
            <FiChevronDown className="rep-select-arrow" size={20} />
          </div>
        </div>
        <div className="rep-form-group">
          <label className="rep-form-label">Barrio (opcional)</label>
          <div className="rep-select-container">
            <select className="rep-form-select">
              <option value="">Seleccionar</option>
            </select>
            <FiChevronDown className="rep-select-arrow" size={20} />
          </div>
        </div>
      </div>

      <button className="rep-guardar-btn-mobile">Guardar sucursal</button>
    </div>
  );

  const renderDatosContent = () => (
    <div className="rep-content-section">
      <h1 className="rep-content-title">Datos de inmobiliaria</h1>
      
      <div className="rep-section">
        <div className="rep-section-header">
          <h2 className="rep-section-title">Generales</h2>
          <button className="rep-edit-btn">
            <FiEdit2 size={16} />
          </button>
        </div>
        
        <div className="rep-id-row">
          <div className="rep-id-card">
            <span className="rep-id-text">Identificador: <strong>300090404</strong></span>
          </div>
          <img src={tokkoLogo} alt="Tokko" className="rep-tokko-logo" />
        </div>
        
        <div className="rep-fields-grid">
          <div className="rep-field">
            <span className="rep-field-label">Nombre</span>
            <span className="rep-field-value">Rodrigo Pérez</span>
          </div>
          <div className="rep-field">
            <span className="rep-field-label">Razon social</span>
            <span className="rep-field-value">Rope</span>
          </div>
          <div className="rep-field">
            <span className="rep-field-label">Condición fiscal</span>
            <span className="rep-field-value">Responsable inscripto</span>
          </div>
          <div className="rep-field">
            <span className="rep-field-label">Número de documento</span>
            <span className="rep-field-value">27930176974</span>
          </div>
          <div className="rep-field">
            <span className="rep-field-label">Número de matrícula</span>
            <span className="rep-field-value"></span>
          </div>
          <div className="rep-field">
            <span className="rep-field-label">Email</span>
            <span className="rep-field-value"></span>
          </div>
          <div className="rep-field">
            <span className="rep-field-label">Teléfono</span>
            <span className="rep-field-value">1159956847</span>
          </div>
          <div className="rep-field">
            <span className="rep-field-label">Teléfono adicional</span>
            <span className="rep-field-value">11 4 99568474</span>
          </div>
        </div>
      </div>
      
      <div className="rep-section">
        <div className="rep-section-header">
          <h2 className="rep-section-title">Ubicación</h2>
          <button className="rep-edit-btn">
            <FiEdit2 size={16} />
          </button>
        </div>
        
        <div className="rep-fields-grid">
          <div className="rep-field">
            <span className="rep-field-label">Dirección</span>
            <span className="rep-field-value">Fragio 1254</span>
          </div>
          <div className="rep-field">
            <span className="rep-field-label">Provincia</span>
            <span className="rep-field-value">GBA Oeste</span>
          </div>
          <div className="rep-field">
            <span className="rep-field-label">Ciudad</span>
            <span className="rep-field-value">Ituzaingó</span>
          </div>
          <div className="rep-field">
            <span className="rep-field-label">Barrio</span>
            <span className="rep-field-value">Ituzaingó Norte</span>
          </div>
        </div>
      </div>
      
      <div className="rep-section">
        <div className="rep-section-header">
          <h2 className="rep-section-title">Descripción</h2>
          <button className="rep-edit-btn">
            <FiEdit2 size={16} />
          </button>
        </div>
        
        <div className="rep-field rep-field-full">
          <span className="rep-field-label">Descripción</span>
          <span className="rep-field-value"></span>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'datos':
        return renderDatosContent();
      case 'sucursales':
        if (isEditingSucursal) {
          return renderEditSucursalContent();
        }
        return (
          <div className="rep-content-section rep-sucursales-section">
            <div className="rep-sucursales-header">
              <h1 className="rep-content-title">Sucursales</h1>
              <button className="rep-agregar-btn">Agregar sucursal</button>
            </div>
            <p className="rep-sucursales-desc">
              Acá podes editar los datos de tus sucursales, activarlas y /o desactivarlas y agregar nuevas
            </p>
            <div className="rep-sucursal-card">
              <div className="rep-sucursal-info">
                <h3 className="rep-sucursal-title">Estudio GALAS - Sucursal: 17010603</h3>
                <p className="rep-sucursal-stats">9421 avisos | 3 colaboradores</p>
              </div>
              <div className="rep-sucursal-actions">
                <label className="rep-toggle">
                  <input 
                    type="checkbox" 
                    checked={sucursalActiva} 
                    onChange={() => setSucursalActiva(!sucursalActiva)} 
                  />
                  <span className="rep-toggle-slider"></span>
                </label>
                <span className={`rep-sucursal-status ${sucursalActiva ? 'active' : ''}`}>
                  {sucursalActiva ? 'Activa' : 'Inactiva'}
                </span>
                <button className="rep-edit-btn" onClick={handleEditSucursal}>
                  <FiEdit2 size={16} />
                </button>
              </div>
            </div>
            <button className="rep-agregar-btn-mobile">Agregar sucursal</button>
          </div>
        );
      case 'destaques':
        return (
          <div className="rep-content-section rep-destaques-section">
            <h1 className="rep-content-title">Destaques</h1>
            
            <h2 className="rep-destaques-subtitle">Productos disponibles</h2>
            <p className="rep-destaques-desc">
              Los productos se actualizarán automáticamente según las adquisiciones y usos.
            </p>

            <div className="rep-form-group rep-sucursal-filter">
              <label className="rep-form-label">Sucursal</label>
              <div className="rep-select-container">
                <select className="rep-form-select">
                  <option value="">Todas</option>
                  <option value="sucursal1">Nombre de la sucursal</option>
                  <option value="sucursal2">Nombre de la sucursal 2</option>
                </select>
                <FiChevronDown className="rep-select-arrow" size={20} />
              </div>
            </div>

            <div className="rep-destaques-card">
              <h3 className="rep-destaques-card-title">Nombre de la sucursal</h3>
              <div className="rep-destaques-table">
                <div className="rep-table-header">
                  <span>Productos</span>
                  <span>Comprados</span>
                  <span>Disponibles</span>
                  <span>Activos</span>
                </div>
                <div className="rep-table-row">
                  <span>Premium</span>
                  <span>4</span>
                  <span>0</span>
                  <span>4</span>
                </div>
                <div className="rep-table-row">
                  <span>Destacados</span>
                  <span>12</span>
                  <span>1</span>
                  <span>11</span>
                </div>
                <div className="rep-table-row">
                  <span>Simple</span>
                  <span>120</span>
                  <span>64</span>
                  <span>127</span>
                </div>
              </div>
            </div>

            <div className="rep-destaques-card">
              <h3 className="rep-destaques-card-title">Nombre de la sucursal 2</h3>
              <div className="rep-destaques-table">
                <div className="rep-table-header">
                  <span>Productos</span>
                  <span>Comprados</span>
                  <span>Disponibles</span>
                  <span>Activos</span>
                </div>
                <div className="rep-table-row">
                  <span>Premium</span>
                  <span>4</span>
                  <span>0</span>
                  <span>4</span>
                </div>
                <div className="rep-table-row">
                  <span>Destacados</span>
                  <span>12</span>
                  <span>1</span>
                  <span>11</span>
                </div>
                <div className="rep-table-row">
                  <span>Simple</span>
                  <span>120</span>
                  <span>64</span>
                  <span>127</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'colaboradores':
        if (isAddingColaborador) {
          return renderAddColaboradorContent();
        }
        return (
          <div className="rep-content-section rep-colaboradores-section">
            <div className="rep-colaboradores-header">
              <h1 className="rep-content-title">Colaboradores</h1>
              <button className="rep-agregar-colaborador-btn" onClick={handleAddColaborador}>Agregar colaborador</button>
            </div>
            <p className="rep-colaboradores-desc">
              Acá podes editar los datos de tus colaboradores, activarlos y /o agregar nuevos.
            </p>

            <div className="rep-colaborador-card">
              <div className="rep-colaborador-info">
                <h3 className="rep-colaborador-title">Dibrand - dibrand@gmail.com.ar</h3>
                <p className="rep-colaborador-empresa">Dibrand empresa</p>
              </div>
              <div className="rep-colaborador-actions">
                <span className="rep-colaborador-badge admin">Administrador</span>
              </div>
            </div>

            <div className="rep-colaborador-card">
              <div className="rep-colaborador-info">
                <h3 className="rep-colaborador-title">Rodrigo - rodrigoperez@gmail.com</h3>
                <p className="rep-colaborador-empresa">Rodrigo Perez</p>
              </div>
              <div className="rep-colaborador-actions">
                <span className="rep-colaborador-badge">Vendedor</span>
                <button className="rep-colaborador-action-btn" onClick={() => setShowPasswordModal(true)}>
                  <FiLock size={18} />
                </button>
                <button className="rep-colaborador-action-btn" onClick={handleAddColaborador}>
                  <FiEdit2 size={18} />
                </button>
                <button className="rep-colaborador-action-btn delete" onClick={() => setShowDeleteModal(true)}>
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>

            <button className="rep-agregar-colaborador-btn-mobile" onClick={handleAddColaborador}>Agregar colaborador</button>
          </div>
        );
    }
  };

  return (
    <div className="rep-page">
      <NavbarPro />
      
      <div className="rep-container">
        <div className={`rep-sidebar ${isMobileDetailView ? 'rep-sidebar-hidden' : ''}`}>
          <h1 className="rep-sidebar-title">Inmobiliaria</h1>
          <nav className="rep-menu">
            {menuOptions.map((option) => (
              <button
                key={option.id}
                className={`rep-menu-item ${activeMenu === option.id ? 'active' : ''}`}
                onClick={() => handleMenuClick(option.id)}
              >
                <span>{option.label}</span>
                <FiChevronRight size={20} />
              </button>
            ))}
          </nav>
        </div>
        
        <div className={`rep-content ${isMobileDetailView ? 'rep-content-visible' : ''}`}>
          <button className="rep-back-btn" onClick={handleBackClick}>
            <FiChevronLeft size={20} />
            <span>{isEditingSucursal ? 'Modificar sucursal' : isAddingColaborador ? 'Tus colaboradores' : menuOptions.find(m => m.id === activeMenu)?.label}</span>
          </button>
          {renderContent()}
        </div>
      </div>

      {showPasswordModal && (
        <div className="rep-modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="rep-modal" onClick={(e) => e.stopPropagation()}>
            <div className="rep-modal-header">
              <h2 className="rep-modal-title">Cambiar contraseña</h2>
              <button className="rep-modal-close" onClick={() => setShowPasswordModal(false)}>
                <FiX size={20} />
              </button>
            </div>
            <div className="rep-modal-divider"></div>
            <div className="rep-modal-content">
              <p className="rep-modal-subtitle">De Rodrigo Pérez</p>
              <div className="rep-form-group">
                <div className="rep-password-input-container">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    className="rep-form-input" 
                    placeholder="Contraseña nueva" 
                  />
                  <button 
                    type="button" 
                    className="rep-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
                <span className="rep-password-hint">Usa de 6 a 10 caracteres</span>
              </div>
              <div className="rep-form-group">
                <div className="rep-password-input-container">
                  <input 
                    type={showRepeatPassword ? 'text' : 'password'} 
                    className="rep-form-input" 
                    placeholder="Repetir contraseña nueva" 
                  />
                  <button 
                    type="button" 
                    className="rep-password-toggle"
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  >
                    {showRepeatPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>
              <button className="rep-modal-submit-btn">Guardar cambios</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="rep-modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="rep-modal rep-modal-delete" onClick={(e) => e.stopPropagation()}>
            <div className="rep-modal-header">
              <h2 className="rep-modal-title">Eliminar colaborador</h2>
              <button className="rep-modal-close" onClick={() => setShowDeleteModal(false)}>
                <FiX size={20} />
              </button>
            </div>
            <div className="rep-modal-content rep-modal-content-center">
              <div className="rep-delete-icon">
                <FiTrash2 size={24} />
              </div>
              <h3 className="rep-delete-title">¿Estás seguro de eliminar a Rodrigo Pérez?</h3>
              <p className="rep-delete-desc">Todos las publicaciones del vendedor pasaran al administrador.</p>
              <div className="rep-modal-buttons">
                <button className="rep-modal-cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                <button className="rep-modal-delete-btn">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealEstateProfile;

