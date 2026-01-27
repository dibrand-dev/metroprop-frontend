import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FooterActions from '../../components/FooterActions/FooterActions';
import WhatsAppModal from '../../components/WhatsAppModal';
import ContactModal from '../../components/ContactModal';
import PhoneModal from '../../components/PhoneModal/PhoneModal';
import './PropertyDetail.css';
import propertyMain from '../../assets/propertyy.png';
import property2 from '../../assets/property2.png';
import property3 from '../../assets/property3.png';
import property4 from '../../assets/property4.png';
import property5 from '../../assets/property5.png';
import mapsImg from '../../assets/maps.png';
import remaxLogo from '../../assets/remax.png';
import resultsCardGrid from '../../assets/results2.png';
import { 
  FiHeart, 
  FiShare2, 
  FiInfo, 
  FiCamera, 
  FiMapPin, 
  FiChevronDown, 
  FiChevronUp,
  FiPhone, 
  FiMail,
  FiAlertTriangle,
  FiCheck
} from 'react-icons/fi';
import { 
  BsHouseDoor, 
  BsGrid, 
  BsCompass, 
  BsSquare, 
  BsDoorOpen
} from 'react-icons/bs';
import { FaCar } from 'react-icons/fa';
import { IoBedOutline } from 'react-icons/io5';
import { LuBath } from 'react-icons/lu';
import { IoLogoWhatsapp } from 'react-icons/io';

const PropertyDetail = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Servicios');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  const tabs = ['Servicios', 'Ambientes', 'Características'];
  
  const servicios = ['Ascensor', 'Balcón', 'Lavadero'];
  const ambientes = ['Living comedor', 'Cocina', 'Dormitorio en suite', 'Balcón', 'Lavadero'];
  const caracteristicas = ['Apto crédito', 'Luminoso', 'Apto profesional'];

  const questions = [
    '¿Sigue disponible?',
    '¿Cuáles son los requisitos?',
    '¿Acepta mascotas?',
    '¿Cuándo puedo visitarlo?'
  ];

  const problemOptions = [
    'La propiedad esta alquilada o reservada',
    'No me puedo contactar',
    'Otros motivos'
  ];

  const toggleQuestion = (question: string) => {
    if (selectedQuestions.includes(question)) {
      setSelectedQuestions(selectedQuestions.filter(q => q !== question));
    } else {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'Servicios':
        return servicios;
      case 'Ambientes':
        return ambientes;
      case 'Características':
        return caracteristicas;
      default:
        return servicios;
    }
  };

  const similarProperties = Array(10).fill({
    type: 'Venta-Departamento',
    price: '$1.000.000',
    address: 'Juan Francisco Segui 4500',
    location: 'Palermo, Capital Federal',
    details: '310 m² tot.   4 amb.   2 baños'
  });

  const similarByM2 = Array(10).fill({
    type: 'Venta-Departamento',
    price: 'USD 1300 m²',
    address: 'Juan Francisco Segui 4500',
    location: 'Palermo, Capital Federal',
    details: '310 m² tot.   4 amb.   2 baños'
  });

  return (
    <div className="pd-page">
      <Navbar />
      
      <div className="pd-subnav">
        <div className="pd-subnav-left">
          <button className="pd-subnav-link">Fotos</button>
          <button className="pd-subnav-link">Descripción</button>
          <button className="pd-subnav-link">Información</button>
          <button className="pd-subnav-link">Dirección</button>
        </div>
        <div className="pd-subnav-right">
          <button className="pd-subnav-action">
            <FiHeart size={18} />
            Favoritos
          </button>
          <button className="pd-subnav-action">
            <FiShare2 size={18} />
            Compartir
          </button>
        </div>
      </div>

      <div className="pd-top-section">
        <div className="pd-header">
          <div className="pd-header-left">
            <span className="pd-badge">
              <span className="pd-badge-dot"></span>
              En venta
            </span>
            <h1 className="pd-price">USD 657,000</h1>
          </div>
          <div className="pd-header-right">
            <span className="pd-price-m2">
              USD/m² 2500
              <FiInfo size={16} />
            </span>
          </div>
        </div>

        <div className="pd-gallery">
          <div className="pd-gallery-main">
            <img src={propertyMain} alt="Propiedad" />
            <div className="pd-gallery-mobile-actions">
              <button className="pd-gallery-mobile-btn">
                <FiHeart size={18} />
              </button>
              <button className="pd-gallery-mobile-btn">
                <FiShare2 size={18} />
              </button>
            </div>
            <div className="pd-gallery-counter">1 / 24</div>
          </div>
          <div className="pd-gallery-grid">
            <img src={property2} alt="Propiedad" />
            <img src={property3} alt="Propiedad" />
            <img src={property4} alt="Propiedad" />
            <div className="pd-gallery-last">
              <img src={property5} alt="Propiedad" />
              <button className="pd-gallery-btn">
                <FiCamera size={16} />
                Ver todas las fotos
              </button>
            </div>
          </div>
        </div>

        <div className={`pd-features ${showAllFeatures ? 'pd-features-expanded' : ''}`}>
          <div className="pd-feature">
            <BsHouseDoor size={24} />
            <span>A estrenar</span>
          </div>
          <div className="pd-feature">
            <BsGrid size={24} />
            <span>Contrafrente</span>
          </div>
          <div className="pd-feature">
            <BsCompass size={24} />
            <span>N</span>
          </div>
          <div className="pd-feature">
            <BsSquare size={24} />
            <span>177 m² tot.</span>
          </div>
          <div className="pd-feature">
            <BsSquare size={24} />
            <span>167 m² cub.</span>
          </div>
          <div className="pd-feature">
            <BsDoorOpen size={24} />
            <span>5 amb.</span>
          </div>
          <div className="pd-feature">
            <FaCar size={24} />
            <span>1 cochera</span>
          </div>
          <div className="pd-feature">
            <IoBedOutline size={24} />
            <span>4 dorm</span>
          </div>
          <div className="pd-feature">
            <LuBath size={24} />
            <span>3 baños</span>
          </div>
        </div>
        <button className="pd-ver-mas-btn" onClick={() => setShowAllFeatures(!showAllFeatures)}>
          {showAllFeatures ? 'Ver menos' : 'Ver más'}
          {showAllFeatures ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
        </button>
      </div>

      <div className="pd-content">
        <div className="pd-main">
          <div className="pd-description">
            <h2 className="pd-title">Venta inmediata Cerviño 5 ambientes, Palermo.</h2>
            <p className="pd-subtitle">
              Se vende departamento 2 Ambientes con BALCÓN al frente en Recoleta.
              RECICLADO EN SU TOTALIDAD. PISO 7° AL FRENTE.
            </p>
            <p className="pd-text">
              Este departamento cuenta con una superficie total de 41 m2.
            </p>
            <button 
              className="pd-read-more"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              Leer descripción completa
              {showFullDescription ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
            </button>
          </div>

          <div className="pd-location">
            <p className="pd-address">
              <FiMapPin size={18} />
              Avenida Ceviño 4046, Palermo Chico, Palermo
            </p>
            <div className="pd-map">
              <img src={mapsImg} alt="Mapa" />
            </div>
          </div>

          <div className="pd-more-info">
            <h3 className="pd-section-title">Conocé más sobre esta propiedad</h3>
            <div className="pd-tabs">
              {tabs.map(tab => (
                <button 
                  key={tab}
                  className={`pd-tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="pd-tab-content">
              {getTabContent().map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>

          <div className="pd-advertiser-mobile">
            <div className="pd-advertiser-card-mobile">
              <div className="pd-advertiser-header">
                <img src={remaxLogo} alt="RE/MAX" className="pd-advertiser-logo" />
                <div className="pd-advertiser-info">
                  <span className="pd-advertiser-name">Remax</span>
                  <span className="pd-advertiser-phone">+54</span>
                </div>
              </div>
              <button className="pd-phone-btn" onClick={() => setIsPhoneModalOpen(true)}>
                <FiPhone size={18} />
                Ver teléfono
              </button>
            </div>
          </div>

          <div className="pd-problem">
            <h4 className="pd-problem-title">
              <FiAlertTriangle size={18} />
              Tengo un problema con...
            </h4>
            <div className="pd-problem-options">
              {problemOptions.map((option, index) => (
                <button key={index} className="pd-problem-btn">{option}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="pd-sidebar">
          <div className="pd-contact-card">
            <h3 className="pd-contact-title">Contactá al anunciante</h3>
            <p className="pd-contact-subtitle">Preguntas para el anunciante</p>
            <p className="pd-contact-hint">Seleccioná una o más preguntas, o escribí tu consulta.</p>
            <div className="pd-questions">
              {questions.map((question, index) => (
                <button 
                  key={index}
                  className={`pd-question-btn ${selectedQuestions.includes(question) ? 'active' : ''}`}
                  onClick={() => toggleQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
            <div className="pd-form">
              <div className="pd-form-row">
                <div className="pd-form-field">
                  <label>Nombre</label>
                  <input type="text" placeholder="Nombre" />
                </div>
                <div className="pd-form-field">
                  <label>Email</label>
                  <input type="email" placeholder="unemail@dibrand.com" />
                </div>
              </div>
              <div className="pd-form-row">
                <div className="pd-form-field pd-form-field-small">
                  <label>País</label>
                  <select>
                    <option>+54</option>
                  </select>
                </div>
                <div className="pd-form-field">
                  <label>Teléfono</label>
                  <input type="tel" placeholder="1526458466" />
                </div>
              </div>
              <div className="pd-form-field pd-form-field-full">
                <label>Mensaje</label>
                <textarea placeholder="¡Hola! Quiero que se comuniquen conmigo por esta propiedad en alquiler que vi en Metroprop"></textarea>
              </div>
              <div className="pd-form-checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    checked={acceptTerms}
                    onChange={() => setAcceptTerms(!acceptTerms)}
                  />
                  <span className="pd-checkbox-custom">
                    {acceptTerms && <FiCheck size={12} />}
                  </span>
                  Acepto los <a href="#">Términos y condiciones de Uso</a>
                </label>
              </div>
              <div className="pd-form-checkbox">
                <label>
                  <input 
                    type="checkbox"
                    checked={acceptPrivacy}
                    onChange={() => setAcceptPrivacy(!acceptPrivacy)}
                  />
                  <span className="pd-checkbox-custom">
                    {acceptPrivacy && <FiCheck size={12} />}
                  </span>
                  Acepto la <a href="#">Política de Privacidad</a>
                </label>
              </div>
            </div>
            <div className="pd-contact-buttons">
              <button className="pd-btn-whatsapp" onClick={() => setIsWhatsAppModalOpen(true)}>
                <IoLogoWhatsapp size={20} />
                Whatsapp
              </button>
              <button className="pd-btn-contact" onClick={() => setIsContactModalOpen(true)}>
                <FiMail size={20} />
                Contactar
              </button>
            </div>
          </div>
          <div className="pd-advertiser-card">
            <div className="pd-advertiser-header">
              <img src={remaxLogo} alt="RE/MAX" className="pd-advertiser-logo" />
              <div className="pd-advertiser-info">
                <span className="pd-advertiser-name">Remax</span>
                <span className="pd-advertiser-phone">+54</span>
              </div>
            </div>
            <button className="pd-phone-btn" onClick={() => setIsPhoneModalOpen(true)}>
              <FiPhone size={18} />
              Ver teléfono
            </button>
          </div>
        </div>
      </div>

      <div className="pd-similar-section">
        <div className="pd-similar">
          <h3 className="pd-section-title">Propiedades similares.</h3>
          <div className="pd-similar-carousel">
            {similarProperties.map((prop, index) => (
              <div 
                key={index} 
                className="pd-similar-card"
                onClick={() => navigate(`/property/${index + 1}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="pd-similar-img">
                  <img src={resultsCardGrid} alt="Propiedad" />
                  <button className="pd-similar-fav" onClick={(e) => e.stopPropagation()}>
                    <FiHeart size={18} />
                  </button>
                </div>
                <div className="pd-similar-info">
                  <span className="pd-similar-type">{prop.type}</span>
                  <div className="pd-similar-price-row">
                    <span className="pd-similar-price">{prop.price}</span>
                    <img src={remaxLogo} alt="RE/MAX" className="pd-similar-logo" />
                  </div>
                  <span className="pd-similar-address">{prop.address}</span>
                  <span className="pd-similar-location">{prop.location}</span>
                  <span className="pd-similar-details">{prop.details}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pd-similar">
          <h3 className="pd-section-title">Propiedades similares por m²</h3>
          <div className="pd-similar-carousel">
            {similarByM2.map((prop, index) => (
              <div 
                key={index} 
                className="pd-similar-card"
                onClick={() => navigate(`/property/${index + 6}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="pd-similar-img">
                  <img src={resultsCardGrid} alt="Propiedad" />
                  <button className="pd-similar-fav" onClick={(e) => e.stopPropagation()}>
                    <FiHeart size={18} />
                  </button>
                </div>
                <div className="pd-similar-info">
                  <span className="pd-similar-type">{prop.type}</span>
                  <div className="pd-similar-price-row">
                    <span className="pd-similar-price">{prop.price}</span>
                    <img src={remaxLogo} alt="RE/MAX" className="pd-similar-logo" />
                  </div>
                  <span className="pd-similar-address">{prop.address}</span>
                  <span className="pd-similar-location">{prop.location}</span>
                  <span className="pd-similar-details">{prop.details}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <FooterActions 
        onWhatsAppClick={() => setIsWhatsAppModalOpen(true)} 
        onContactClick={() => setIsContactModalOpen(true)}
      />
      
      <WhatsAppModal 
        isOpen={isWhatsAppModalOpen} 
        onClose={() => setIsWhatsAppModalOpen(false)} 
      />
      
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      
      <PhoneModal 
        isOpen={isPhoneModalOpen} 
        onClose={() => setIsPhoneModalOpen(false)} 
      />
    </div>
  );
};

export default PropertyDetail;
