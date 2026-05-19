import { useState, useEffect } from 'react';
import { Github, Star, BookOpen, Users, ExternalLink } from 'lucide-react';
import { useReveal } from './useReveal';

const USERNAME = 'nyabeze';

export default function GitHubStats() {
  const [user, setUser]   = useState(null);
  const [langs, setLangs] = useState([]);
  const [error, setError] = useState(false);
  const ref = useReveal(0);

  useEffect(() => {
    Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`).then(r => r.json()),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`).then(r => r.json()),
    ])
      .then(([userData, repos]) => {
        setUser(userData);

        // tally bytes per language across all repos
        const tally = {};
        repos.forEach(repo => {
          if (repo.language) {
            tally[repo.language] = (tally[repo.language] || 0) + 1;
          }
        });
        const sorted = Object.entries(tally)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([lang]) => lang);
        setLangs(sorted);
      })
      .catch(() => setError(true));
  }, []);

  const stats = user
    ? [
        { Icon: BookOpen, label: 'Public Repos',  value: user.public_repos },
        { Icon: Users,    label: 'Followers',      value: user.followers },
        { Icon: Star,     label: 'Following',      value: user.following },
      ]
    : null;

  return (
    <div id="github" className="p-section">
      <p className="p-section-label">Open Source</p>
      <h2 className="p-section-title">GitHub Activity</h2>

      <div className="gh-wrap p-reveal" ref={ref}>
        {/* Profile card */}
        <div className="gh-profile">
          <div className="gh-profile-top">
            <div className="gh-avatar">
              <Github size={28} />
            </div>
            <div>
              <p className="gh-username">@{USERNAME}</p>
              <p className="gh-handle">github.com/{USERNAME}</p>
            </div>
          </div>

          {!error && stats && (
            <div className="gh-stats">
              {stats.map(({ Icon, label, value }) => (
                <div key={label} className="gh-stat">
                  <Icon size={16} />
                  <span className="gh-stat-value">{value}</span>
                  <span className="gh-stat-label">{label}</span>
                </div>
              ))}
            </div>
          )}

          {!error && !stats && (
            <div className="gh-loading">
              <div className="gh-spinner" />
              <span>Fetching stats…</span>
            </div>
          )}

          {error && (
            <p className="gh-error">Could not load stats — visit GitHub directly.</p>
          )}

          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="gh-cta"
          >
            View Profile <ExternalLink size={13} />
          </a>
        </div>

        {/* Languages */}
        <div className="gh-right">
          <div className="gh-langs-card">
            <p className="gh-card-label">Top Languages</p>
            {langs.length > 0 ? (
              <div className="gh-langs">
                {langs.map(lang => (
                  <span key={lang} className="gh-lang-badge">{lang}</span>
                ))}
              </div>
            ) : (
              <div className="gh-langs">
                {['Python', 'JavaScript', 'Dart', 'HTML', 'CSS'].map(l => (
                  <span key={l} className="gh-lang-badge">{l}</span>
                ))}
              </div>
            )}
          </div>

          <div className="gh-bio-card">
            <p className="gh-card-label">About</p>
            <p className="gh-bio-text">
              I build open-source tools, learning projects, and personal utilities.
              Most of my work spans web apps, REST APIs, and mobile applications.
              Check GitHub for the latest repos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
