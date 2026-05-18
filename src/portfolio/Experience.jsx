import { useReveal } from './useReveal';

const EXPERIENCE = [
  {
    date: 'Feb 2026 – Present',
    role: 'IT Support Technician',
    company: 'New Health 263',
    desc: 'Providing hardware, software, and network support in a healthcare environment, ensuring system uptime and user productivity.',
  },
  {
    date: 'Feb – Mar 2026',
    role: 'PR Writer / AI Trainer',
    company: 'Revelo',
    desc: 'Produced public relations content and trained AI models through structured data annotation and prompt-response feedback workflows.',
  },
  {
    date: 'Jul – Dec 2025',
    role: 'Python Instructor',
    company: 'KidsWhoCode',
    desc: 'Taught Python programming fundamentals to children and young learners through a structured, project-based curriculum.',
  },
  {
    date: 'Sep 2023 – Jun 2024',
    role: 'IT Administrator',
    company: 'Redd Optical Laboratories',
    desc: 'Managed IT infrastructure, maintained systems and networks, and delivered technical support across laboratory operations.',
  },
];

export default function Experience() {
  const ref = useReveal(0);

  return (
    <div className="p-section-alt">
      <div id="experience" className="p-section">
        <p className="p-section-label">Work History</p>
        <h2 className="p-section-title">Experience</h2>

        <div className="p-exp-list p-reveal" ref={ref}>
          {EXPERIENCE.map(({ date, role, company, desc }) => (
            <div key={role} className="p-exp-item">
              <p className="p-exp-date">{date}</p>
              <div>
                <p className="p-exp-role">{role}</p>
                <p className="p-exp-company">{company}</p>
                <p className="p-exp-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
