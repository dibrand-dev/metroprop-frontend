import { useNavigate } from 'react-router-dom';
import './HighlightedProperties.css';
import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';
import image3 from '../../assets/image3.png';
import image4 from '../../assets/image4.png';
import image5 from '../../assets/image5.png';
import remaxLogo from '../../assets/remax.png';

interface Property {
  image: string;
  type: string;
  price: string;
  address: string;
  location: string;
  area: string;
  rooms: string;
  bathrooms: string;
}

const properties: Property[] = [
  {
    image: image1,
    type: 'Venta-Departamento',
    price: '$1.000.000',
    address: 'Juan Francisco Segui 4500',
    location: 'Palermo, Capital Federal',
    area: '310 m² tot.',
    rooms: '4 amb.',
    bathrooms: '2 baños',
  },
  {
    image: image2,
    type: 'Venta-Departamento',
    price: '$1.000.000',
    address: 'Juan Francisco Segui 4500',
    location: 'Palermo, Capital Federal',
    area: '310 m² tot.',
    rooms: '4 amb.',
    bathrooms: '2 baños',
  },
  {
    image: image3,
    type: 'Venta-Departamento',
    price: '$1.000.000',
    address: 'Juan Francisco Segui 4500',
    location: 'Palermo, Capital Federal',
    area: '310 m² tot.',
    rooms: '4 amb.',
    bathrooms: '2 baños',
  },
  {
    image: image4,
    type: 'Venta-Departamento',
    price: '$1.000.000',
    address: 'Juan Francisco Segui 4500',
    location: 'Palermo, Capital Federal',
    area: '310 m² tot.',
    rooms: '4 amb.',
    bathrooms: '2 baños',
  },
  {
    image: image5,
    type: 'Venta-Departamento',
    price: '$1.000.000',
    address: 'Juan Francisco Segui 4500',
    location: 'Palermo, Capital Federal',
    area: '310 m² tot.',
    rooms: '4 amb.',
    bathrooms: '2 baños',
  },
];

const loopedProperties = [...properties, ...properties, ...properties];

const HighlightedProperties = () => {
  const navigate = useNavigate();

  const scrollRight = () => {
    const container = document.querySelector('.highlighted-properties-carousel');
    if (container) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollLeft = 0;
      } else {
        container.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="highlighted-properties">
      <div className="highlighted-properties-container">
        <h2 className="highlighted-properties-title">Propiedades destacadas</h2>
        
        <div className="highlighted-properties-wrapper">
          <div className="highlighted-properties-carousel">
            {loopedProperties.map((property, index) => (
              <div 
                key={index} 
                className="highlighted-property-card"
                onClick={() => navigate(`/property/${(index % properties.length) + 1}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="highlighted-property-image">
                  <img src={property.image} alt={property.address} />
                </div>
                <div className="highlighted-property-info">
                  <span className="highlighted-property-type">{property.type}</span>
                  <div className="highlighted-property-price-row">
                    <span className="highlighted-property-price">{property.price}</span>
                    <img src={remaxLogo} alt="Remax" className="highlighted-remax-logo" />
                  </div>
                  <p className="highlighted-property-address">{property.address}</p>
                  <p className="highlighted-property-location">{property.location}</p>
                  <div className="highlighted-property-details">
                    <span>{property.area}</span>
                    <span>{property.rooms}</span>
                    <span>{property.bathrooms}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="highlighted-carousel-arrow" onClick={scrollRight} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="#374151" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HighlightedProperties;
