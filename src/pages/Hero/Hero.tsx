import Navbar from '../../components/Navbar';
import FindYourSpace from '../../components/FindYourSpace';
import Projects from '../../components/Projects';
import VisitedProperties from '../../components/VisitedProperties';
import HighlightedProperties from '../../components/HighlightedProperties';
import Footer from '../../components/Footer';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <Navbar />
      <FindYourSpace />
      <Projects />
      <VisitedProperties />
      <HighlightedProperties />
      <Footer />
    </section>
  );
};

export default Hero;
