import { useReveal } from './useReveal';

const ESSAYS = [
  {
    tag: 'Politics',
    title: 'Zimbabwe at 45: The Promise That Was Never Kept',
    excerpt:
      'Independence handed Zimbabwe a nation rich in minerals, land, and talent. Forty-five years later, the question is no longer what went wrong — it is who had the power to stop it and chose not to.',
  },
  {
    tag: 'Economy',
    title: 'The ZiG and the Illusion of Monetary Stability',
    excerpt:
      'Zimbabwe has buried seven currencies in four decades. Each launch was met with the same optimism; each collapse with the same excuses. The ZiG is not a currency problem — it is a trust problem.',
  },
  {
    tag: 'Youth & Technology',
    title: 'Building in Zimbabwe: Why the Next Startup Hub Is Harare',
    excerpt:
      "Constraint is the mother of innovation. Zimbabwe's youth have spent a generation solving problems that most of the world does not know exist. That is not a disadvantage — that is a head start.",
  },
  {
    tag: 'Democracy',
    title: 'The Loudest Room Wins: Why Giving Everyone a Voice Is the Only Path Forward',
    excerpt:
      "Zimbabwe has never truly heard all its citizens. When farmers, vendors, teachers, and young engineers are locked out of the conversation, the country makes decisions with half the information it needs. Inclusion is not a soft ideal — it is the smartest governance strategy a nation can adopt.",
  },
  {
    tag: 'History',
    title: "Why Rhodesia Worked but Zimbabwe Doesn't",
    excerpt:
      "Rhodesia was a moral catastrophe built on exclusion and violence — yet its infrastructure hummed, its farms fed a continent, and its institutions functioned. Zimbabwe inherited all of it and dismantled most of it within a generation. Understanding why forces an uncomfortable question: what does it actually take to run a country?",
  },
];

export default function Writing() {
  const ref = useReveal(0);

  return (
    <div className="p-section-alt">
      <div id="writing" className="p-section">
        <p className="p-section-label">Thoughts &amp; Writing</p>
        <h2 className="p-section-title">Essays</h2>

        <div className="wr-grid p-reveal" ref={ref}>
          {ESSAYS.map(({ tag, title, excerpt }) => (
            <div key={title} className="wr-card">
              <span className="wr-tag">{tag}</span>
              <h3 className="wr-title">{title}</h3>
              <p className="wr-excerpt">{excerpt}</p>
              <span className="wr-soon">Coming soon</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
