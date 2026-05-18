import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Clock, Cloud, Shield, Building2, ArrowRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 'calculator',
    Icon: Calculator,
    title: 'Calculator',
    description:
      'Functional arithmetic calculator supporting +, −, ×, ÷ with a live expression tracker and history display.',
    tags: ['React', 'useState', 'State Management'],
    route: '/projects/calculator',
  },
  {
    id: 'digital-clock',
    Icon: Clock,
    title: 'Digital Clock',
    description:
      'A live-updating digital clock in 24-hour format built with React hooks for precise real-time rendering.',
    tags: ['React', 'useEffect', 'setInterval'],
    route: '/projects/digital-clock',
  },
  {
    id: 'weather-app',
    Icon: Cloud,
    title: 'Weather App',
    description:
      'Real-time weather for 10 Zimbabwean cities via the OpenWeatherMap API — showing temperature, humidity, and wind.',
    tags: ['React', 'REST API', 'useEffect'],
    route: '/projects/weather-app',
  },
  {
    id: 'got-characters',
    Icon: Shield,
    title: 'GoT Characters',
    description:
      'Browse and filter 53 Game of Thrones characters by house using a clean derived-state filtering system — no useEffect needed.',
    tags: ['React', 'Derived State', 'Component Composition'],
    route: '/projects/got-characters',
  },
  {
    id: 'dzimba',
    Icon: Building2,
    title: 'Dzimba',
    description:
      'Airbnb-style property listing platform for Zimbabwe — responsive navbar, multi-category grids, search, and detailed listings.',
    tags: ['React', 'React Router', 'Tailwind CSS', 'Lucide'],
    route: '/projects/dzimba',
  },
];

function ProjectCard({ project, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('p-visible'), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  const { Icon, title, description, tags, route } = project;

  return (
    <div className="p-reveal" ref={ref} style={{ display: 'flex' }}>
      <Link to={route} className="p-project-card">
        <div className="p-project-icon">
          <Icon size={20} />
        </div>
        <p className="p-project-title">{title}</p>
        <p className="p-project-desc">{description}</p>
        <div className="p-project-tags">
          {tags.map(t => (
            <span key={t} className="p-tag">{t}</span>
          ))}
        </div>
        <span className="p-project-cta">
          View Live <ArrowRight size={13} />
        </span>
      </Link>
    </div>
  );
}

export default function ReactProjects() {
  return (
    <div className="p-section-alt">
      <div id="projects" className="p-section">
        <p className="p-section-label">React Projects</p>
        <h2 className="p-section-title">What I've Built</h2>
        <div className="p-projects-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 75} />
          ))}
        </div>
      </div>
    </div>
  );
}
