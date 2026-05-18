import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import ryanPhoto from '../../ryan.jpg';

export default function Hero() {
  return (
    <div className="p-hero-outer">
      <div className="p-hero">
        <div className="p-hero-content">
          <p className="p-hero-greeting">Hello, I'm</p>

          <h1 className="p-hero-name">
            Ryan<br />
            <span>Nyabeze</span>
          </h1>

          <p className="p-hero-title">Computer Systems Engineering Graduate</p>

          <p className="p-hero-bio">
            BSc Hons from Midlands State University (2.1). I build clean,
            functional experiences across web and mobile— with a
            strong interest in backend development, IoT, and machine learning.
          </p>

          <div className="p-hero-ctas">
            <a href="#projects" className="p-btn-primary">
              View Projects <ArrowRight size={15} />
            </a>
            <a href="#contact" className="p-btn-secondary">
              Get In Touch
            </a>
          </div>

          <div className="p-hero-socials">
            <a
              href="https://github.com/nyabeze"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href="https://linkedin.com/in/ryan-nyabeze"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a href="mailto:nyabeze02@gmail.com" aria-label="Email">
              <Mail size={22} />
            </a>
          </div>
        </div>

        <div className="p-hero-photo-wrap">
          <img
            src={ryanPhoto}
            alt="Ryan Nyabeze"
            className="p-hero-photo"
          />
        </div>
      </div>
    </div>
  );
}
