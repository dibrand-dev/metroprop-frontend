import { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import FiltersModal from '../../components/FiltersModal';
import AlertModal from '../../components/AlertModal';
import './SearchResults.css';
import resultsMap from '../../assets/results.png';
import resultsCardGrid from '../../assets/results2.png';
import resultsCardList from '../../assets/results1.png';
import remaxLogo from '../../assets/remax.png';
import noResultsImg from '../../assets/noresults.png';
import { FiSearch, FiChevronDown, FiSliders, FiBell, FiEdit2, FiMap, FiList, FiHeart, FiX } from 'react-icons/fi';
import { HiOutlineSwitchVertical } from 'react-icons/hi';

const sortOptions = [
  { value: 'price-asc', label: 'Precio (menor a mayor)' },
  { value: 'price-desc', label: 'Precio (mayor a menor)' },
  { value: 'm2-asc', label: 'Valor M² (menor a mayor)' },
  { value: 'm2-desc', label: 'Valor M² (mayor a menor)' },
];

const MOCK_ADDRESS = 'Juan Francisco Segui 4500';

const SearchResults = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [sortOpen, setSortOpen] = useState(false);
  const [sortMobileOpen, setSortMobileOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasResults, setHasResults] = useState(true);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [selectedSort, setSelectedSort] = useState('price-asc');
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (value: string) => {
    setSelectedSort(value);
    setSortOpen(false);
    setSortMobileOpen(false);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setHasResults(true);
    } else {
      const normalizedTerm = term.toLowerCase().trim();
      const normalizedMock = MOCK_ADDRESS.toLowerCase();
      setHasResults(normalizedMock.includes(normalizedTerm) || normalizedTerm.includes(normalizedMock.toLowerCase()));
    }
  };

  const handleFiltersApply = (count: number) => {
    setActiveFiltersCount(count);
    setFiltersOpen(false);
  };
  
  const properties = Array(12).fill(null).map((_, i) => ({
    id: i + 1,
  }));

  return (
    <div className="sr-page">
      <Navbar 
        showMobileSearch={true}
        searchValue={searchTerm}
        onSearchChange={handleSearch}
        hasSearchError={!hasResults}
      />

      <div className="sr-filters-mobile">
        <button className="sr-filter-mobile-btn" onClick={() => setFiltersOpen(true)}>
          Filtros
          <FiChevronDown size={14} />
        </button>
        <button 
          className="sr-filter-mobile-btn sr-filter-mobile-primary"
          onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
        >
          {viewMode === 'map' ? <FiList size={16} /> : <FiMap size={16} />}
          {viewMode === 'map' ? 'Lista' : 'Mapa'}
        </button>
        <button className="sr-filter-mobile-icon" onClick={() => setAlertOpen(true)}>
          <FiBell size={22} />
        </button>
      </div>

      {sortMobileOpen && (
        <div className="sr-sort-modal-overlay" onClick={() => setSortMobileOpen(false)}>
          <div className="sr-sort-modal" onClick={(e) => e.stopPropagation()}>
            <div className="sr-sort-modal-header">
              <h2 className="sr-sort-modal-title">Ordenar resultados</h2>
              <button className="sr-sort-modal-close" onClick={() => setSortMobileOpen(false)}>
                <FiX size={24} />
              </button>
            </div>
            <div className="sr-sort-modal-options">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={`sr-sort-modal-option ${selectedSort === option.value ? 'active' : ''}`}
                  onClick={() => handleSortSelect(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="sr-filters">
        <div className="sr-filters-inner">
          <div className="sr-search-box">
            <input
              type="text"
              placeholder="Dirección, barrio, c..."
              className={`sr-search-input ${!hasResults ? 'sr-search-error' : ''}`}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <span className={`sr-search-icon ${!hasResults ? 'sr-search-icon-error' : ''}`}><FiSearch size={18} /></span>
          </div>

          <button className="sr-filter-btn sr-filter-primary">
            Operación
            <FiChevronDown size={14} />
          </button>

          <button className="sr-filter-btn">
            Precio
            <FiChevronDown size={14} />
          </button>

          <button className="sr-filter-btn">
            Amb / Dorm
            <FiChevronDown size={14} />
          </button>

          <button className="sr-filter-btn" onClick={() => setFiltersOpen(true)}>
            <FiSliders size={18} />
            Filtros
            {activeFiltersCount > 0 && <span className="sr-badge">{activeFiltersCount}</span>}
          </button>

          <button className="sr-filter-btn sr-alert-btn" onClick={() => setAlertOpen(true)}>
            <FiBell size={18} />
            Crear Alerta
          </button>
        </div>
      </div>

      <div className={`sr-content ${viewMode === 'map' ? 'sr-show-map' : 'sr-show-list'}`}>
        <div className="sr-map">
          <div className="sr-map-header-mobile">
            <span className="sr-count">76500 propiedades</span>
            <button className="sr-draw-btn">
              <FiEdit2 size={16} />
              Dibujar
            </button>
          </div>
          <img src={resultsMap} alt="Mapa" className="sr-map-img" />
          <button className="sr-draw-btn sr-draw-btn-desktop">
            <FiEdit2 size={16} />
            Dibujar
          </button>
        </div>

        <div className="sr-panel">
          <div className="sr-panel-header">
            {hasResults && <span className="sr-count">76500 propiedades</span>}
            <div className="sr-controls">
              <div className="sr-sort-container" ref={sortRef}>
                <button className="sr-sort-btn sr-sort-btn-desktop" onClick={() => setSortOpen(!sortOpen)}>
                  <HiOutlineSwitchVertical size={16} />
                  Ordenar
                </button>
                <button className="sr-sort-btn sr-sort-btn-mobile" onClick={() => setSortMobileOpen(true)}>
                  <HiOutlineSwitchVertical size={16} />
                  Ordenar
                </button>
                {sortOpen && (
                  <div className="sr-sort-dropdown">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`sr-sort-option ${selectedSort === option.value ? 'active' : ''}`}
                        onClick={() => handleSortSelect(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="sr-view-toggle">
                <button 
                  className={`sr-view-btn ${viewMode === 'map' ? 'active' : ''}`}
                  onClick={() => setViewMode('map')}
                >
                  <FiMap size={18} />
                </button>
                <button 
                  className={`sr-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <FiList size={18} />
                </button>
              </div>
            </div>
          </div>

          {hasResults ? (
            <div className={`sr-list ${viewMode === 'list' ? 'sr-list-grid' : ''}`}>
              {properties.map((property) => (
                <div key={property.id} className={`sr-card ${viewMode === 'list' ? 'sr-card-grid' : ''}`}>
                  <div className="sr-card-image-container">
                    <img src={resultsCardGrid} alt="Propiedad" className="sr-card-img-grid" />
                  </div>
                  <img src={resultsCardList} alt="Propiedad" className="sr-card-img" />
                  <div className="sr-card-info">
                    <div className="sr-card-grid-content">
                      <img src={remaxLogo} alt="RE/MAX" className="sr-card-logo" />
                      <div className="sr-card-text">
                        <div className="sr-card-line1">
                          <span className="sr-card-price">USD 398.000</span>
                          <span className="sr-card-sep">|</span>
                          <span className="sr-card-m2">USD 2100 m²</span>
                        </div>
                        <div className="sr-card-line2">
                          <span className="sr-card-address">Juan Francisco Segui 4500</span>
                          <span className="sr-card-details-desktop"> | 310 m² tot.  4 amb.  2 baños</span>
                        </div>
                      </div>
                    </div>
                    <div className="sr-card-line1">
                      <span className="sr-card-price">USD 398.000</span>
                      <span className="sr-card-sep">|</span>
                      <span className="sr-card-m2">USD 2100 m²</span>
                    </div>
                    <div className="sr-card-line2">
                      <span className="sr-card-address">Juan Francisco Segui 4500</span>
                      <span className="sr-card-details-desktop"> | 310 m² tot.  4 amb.  2 baños</span>
                    </div>
                    <div className="sr-card-line3">
                      310 m² tot.  4 amb.  2 baños
                    </div>
                  </div>
                  <button className="sr-card-fav">
                    <FiHeart size={20} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="sr-no-results">
              <img src={noResultsImg} alt="No hay resultados" className="sr-no-results-img" />
              <h2 className="sr-no-results-title">No hay resultados</h2>
              <p className="sr-no-results-subtitle">Para continuar ingresa algún filtro a tu búsqueda</p>
            </div>
          )}
        </div>
      </div>

      <FiltersModal 
        isOpen={filtersOpen} 
        onClose={() => setFiltersOpen(false)} 
        onApply={handleFiltersApply}
        propertyCount={76500}
      />

      <AlertModal 
        isOpen={alertOpen} 
        onClose={() => setAlertOpen(false)} 
      />
    </div>
  );
};

export default SearchResults;
