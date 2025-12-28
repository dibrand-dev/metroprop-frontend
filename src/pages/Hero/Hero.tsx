import Navbar from '../../components/Navbar';
import FindYourSpace from '../../components/FindYourSpace';
import Projects from '../../components/Projects';
import VisitedProperties from '../../components/VisitedProperties';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <Navbar />
      <FindYourSpace />
      <Projects />
      <VisitedProperties />
    </section>
  );
};

export default Hero;
