import './Footer.css';
import logo from '../../assets/logo.png';
import facebookIcon from '../../assets/facebook.png';
import instagramIcon from '../../assets/instagram.png';
import youtubeIcon from '../../assets/youtube.png';
import fiscalImg from '../../assets/fiscal.png';
import dibrandImg from '../../assets/dibrand.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-column footer-brand">
            <img src={logo} alt="Metroprop" className="footer-logo" />
            <p className="footer-description">
              Encontrá propiedades e inmuebles en venta y alquiler, casas, departamentos, terrenos, locales, oficinas, quintas, PH, cocheras y más en Metroprop.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">
                <img src={facebookIcon} alt="Facebook" />
              </a>
              <a href="#" aria-label="Instagram">
                <img src={instagramIcon} alt="Instagram" />
              </a>
              <a href="#" aria-label="YouTube">
                <img src={youtubeIcon} alt="YouTube" />
              </a>
            </div>
            <div className="footer-contact">
              <p>Buenos Aires, Argentina</p>
              <p>Olazabal 1515, oficina 708</p>
              <p>consultas@metroprop.com</p>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Mapa de sitio</h3>
            <ul className="footer-links">
              <li><a href="#">Comprar</a></li>
              <li><a href="#">Alquilar</a></li>
              <li><a href="#">Temporal</a></li>
              <li><a href="#">Emprendimientos</a></li>
              <li><a href="#">Publicar</a></li>
              <li><a href="#">Mi cuenta</a></li>
              <li><a href="#">Contáctanos</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Zonas más buscadas</h3>
            <ul className="footer-links">
              <li><a href="#">Capital Federal</a></li>
              <li><a href="#">GBA Norte</a></li>
              <li><a href="#">GBA Sur</a></li>
              <li><a href="#">Santa Fe</a></li>
              <li><a href="#">GBA Oeste</a></li>
              <li><a href="#">Buenos Aires Costa Atlántica</a></li>
              <li><a href="#">Córdoba</a></li>
            </ul>
          </div>

          <div className="footer-column footer-legal">
            <ul className="footer-links">
              <li><a href="#">Términos y condiciones</a></li>
              <li><a href="#">Normas de confidencialidad y privacidad</a></li>
              <li><a href="#">Normativa alquiler temporario turístico</a></li>
            </ul>
            <div className="footer-fiscal">
              <img src={fiscalImg} alt="Data Fiscal" className="fiscal-img" />
              <div className="fiscal-text">
                <p>Metroprop</p>
                <p>Todos los derechos reservados</p>
              </div>
            </div>
            <p className="footer-copyright">© 2025 Metroprop</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <img src={dibrandImg} alt="Dibrand" className="dibrand-logo" />
        <p>Desarrollado por <strong>Dibrand</strong></p>
      </div>
    </footer>
  );
};

export default Footer;
