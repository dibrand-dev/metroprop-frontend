import Navbar from '../../components/Navbar';
import FindYourSpace from '../../components/FindYourSpace';
import Projects from '../../components/Projects';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <Navbar />
      <FindYourSpace />
      <Projects />
    </section>
  );
};

export default Hero;
