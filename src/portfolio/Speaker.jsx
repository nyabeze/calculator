import { Mic, BookOpen, ArrowRight } from 'lucide-react';
import { useReveal } from './useReveal';

const TOPICS = ['Human Rights', 'Business', 'Capitalism', 'Leadership', 'Social Justice'];

const SPEAKERS = [
  { name: 'Barack Obama',       note: '44th President of the United States' },
  { name: 'Martin Luther King', note: 'Civil rights leader & Nobel laureate' },
  { name: 'Morgan Tsvangirai',  note: 'Zimbabwean labour leader & statesman' },
  { name: 'Raila Odinga',       note: 'Kenyan opposition leader & reformist' },
];

const AUTHORS = [
  { name: 'Simon Sinek',   note: 'Start With Why · Leaders Eat Last' },
  { name: 'Ryan Holiday',  note: 'The Obstacle Is the Way · Ego Is the Enemy' },
];

export default function Speaker() {
  const topRef   = useReveal(0);
  const leftRef  = useReveal(0);
  const rightRef = useReveal(80);

  return (
    <div className="p-section-alt">
      <div id="speaking" className="p-section">
        <p className="p-section-label">Beyond Code</p>
        <h2 className="p-section-title">Speaker &amp; Thinker</h2>

        {/* Pull-quote */}
        <div className="sp-quote p-reveal" ref={topRef}>
          <span className="sp-quote-mark">"</span>
          <p>
            Words carry the same weight as code — both have the power
            to change systems, shift mindsets, and move people to act.
          </p>
        </div>

        <div className="sp-grid">
          {/* Left — Speaking */}
          <div className="sp-card p-reveal" ref={leftRef}>
            <div className="sp-card-header">
              <div className="sp-icon">
                <Mic size={18} />
              </div>
              <h3>Public Speaking</h3>
            </div>

            <p className="sp-body">
              I'm a public speaker actively looking for opportunities to address
              audiences on the intersections of human rights, business ethics,
              and capitalism. I believe in using the platform of speech to
              challenge ideas, provoke thought, and inspire action.
            </p>

            <p className="sp-sub-label">Topics I speak on</p>
            <div className="sp-topics">
              {TOPICS.map(t => (
                <span key={t} className="sp-topic-tag">{t}</span>
              ))}
            </div>

            <a href="#contact" className="sp-cta">
              Book me to speak <ArrowRight size={14} />
            </a>
          </div>

          {/* Right — Influences */}
          <div className="sp-card p-reveal" ref={rightRef}>
            <div className="sp-card-header">
              <div className="sp-icon">
                <BookOpen size={18} />
              </div>
              <h3>Influences &amp; Reading</h3>
            </div>

            <p className="sp-sub-label">Speakers who inspire me</p>
            <ul className="sp-influence-list">
              {SPEAKERS.map(({ name, note }) => (
                <li key={name} className="sp-influence-item">
                  <span className="sp-influence-name">{name}</span>
                  <span className="sp-influence-note">{note}</span>
                </li>
              ))}
            </ul>

            <p className="sp-sub-label" style={{ marginTop: '1.5rem' }}>Authors I read</p>
            <ul className="sp-influence-list">
              {AUTHORS.map(({ name, note }) => (
                <li key={name} className="sp-influence-item">
                  <span className="sp-influence-name">{name}</span>
                  <span className="sp-influence-note">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
