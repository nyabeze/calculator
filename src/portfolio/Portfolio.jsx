import './portfolio.css';
import PortfolioNav from './PortfolioNav';
import Hero from './Hero';
import About from './About';
import ReactProjects from './ReactProjects';
import PythonProjects from './PythonProjects';
import GitHubStats from './GitHubStats';
import Skills from './Skills';
import Experience from './Experience';
import Certifications from './Certifications';
import Speaker from './Speaker';
import Writing from './Writing';
import Currently from './Currently';
import Faith from './Faith';
import Contact from './Contact';

export default function Portfolio() {
  return (
    <div className="portfolio-root">
      <PortfolioNav />

      <main>
        <div id="hero">
          <Hero />
        </div>

        <About />
        <ReactProjects />
        <PythonProjects />
        <GitHubStats />
        <Skills />
        <Experience />
        <Certifications />
        <Speaker />
        <Writing />
        <Currently />
        <Faith />
        <Contact />
      </main>

      <footer className="p-footer">
        <p>© 2026 Ryan Nyabeze · Built with React + Vite</p>
      </footer>
    </div>
  );
}
