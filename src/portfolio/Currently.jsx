import { Hammer, BookMarked, Lightbulb, Headphones } from 'lucide-react';
import { useReveal } from './useReveal';

const ITEMS = [
  {
    Icon: Hammer,
    label: 'Building',
    value: 'This portfolio',
    detail: 'A full-stack showcase of my React projects and personal brand',
  },
  {
    Icon: BookMarked,
    label: 'Reading',
    value: 'The Daily Stoic',
    detail: 'Ryan Holiday — 366 meditations on wisdom, perseverance, and the art of living',
  },
  {
    Icon: Lightbulb,
    label: 'Learning',
    value: 'Django REST Framework',
    detail: 'Building production-grade APIs with authentication, permissions, and pagination',
  },
  {
    Icon: Headphones,
    label: 'Inspired by',
    value: 'Barack Obama speeches',
    detail: 'Studying cadence, structure, and the art of speaking to move people to action',
  },
];

export default function Currently() {
  const ref = useReveal(0);

  return (
    <div id="currently" className="p-section">
      <p className="p-section-label">Right Now</p>
      <h2 className="p-section-title">Currently</h2>

      <div className="now-grid p-reveal" ref={ref}>
        {ITEMS.map(({ Icon, label, value, detail }) => (
          <div key={label} className="now-card">
            <div className="now-icon">
              <Icon size={18} />
            </div>
            <p className="now-label">{label}</p>
            <p className="now-value">{value}</p>
            <p className="now-detail">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
