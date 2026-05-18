import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#about',          label: 'About' },
  { href: '#projects',       label: 'Projects' },
  { href: '#skills',         label: 'Skills' },
  { href: '#experience',     label: 'Experience' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#speaking',       label: 'Speaking' },
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
      </div>
    </nav>
  );
}
