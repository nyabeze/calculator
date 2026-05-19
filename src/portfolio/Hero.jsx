import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';
import ryanPhoto from '../../ryan.jpg';

const ROLES = ['Developer', 'Speaker', 'Thinker', 'Engineer'];

function useTypewriter(words, typeSpeed = 85, deleteSpeed = 45, pause = 2200) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timer;

    if (!isDeleting && text === word) {
      timer = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && text === '') {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setWordIdx(i => (i + 1) % words.length);
      }, deleteSpeed);
    } else {
      timer = setTimeout(() => {
        setText(isDeleting
          ? word.slice(0, text.length - 1)
          : word.slice(0, text.length + 1)
        );
      }, isDeleting ? deleteSpeed : typeSpeed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIdx, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

export default function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <div className="p-hero-outer">
      <div className="p-hero">
        <div className="p-hero-content">
          <p className="p-hero-greeting">Hello, I'm</p>

          <h1 className="p-hero-name">
            Ryan<br />
            <span>Nyabeze</span>
          </h1>

          <p className="p-hero-title">
            Computer Systems Engineering Graduate
          </p>

          <p className="p-hero-typewriter">
            I am a&nbsp;
            <span className="p-hero-role">
              {role}
              <span className="p-hero-cursor" aria-hidden="true">|</span>
            </span>
          </p>

          <p className="p-hero-bio">
            BSc Hons from Midlands State University (2.1). I build clean,
            functional experiences across web and mobile — with a strong
            interest in backend development, IoT, and machine learning.
          </p>

          <div className="p-hero-ctas">
            <a href="#projects" className="p-btn-primary">
              View Projects <ArrowRight size={15} />
            </a>
            <a
              href={`${import.meta.env.BASE_URL}ryan_CV.pdf`}
              download="Ryan_Nyabeze_CV.pdf"
              className="p-btn-secondary"
            >
              <Download size={15} />
              Download CV
            </a>
            <a href="#contact" className="p-btn-ghost">
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
