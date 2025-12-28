import './Projects.css';
import buyImg from '../../assets/buy.png';
import findImg from '../../assets/find.png';
import liveImg from '../../assets/live.png';
import investImg from '../../assets/invest.png';

interface ProjectCard {
  image: string;
  title: string;
  description: string;
  buttonText: string;
}

const projectCards: ProjectCard[] = [
  {
    image: buyImg,
    title: 'Comprá la propiedad que estás buscando.',
    description: 'Accedé a oportunidades reales con datos claros y actualizados.',
    buttonText: 'Comprar',
  },
  {
    image: findImg,
    title: 'Encontrá el espacio ideal para alquilar.',
    description: 'Filtrá, compará y encontrá tu próximo alquiler sin complicaciones.',
    buttonText: 'Alquilar',
  },
  {
    image: liveImg,
    title: 'Viví donde quieras, por el tiempo que necesites',
    description: 'Espacios equipados y listos para acompañar tu viaje, trabajo o descanso.',
    buttonText: 'Temporal',
  },
  {
    image: investImg,
    title: 'Invertí en proyectos en desarrollo.',
    description: 'Invertí con previsibilidad y descubrí oportunidades de crecimiento a largo plazo.',
    buttonText: 'Emprendimientos',
  },
];

const Projects = () => {
  return (
    <section className="projects">
      <div className="projects-container">
        {projectCards.map((card, index) => (
          <div key={index} className="project-card">
            <div className="project-image">
              <img src={card.image} alt={card.title} />
            </div>
            <h3 className="project-title">{card.title}</h3>
            <p className="project-description">{card.description}</p>
            <button className="project-button">{card.buttonText}</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
