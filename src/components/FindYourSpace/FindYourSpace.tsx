import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindYourSpace.css';
import backgroundImage from '../../assets/findyourspace.png';

type TabType = 'comprar' | 'alquilar' | 'emprendimientos';

const FindYourSpace = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('comprar');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue)}&type=${activeTab}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section 
      className="find-your-space"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="find-your-space-overlay">
        <h1 className="find-your-space-title">Encontrá tu espacio ideal.</h1>
        
        <div className="search-card">
          <div className="search-tabs">
            <button
              className={`search-tab ${activeTab === 'comprar' ? 'active' : ''}`}
              onClick={() => setActiveTab('comprar')}
            >
              Comprar
            </button>
            <button
              className={`search-tab ${activeTab === 'alquilar' ? 'active' : ''}`}
              onClick={() => setActiveTab('alquilar')}
            >
              Alquilar
            </button>
            <button
              className={`search-tab ${activeTab === 'emprendimientos' ? 'active' : ''}`}
              onClick={() => setActiveTab('emprendimientos')}
            >
              Emprendimientos
            </button>
          </div>
          
          <div className="search-input-container">
            <input
              type="text"
              className="search-input"
              placeholder="Escribí una ubicación o alguna característica"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="search-button" onClick={handleSearch} aria-label="Buscar">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindYourSpace;
