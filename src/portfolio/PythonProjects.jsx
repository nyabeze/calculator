import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, TrendingUp, Music, ShoppingCart, Lock, FlaskConical, ArrowRight } from 'lucide-react';

const PROJECTS = [
  {
    id: 'razfit',
    Icon: Activity,
    title: 'Razfit',
    route: '/projects/razfit',
    description:
      'Full-stack fitness tracker with user authentication (JWT), OpenAI-generated personalised workout and meal plans, macronutrient logging, and email notifications.',
    tags: ['Flask', 'SQLAlchemy', 'JWT', 'OpenAI API', 'Flask-CORS'],
  },
  {
    id: 'stock-alert',
    Icon: TrendingUp,
    title: 'Stock Price Alert',
    route: '/projects/stock-alert',
    description:
      'Monitors Tesla stock via Alpha Vantage — triggers SMS alerts via Twilio with related news headlines when daily price swings exceed 5%.',
    tags: ['Python', 'Alpha Vantage API', 'News API', 'Twilio'],
  },
  {
    id: 'spotify-playlist',
    Icon: Music,
    title: 'Spotify Playlist Creator',
    route: '/projects/spotify-playlist',
    description:
      'Scrapes the Billboard Hot 100 for any target date, searches Spotify for each track, and auto-builds a dated playlist using the Spotify OAuth API.',
    tags: ['Python', 'Spotify API', 'BeautifulSoup', 'OAuth'],
  },
  {
    id: 'amazon-checker',
    Icon: ShoppingCart,
    title: 'Amazon Price Checker',
    route: '/projects/amazon-checker',
    description:
      'Web scraper that tracks Samsung smartphone prices on Amazon and sends an email notification automatically when the price drops below a set threshold.',
    tags: ['Python', 'BeautifulSoup', 'requests', 'SMTP'],
  },
  {
    id: 'workout-logger',
    Icon: FlaskConical,
    title: 'Natural Language Workout Logger',
    route: '/projects/workout-logger',
    description:
      'Parses free-text exercise descriptions ("ran 5km") via Nutritionix API to extract calories and duration, then logs each session to a Google Sheet via Sheety API.',
    tags: ['Python', 'Nutritionix API', 'Sheety API', 'REST'],
  },
  {
    id: 'password-manager',
    Icon: Lock,
    title: 'Password Manager',
    route: '/projects/password-manager',
    description:
      'Desktop GUI app that generates strong random passwords, stores credentials securely in JSON, and supports instant search — with one-click clipboard copy.',
    tags: ['Python', 'Tkinter', 'JSON', 'pyperclip'],
  },
];

function PyCard({ project, delay }) {
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
        <div className="p-project-icon py-icon">
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
          Try Demo <ArrowRight size={13} />
        </span>
      </Link>
    </div>
  );
}

export default function PythonProjects() {
  return (
    <div id="python" className="p-section">
      <p className="p-section-label">Python Projects</p>
      <h2 className="p-section-title">Backend &amp; Scripting</h2>
      <div className="p-projects-grid">
        {PROJECTS.map((project, i) => (
          <PyCard key={project.id} project={project} delay={i * 75} />
        ))}
      </div>
    </div>
  );
}
