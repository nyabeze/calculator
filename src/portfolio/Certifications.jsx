import { Award } from 'lucide-react';
import { useReveal } from './useReveal';

const CERTS = [
  { name: 'Python Essentials 1',          issuer: 'Cisco' },
  { name: 'Python for Machine Learning',  issuer: 'Great Learning' },
  { name: 'Data Science & Analytics',     issuer: 'HP Life' },
  { name: 'Intro to Data Science',        issuer: 'Cisco' },
  { name: 'Intro to IoT',                 issuer: 'Cisco' },
];

export default function Certifications() {
  const ref = useReveal(0);

  return (
    <div id="certifications" className="p-section">
      <p className="p-section-label">Credentials</p>
      <h2 className="p-section-title">Certifications</h2>

      <div className="p-cert-grid p-reveal" ref={ref}>
        {CERTS.map(({ name, issuer }) => (
          <div key={name} className="p-cert-card">
            <div className="p-cert-icon">
              <Award size={18} />
            </div>
            <div>
              <p className="p-cert-name">{name}</p>
              <p className="p-cert-issuer">{issuer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
