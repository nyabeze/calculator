import { MapPin, GraduationCap, Briefcase } from 'lucide-react';
import { useReveal } from './useReveal';

const STATS = [
  { value: '2.1',       label: 'Upper Second Class' },
  { value: '2021–25',   label: 'Study Period' },
  { value: 'MSU',       label: 'Midlands State University' },
  { value: 'Harare',    label: 'Zimbabwe' },
];

export default function About() {
  const gridRef = useReveal(0);

  return (
    <div id="about" className="p-section">
      <p className="p-section-label">About Me</p>
      <h2 className="p-section-title">Background</h2>

      <div className="p-about-grid p-reveal" ref={gridRef}>
        <div className="p-about-text">
          <p>
            I'm a Computer Systems Engineering graduate from Midlands State
            University (Upper Second Class, 2021–2025), passionate about
            building robust, user-focused software from the ground up.
          </p>
          <p>
            My skills span Python, Flutter, Flask, Django, React, REST APIs,
            and Tailwind CSS. I've worked across diverse roles — from teaching
            Python to children, to training AI models, to providing enterprise
            IT support in healthcare and optical laboratories.
          </p>
          <p>
            I'm especially drawn to backend architecture, full-stack web
            development, mobile applications with Flutter, IoT systems, and
            applied machine learning.
          </p>

          <div className="p-about-highlights">
            <div className="p-about-highlight">
              <div className="p-about-dot" />
              <span>BSc Hons Computer Systems Engineering — Upper Second Class (2.1)</span>
            </div>
            <div className="p-about-highlight">
              <div className="p-about-dot" />
              <span>Midlands State University · 2021 – 2025</span>
            </div>
            <div className="p-about-highlight">
              <div className="p-about-dot" />
              <span>Based in Harare, Zimbabwe</span>
            </div>
          </div>
        </div>

        {/* Right column — stat cards instead of repeated photo */}
        <div className="p-about-stats-wrap">
          <div className="p-about-stats">
            {STATS.map(({ value, label }) => (
              <div key={label} className="p-about-stat">
                <span className="p-about-stat-value">{value}</span>
                <span className="p-about-stat-label">{label}</span>
              </div>
            ))}
          </div>

          <div className="p-about-seek">
            <Briefcase size={16} />
            <span>Open to full-time roles &amp; opportunities</span>
          </div>

          <div className="p-about-seek p-about-seek--location">
            <MapPin size={16} />
            <span>Based in Harare · Available remotely</span>
          </div>
        </div>
      </div>
    </div>
  );
}
