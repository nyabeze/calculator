import { useReveal } from './useReveal';

export default function Faith() {
  const ref = useReveal(0);

  return (
    <div className="p-section-alt">
      <div id="faith" className="p-section">
        <p className="p-section-label">Faith &amp; Values</p>
        <h2 className="p-section-title">What I Stand On</h2>

        <div className="faith-wrap p-reveal" ref={ref}>
          <div className="faith-quote-block">
            <span className="faith-quote-mark">"</span>
            <p className="faith-quote">
              Remember the Sabbath day, to keep it holy.
            </p>
            <p className="faith-quote-source">Exodus 20:8</p>
          </div>

          <div className="faith-body">
            <p className="faith-text">
              I am a devout Seventh-day Adventist and a committed Sabbath keeper.
              From sundown Friday to sundown Saturday, I step away from work,
              screens, and ambition — not because the world stops, but because
              rest is an act of trust and a declaration that I am more than what
              I produce.
            </p>
            <p className="faith-text">
              My faith shapes how I work as much as when I rest. It grounds my
              belief that technology should serve people, that integrity matters
              even when no one is watching, and that the purpose behind the work
              is always more important than the output.
            </p>

            <div className="faith-pillars">
              <div className="faith-pillar">
                <span className="faith-pillar-icon">✦</span>
                <span>Sabbath observer — Friday sundown to Saturday sundown</span>
              </div>
              <div className="faith-pillar">
                <span className="faith-pillar-icon">✦</span>
                <span>Seventh-day Adventist Church member</span>
              </div>
              <div className="faith-pillar">
                <span className="faith-pillar-icon">✦</span>
                <span>Faith-driven work ethic — integrity over convenience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
