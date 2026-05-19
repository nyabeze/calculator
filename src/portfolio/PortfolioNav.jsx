import { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';

const NAV_LINKS = [
  { href: '#about',          label: 'About' },
  { href: '#projects',       label: 'React' },
  { href: '#python',         label: 'Python' },
  { href: '#github',         label: 'GitHub' },
  { href: '#skills',         label: 'Skills' },
  { href: '#experience',     label: 'Experience' },
  { href: '#speaking',       label: 'Speaking' },
  { href: '#writing',        label: 'Writing' },
  { href: '#contact',        label: 'Contact' },
];

export default function PortfolioNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="p-nav">
      <a href="#hero" className="p-nav-logo">RN</a>

      <ul className="p-nav-links">
        {NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>

      <a
        href={`${import.meta.env.BASE_URL}ryan_CV.pdf`}
        download="Ryan_Nyabeze_CV.pdf"
        className="p-nav-cv"
        title="Download CV"
      >
        <Download size={14} />
        <span>CV</span>
      </a>

      <button
        className="p-nav-mobile-btn"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div className={`p-nav-mobile-menu${open ? ' open' : ''}`}>
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href} onClick={close}>{label}</a>
        ))}
        <a
          href={`${import.meta.env.BASE_URL}ryan_CV.pdf`}
          download="Ryan_Nyabeze_CV.pdf"
          onClick={close}
          className="p-nav-cv-mobile"
        >
          <Download size={14} />
          Download CV
        </a>
      </div>
    </nav>
  );
}
