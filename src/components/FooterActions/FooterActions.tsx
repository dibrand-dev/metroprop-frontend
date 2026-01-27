import { IoLogoWhatsapp } from 'react-icons/io';
import { FiMail } from 'react-icons/fi';
import './FooterActions.css';

interface FooterActionsProps {
  onWhatsAppClick?: () => void;
  onContactClick?: () => void;
}

const FooterActions = ({ onWhatsAppClick, onContactClick }: FooterActionsProps) => (
  <div className="footer-actions">
    <button className="footer-actions-btn whatsapp" onClick={onWhatsAppClick}>
      <IoLogoWhatsapp size={24} /> Whatsapp
    </button>
    <button className="footer-actions-btn contact" onClick={onContactClick}>
      <FiMail size={24} /> Contactar
    </button>
  </div>
);

export default FooterActions;
