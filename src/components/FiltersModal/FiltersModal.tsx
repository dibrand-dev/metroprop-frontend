import { useState, useRef, useCallback } from 'react';
import { FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './FiltersModal.css';

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (filterCount: number) => void;
  propertyCount?: number;
}

const priceHistogramData = [
  30, 45, 60, 35, 50, 70, 40, 55, 80, 45, 60, 35, 50, 75, 40, 
  55, 85, 50, 65, 40, 55, 70, 45, 60, 35, 50, 80, 45, 55, 40,
  60, 75, 50, 65, 45, 55, 70, 40, 50, 35
];

const priceM2HistogramData = [
  25, 40, 55, 30, 45, 65, 35, 50, 75, 40, 55, 30, 45, 70, 35, 
  50, 80, 45, 60, 35, 50, 65, 40, 55, 30, 45, 75, 40, 50, 35,
  55, 70, 45, 60, 40, 50, 65, 35, 45, 30
];

interface PriceHistogramProps {
  data: number[];
  value: [number, number];
  onChange: (value: [number, number]) => void;
  minValue?: number;
  maxValue?: number;
}

const PriceHistogram = ({ data, value, onChange, minValue = 0, maxValue = 100 }: PriceHistogramProps) => {
  const histogramMax = Math.max(...data);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<'left' | 'right' | null>(null);

  const getPercentFromEvent = useCallback((e: React.MouseEvent | MouseEvent) => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    return Math.max(0, Math.min(100, percent));
  }, []);

  const handleMouseDown = (thumb: 'left' | 'right') => (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(thumb);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const percent = getPercentFromEvent(moveEvent);
      if (thumb === 'left') {
        onChange([Math.min(percent, value[1] - 5), value[1]]);
      } else {
        onChange([value[0], Math.max(percent, value[0] + 5)]);
      }
    };

    const handleMouseUp = () => {
      setDragging(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    const percent = getPercentFromEvent(e);
    const midPoint = (value[0] + value[1]) / 2;
    if (percent < midPoint) {
      onChange([percent, value[1]]);
    } else {
      onChange([value[0], percent]);
    }
  };

  const percentToValue = (percent: number) => {
    return Math.round(minValue + (percent / 100) * (maxValue - minValue));
  };

  return (
    <div className="filters-histogram">
      <div className="filters-histogram-bars">
        {data.map((barValue, index) => {
          const height = (barValue / histogramMax) * 100;
          const barPercent = (index / data.length) * 100;
          const isActive = barPercent >= value[0] && barPercent <= value[1];
          return (
            <div 
              key={index} 
              className={`filters-histogram-bar ${isActive ? 'active' : ''}`}
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>
      <div className="filters-slider" ref={sliderRef} onClick={handleTrackClick}>
        <div className="filters-slider-track"></div>
        <div 
          className="filters-slider-range" 
          style={{ left: `${value[0]}%`, right: `${100 - value[1]}%` }}
        ></div>
        <div 
          className={`filters-slider-thumb ${dragging === 'left' ? 'dragging' : ''}`}
          style={{ left: `${value[0]}%` }}
          onMouseDown={handleMouseDown('left')}
        ></div>
        <div 
          className={`filters-slider-thumb ${dragging === 'right' ? 'dragging' : ''}`}
          style={{ left: `${value[1]}%` }}
          onMouseDown={handleMouseDown('right')}
        ></div>
      </div>
    </div>
  );
};

const tipoOperacion = ['Alquiler', 'Compra', 'Temporal'];

const tipoPropiedad = [
  'PH', 'Departamento', 'Casa', 'Local comercial', 'Oficina comercial', 
  'Bodega / Galpón', 'Garage', 'Depósito', 'Terreno', 'Edificio', 
  'Quinta', 'Campo', 'Fondo de comercio', 'Hotel', 'Consultorio', 'Cama náutica'
];

const tipoAmbientes = [
  'Living comedor', 'Cocina', 'Balcón', 'Lavadero', 'Toilette', 'Vestidor',
  'Dormitorio en suite', 'Jardín', 'Patio', 'Terraza', 'Dependencia servicio'
];

const disposicion = ['Contrafrente', 'Interior', 'Frente', 'Lateral'];

const comodidades = [
  'Pileta', 'Parrilla', 'Encargado/vigilancia', 'Ascensor', 'SUM', 'Laundry',
  'Sauna', 'Gimnasio', 'Quincho', 'Sala de juegos', 'Cancha de deportes', 
  'Solárium', 'Aire acondicionado'
];

const caracteristicas = [
  'Apto crédito', 'Apto profesional', 'Movilidad reducida', 'Luminoso',
  'Uso comercial', 'Permite mascotas', 'Cocina equipada', 'Amoblado',
  'Ofrece financiación'
];

const subtipoPropiedad = [
  'Estándar', 'Semipiso', 'Piso', 'Dúplex', 'Monoambiente', 'Aparestudio',
  'Loft', 'Penthouse', 'Triplex'
];

const servicios = ['Luz', 'Agua corriente', 'Gas natural', 'Calefacción', 'Internet / Wifi'];

const FiltersModal = ({ isOpen, onClose, onApply, propertyCount = 64875 }: FiltersModalProps) => {
  const [selectedOperacion, setSelectedOperacion] = useState('Alquiler');
  const [precioCurrency, setPrecioCurrency] = useState('USD');
  const [precioM2Currency, setPrecioM2Currency] = useState('USD');
  const [superficieTipo, setSuperficieTipo] = useState('Total');
  const [selectedTipoPropiedad, setSelectedTipoPropiedad] = useState<string[]>([]);
  const [selectedTipoAmbientes, setSelectedTipoAmbientes] = useState<string[]>([]);
  const [selectedDisposicion, setSelectedDisposicion] = useState<string[]>([]);
  const [selectedComodidades, setSelectedComodidades] = useState<string[]>([]);
  const [selectedCaracteristicas, setSelectedCaracteristicas] = useState<string[]>([]);
  const [selectedSubtipo, setSelectedSubtipo] = useState<string[]>([]);
  const [selectedServicios, setSelectedServicios] = useState<string[]>([]);
  const [tipoAnunciante, setTipoAnunciante] = useState<string[]>([]);
  
  const [precioRange, setPrecioRange] = useState<[number, number]>([0, 100]);
  const [precioM2Range, setPrecioM2Range] = useState<[number, number]>([0, 75]);

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    tipoPropiedad: true,
    tipoAmbientes: true,
    disposicion: true,
    comodidades: true,
    caracteristicas: true,
    subtipo: true,
    servicios: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCheckbox = (value: string, selected: string[], setSelected: (v: string[]) => void) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const handleClearFilters = () => {
    setSelectedOperacion('Alquiler');
    setPrecioCurrency('USD');
    setPrecioM2Currency('USD');
    setSuperficieTipo('Total');
    setSelectedTipoPropiedad([]);
    setSelectedTipoAmbientes([]);
    setSelectedDisposicion([]);
    setSelectedComodidades([]);
    setSelectedCaracteristicas([]);
    setSelectedSubtipo([]);
    setSelectedServicios([]);
    setTipoAnunciante([]);
    setPrecioRange([0, 100]);
    setPrecioM2Range([0, 100]);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const calculateActiveFilters = () => {
    let count = 0;
    
    if (selectedOperacion !== 'Alquiler') count++;
    
    count += selectedTipoPropiedad.length;
    
    count += selectedTipoAmbientes.length;
    
    count += selectedDisposicion.length;
    
    count += selectedComodidades.length;
    
    count += selectedCaracteristicas.length;
    
    count += selectedSubtipo.length;
    
    count += selectedServicios.length;
    
    count += tipoAnunciante.length;
    
    if (precioRange[0] !== 0 || precioRange[1] !== 100) count++;
    
    if (precioM2Range[0] !== 0 || precioM2Range[1] !== 75) count++;
    
    return count;
  };

  const handleApplyFilters = () => {
    const count = calculateActiveFilters();
    if (onApply) {
      onApply(count);
    } else {
      onClose();
    }
  };

  const getPrecioFromPercent = (percent: number, max: number) => {
    return Math.round((percent / 100) * max);
  };

  if (!isOpen) return null;

  return (
    <div className="filters-modal-overlay" onClick={handleOverlayClick}>
      <div className="filters-modal">
        {/* Header */}
        <div className="filters-modal-header">
          <h2 className="filters-modal-title">{propertyCount.toLocaleString()} propiedades</h2>
          <button className="filters-modal-close" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="filters-modal-content">
          {/* Tipo de operación */}
          <div className="filters-section">
            <h3 className="filters-section-title">Tipo de operación</h3>
            <div className="filters-radio-group">
              {tipoOperacion.map(tipo => (
                <label key={tipo} className="filters-radio">
                  <input
                    type="radio"
                    name="operacion"
                    checked={selectedOperacion === tipo}
                    onChange={() => setSelectedOperacion(tipo)}
                  />
                  <span className="filters-radio-custom"></span>
                  {tipo}
                </label>
              ))}
            </div>
          </div>

          {/* Precio */}
          <div className="filters-section">
            <h3 className="filters-section-title">Precio</h3>
            <div className="filters-radio-group filters-radio-inline">
              <label className="filters-radio">
                <input
                  type="radio"
                  name="precioCurrency"
                  checked={precioCurrency === 'Pesos'}
                  onChange={() => setPrecioCurrency('Pesos')}
                />
                <span className="filters-radio-custom"></span>
                Pesos
              </label>
              <label className="filters-radio">
                <input
                  type="radio"
                  name="precioCurrency"
                  checked={precioCurrency === 'USD'}
                  onChange={() => setPrecioCurrency('USD')}
                />
                <span className="filters-radio-custom"></span>
                USD
              </label>
            </div>
            <PriceHistogram 
              data={priceHistogramData} 
              value={precioRange} 
              onChange={setPrecioRange}
              minValue={0}
              maxValue={1000000}
            />
            <div className="filters-range-inputs">
              <select className="filters-select">
                <option>Desde</option>
              </select>
              <span className="filters-range-sep">-</span>
              <select className="filters-select">
                <option>Hasta</option>
              </select>
            </div>
          </div>

          {/* Precio m² */}
          <div className="filters-section">
            <h3 className="filters-section-title">Precio m²</h3>
            <div className="filters-radio-group filters-radio-inline">
              <label className="filters-radio">
                <input
                  type="radio"
                  name="precioM2Currency"
                  checked={precioM2Currency === 'Pesos'}
                  onChange={() => setPrecioM2Currency('Pesos')}
                />
                <span className="filters-radio-custom"></span>
                Pesos
              </label>
              <label className="filters-radio">
                <input
                  type="radio"
                  name="precioM2Currency"
                  checked={precioM2Currency === 'USD'}
                  onChange={() => setPrecioM2Currency('USD')}
                />
                <span className="filters-radio-custom"></span>
                USD
              </label>
            </div>
            <PriceHistogram 
              data={priceM2HistogramData} 
              value={precioM2Range} 
              onChange={setPrecioM2Range}
              minValue={0}
              maxValue={5000}
            />
            <div className="filters-range-inputs">
              <input 
                type="text" 
                className="filters-input" 
                placeholder="0" 
                value={getPrecioFromPercent(precioM2Range[0], 5000)} 
                readOnly 
              />
              <span className="filters-range-sep">-</span>
              <input 
                type="text" 
                className="filters-input" 
                placeholder="5000" 
                value={getPrecioFromPercent(precioM2Range[1], 5000)} 
                readOnly 
              />
            </div>
          </div>

          {/* Superficie */}
          <div className="filters-section">
            <h3 className="filters-section-title">Superficie</h3>
            <div className="filters-radio-group filters-radio-inline">
              <label className="filters-radio">
                <input
                  type="radio"
                  name="superficieTipo"
                  checked={superficieTipo === 'Cubierta'}
                  onChange={() => setSuperficieTipo('Cubierta')}
                />
                <span className="filters-radio-custom"></span>
                Cubierta
              </label>
              <label className="filters-radio">
                <input
                  type="radio"
                  name="superficieTipo"
                  checked={superficieTipo === 'Total'}
                  onChange={() => setSuperficieTipo('Total')}
                />
                <span className="filters-radio-custom"></span>
                Total
              </label>
            </div>
            <div className="filters-range-inputs filters-range-4">
              <select className="filters-select filters-select-sm">
                <option>m²</option>
              </select>
              <select className="filters-select">
                <option>Desde</option>
              </select>
              <span className="filters-range-sep">-</span>
              <select className="filters-select">
                <option>Hasta</option>
              </select>
            </div>
          </div>

          {/* Tipo de propiedad */}
          <div className="filters-section">
            <button className="filters-section-header" onClick={() => toggleSection('tipoPropiedad')}>
              <h3 className="filters-section-title">Tipo de propiedad</h3>
              {expandedSections.tipoPropiedad ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </button>
            {expandedSections.tipoPropiedad && (
              <div className="filters-checkbox-grid">
                {tipoPropiedad.map(tipo => (
                  <label key={tipo} className="filters-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedTipoPropiedad.includes(tipo)}
                      onChange={() => toggleCheckbox(tipo, selectedTipoPropiedad, setSelectedTipoPropiedad)}
                    />
                    <span className="filters-checkbox-custom"></span>
                    {tipo}
                  </label>
                ))}
              </div>
            )}
            <button className="filters-ver-menos">
              Ver menos <FiChevronUp size={16} />
            </button>
          </div>

          {/* Ambientes y Dormitorios */}
          <div className="filters-section">
            <div className="filters-dropdowns-row">
              <div className="filters-dropdown-col">
                <h3 className="filters-section-title">Ambientes</h3>
                <select className="filters-select">
                  <option>Cantidad</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4+</option>
                </select>
              </div>
              <div className="filters-dropdown-col">
                <h3 className="filters-section-title">Dormitorios</h3>
                <select className="filters-select">
                  <option>Cantidad</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Baños y Cocheras */}
          <div className="filters-section">
            <div className="filters-dropdowns-row">
              <div className="filters-dropdown-col">
                <h3 className="filters-section-title">Baños</h3>
                <select className="filters-select">
                  <option>Cantidad</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4+</option>
                </select>
              </div>
              <div className="filters-dropdown-col">
                <h3 className="filters-section-title">Cocheras</h3>
                <select className="filters-select">
                  <option>Seleccionar</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tipo de anunciante y Antigüedad */}
          <div className="filters-section">
            <div className="filters-dropdowns-row">
              <div className="filters-dropdown-col">
                <h3 className="filters-section-title">Tipo de anunciante</h3>
                <div className="filters-checkbox-list">
                  <label className="filters-checkbox">
                    <input
                      type="checkbox"
                      checked={tipoAnunciante.includes('Inmobiliaria')}
                      onChange={() => toggleCheckbox('Inmobiliaria', tipoAnunciante, setTipoAnunciante)}
                    />
                    <span className="filters-checkbox-custom"></span>
                    Inmobiliaria
                  </label>
                  <label className="filters-checkbox">
                    <input
                      type="checkbox"
                      checked={tipoAnunciante.includes('Dueño directo')}
                      onChange={() => toggleCheckbox('Dueño directo', tipoAnunciante, setTipoAnunciante)}
                    />
                    <span className="filters-checkbox-custom"></span>
                    Dueño directo
                  </label>
                </div>
              </div>
              <div className="filters-dropdown-col">
                <h3 className="filters-section-title">Antigüedad</h3>
                <select className="filters-select">
                  <option>Seleccionar</option>
                  <option>A estrenar</option>
                  <option>Hasta 5 años</option>
                  <option>Hasta 10 años</option>
                  <option>Hasta 20 años</option>
                  <option>Más de 20 años</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tipo de ambientes */}
          <div className="filters-section">
            <button className="filters-section-header" onClick={() => toggleSection('tipoAmbientes')}>
              <h3 className="filters-section-title">Tipo de ambientes</h3>
              {expandedSections.tipoAmbientes ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </button>
            {expandedSections.tipoAmbientes && (
              <div className="filters-checkbox-grid">
                {tipoAmbientes.map(tipo => (
                  <label key={tipo} className="filters-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedTipoAmbientes.includes(tipo)}
                      onChange={() => toggleCheckbox(tipo, selectedTipoAmbientes, setSelectedTipoAmbientes)}
                    />
                    <span className="filters-checkbox-custom"></span>
                    {tipo}
                  </label>
                ))}
              </div>
            )}
            <button className="filters-ver-menos">
              Ver menos <FiChevronUp size={16} />
            </button>
          </div>

          {/* Disposición */}
          <div className="filters-section">
            <button className="filters-section-header" onClick={() => toggleSection('disposicion')}>
              <h3 className="filters-section-title">Disposición</h3>
              {expandedSections.disposicion ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </button>
            {expandedSections.disposicion && (
              <div className="filters-checkbox-grid">
                {disposicion.map(tipo => (
                  <label key={tipo} className="filters-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedDisposicion.includes(tipo)}
                      onChange={() => toggleCheckbox(tipo, selectedDisposicion, setSelectedDisposicion)}
                    />
                    <span className="filters-checkbox-custom"></span>
                    {tipo}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Comodidades / amenities */}
          <div className="filters-section">
            <button className="filters-section-header" onClick={() => toggleSection('comodidades')}>
              <h3 className="filters-section-title">Comodidades / amenities</h3>
              {expandedSections.comodidades ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </button>
            {expandedSections.comodidades && (
              <div className="filters-checkbox-grid">
                {comodidades.map(tipo => (
                  <label key={tipo} className="filters-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedComodidades.includes(tipo)}
                      onChange={() => toggleCheckbox(tipo, selectedComodidades, setSelectedComodidades)}
                    />
                    <span className="filters-checkbox-custom"></span>
                    {tipo}
                  </label>
                ))}
              </div>
            )}
            <button className="filters-ver-menos">
              Ver menos <FiChevronUp size={16} />
            </button>
          </div>

          {/* Características de la propiedad */}
          <div className="filters-section">
            <button className="filters-section-header" onClick={() => toggleSection('caracteristicas')}>
              <h3 className="filters-section-title">Características de la propiedad</h3>
              {expandedSections.caracteristicas ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </button>
            {expandedSections.caracteristicas && (
              <div className="filters-checkbox-grid">
                {caracteristicas.map(tipo => (
                  <label key={tipo} className="filters-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedCaracteristicas.includes(tipo)}
                      onChange={() => toggleCheckbox(tipo, selectedCaracteristicas, setSelectedCaracteristicas)}
                    />
                    <span className="filters-checkbox-custom"></span>
                    {tipo}
                  </label>
                ))}
              </div>
            )}
            <button className="filters-ver-menos">
              Ver menos <FiChevronUp size={16} />
            </button>
          </div>

          {/* Subtipo de propiedad */}
          <div className="filters-section">
            <button className="filters-section-header" onClick={() => toggleSection('subtipo')}>
              <h3 className="filters-section-title">Subtipo de propiedad</h3>
              {expandedSections.subtipo ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </button>
            {expandedSections.subtipo && (
              <div className="filters-checkbox-grid">
                {subtipoPropiedad.map(tipo => (
                  <label key={tipo} className="filters-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedSubtipo.includes(tipo)}
                      onChange={() => toggleCheckbox(tipo, selectedSubtipo, setSelectedSubtipo)}
                    />
                    <span className="filters-checkbox-custom"></span>
                    {tipo}
                  </label>
                ))}
              </div>
            )}
            <button className="filters-ver-menos">
              Ver menos <FiChevronUp size={16} />
            </button>
          </div>

          {/* Servicios */}
          <div className="filters-section">
            <button className="filters-section-header" onClick={() => toggleSection('servicios')}>
              <h3 className="filters-section-title">Servicios</h3>
              {expandedSections.servicios ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </button>
            {expandedSections.servicios && (
              <div className="filters-checkbox-grid">
                {servicios.map(tipo => (
                  <label key={tipo} className="filters-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedServicios.includes(tipo)}
                      onChange={() => toggleCheckbox(tipo, selectedServicios, setSelectedServicios)}
                    />
                    <span className="filters-checkbox-custom"></span>
                    {tipo}
                  </label>
                ))}
              </div>
            )}
            <button className="filters-ver-menos">
              Ver menos <FiChevronUp size={16} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="filters-modal-footer">
          <button className="filters-btn-clear" onClick={handleClearFilters}>
            Limpiar filtros
          </button>
          <button className="filters-btn-apply" onClick={handleApplyFilters}>
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
