import { useReveal } from './useReveal';

const SKILL_GROUPS = [
  {
    label: 'Technologies',
    skills: ['Python', 'JavaScript', 'Dart', 'HTML', 'CSS', 'SQL'],
  },
  {
    label: 'Frameworks & Libraries',
    skills: ['React', 'Flask', 'Django', 'Flutter', 'Tailwind CSS'],
  },
  {
    label: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'Vite', 'REST APIs', 'VS Code'],
  },
  {
    label: 'Domains',
    skills: ['Full-Stack Web', 'Mobile Apps', 'IoT', 'Machine Learning', 'IT Support'],
  },
];

export default function Skills() {
  const ref = useReveal(0);

  return (
    <div id="skills" className="p-section">
      <p className="p-section-label">Technical Skills</p>
      <h2 className="p-section-title">What I Work With</h2>

      <div className="p-skills-grid p-reveal" ref={ref}>
        {SKILL_GROUPS.map(({ label, skills }) => (
          <div key={label} className="p-skill-group">
            <p className="p-skill-group-label">{label}</p>
            <div className="p-skill-badges">
              {skills.map(skill => (
                <span key={skill} className="p-skill-badge">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
