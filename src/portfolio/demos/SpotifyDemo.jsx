import { useState } from 'react';
import { Music, Disc3 } from 'lucide-react';
import DemoShell from './DemoShell';
import mainCode from '../../../PycharmProjects/day-46/main.py?raw';
import searchCode from '../../../PycharmProjects/day-46/search.py?raw';
import authCode from '../../../PycharmProjects/day-46/access_authorizer.py?raw';
import createrCode from '../../../PycharmProjects/day-46/playlist_creater.py?raw';
import adderCode from '../../../PycharmProjects/day-46/music_adder.py?raw';
import './demos.css';

const FILES = [
  { name: 'main.py',              code: mainCode    },
  { name: 'search.py',            code: searchCode  },
  { name: 'access_authorizer.py', code: authCode    },
  { name: 'playlist_creater.py',  code: createrCode },
  { name: 'music_adder.py',       code: adderCode   },
];

const SETUP = [
  { desc: 'Install dependencies:', cmd: 'pip install spotipy requests beautifulsoup4 python-dotenv' },
  { desc: 'Create a Spotify Developer app at developer.spotify.com and get your credentials. Set the redirect URI to http://localhost:8888/callback.' },
  { desc: 'Create a .env file:', cmd: 'SPOTIFY_CLIENT_ID=your_client_id\nSPOTIFY_CLIENT_SECRET=your_client_secret\nSPOTIFY_REDIRECT_URI=http://localhost:8888/callback' },
  { desc: 'Run the script and enter a date when prompted:', cmd: 'python main.py' },
];

const KNOWN = {
  '2000-01-01': ['Smooth – Santana ft. Rob Thomas','Maria Maria – Santana','What a Girl Wants – Christina Aguilera','I Knew I Loved You – Savage Garden','Amazed – Lonestar'],
  '2005-06-15': ["We Belong Together – Mariah Carey","Hollaback Girl – Gwen Stefani","Feel Good Inc – Gorillaz","Gold Digger – Kanye West ft. Jamie Foxx","Pon de Replay – Rihanna"],
  '2010-09-10': ['Love the Way You Lie – Eminem ft. Rihanna','California Gurls – Katy Perry ft. Snoop Dogg','Teenage Dream – Katy Perry','Billionaire – Travie McCoy ft. Bruno Mars',"Club Can't Handle Me – Flo Rida"],
  '2015-07-04': ['See You Again – Wiz Khalifa ft. Charlie Puth','Cheerleader – OMI','Want to Want Me – Jason Derulo','Lean On – Major Lazer & DJ Snake','Bad Blood – Taylor Swift ft. Kendrick Lamar'],
  '2020-03-20': ['Blinding Lights – The Weeknd','Rockstar – DaBaby ft. Roddy Ricch','The Box – Roddy Ricch','Life Is Good – Future ft. Drake','Adore You – Harry Styles'],
  '2024-01-01': ['Flowers – Miley Cyrus','Kill Bill – SZA','Unholy – Sam Smith & Kim Petras','Anti-Hero – Taylor Swift','Cruel Summer – Taylor Swift'],
};

function closest(date) {
  const target = new Date(date).getTime();
  const keys   = Object.keys(KNOWN);
  const key    = keys.reduce((a, b) => Math.abs(new Date(a) - target) < Math.abs(new Date(b) - target) ? a : b);
  if (Math.abs(new Date(key) - target) < 1000 * 60 * 60 * 24 * 30) return KNOWN[key];
  const year = new Date(date).getFullYear();
  return [`Summer Anthem ${year}`,`Chart Topper ${year}`,`Radio Hit ${year}`,`Dance Floor Banger ${year}`,`Top Track ${year}`,`Weekend Vibes ${year}`,`Club Night ${year}`,`Throwback ${year}`,`Chart Hit ${year}`,`Fan Favourite ${year}`];
}

function Demo() {
  const [date, setDate]         = useState('');
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading]   = useState(false);

  const create = () => {
    if (!date) return;
    setLoading(true);
    setPlaylist(null);
    setTimeout(() => {
      const tracks = closest(date);
      setPlaylist({ date, tracks });
      setLoading(false);
    }, 1200);
  };

  const fmt = d => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="demo-page">
      <div className="demo-container">
        <h1 className="demo-title">Spotify Playlist Creator</h1>
        <p className="demo-sub">Pick any date — the app scrapes the Billboard Hot 100 for that week and builds you a Spotify playlist from the top tracks.</p>

        <div className="demo-card">
          <p className="demo-card-label">Choose a Date</p>
          <div className="sp-input-row">
            <input className="demo-input" type="date" value={date}
              max={new Date().toISOString().split('T')[0]} onChange={e => setDate(e.target.value)} />
            <button className="demo-btn" onClick={create} disabled={!date || loading}>
              {loading ? 'Scraping…' : 'Create Playlist'}
            </button>
          </div>
          <p className="sp-hint">Try: 2000-01-01, 2010-09-10, 2015-07-04, 2020-03-20</p>
        </div>

        {loading && <div className="demo-card sp-loading"><div className="gh-spinner" /><p>Scraping Billboard Hot 100 and searching Spotify…</p></div>}

        {playlist && (
          <div className="demo-card">
            <div className="sp-playlist-header">
              <div className="sp-cover"><Disc3 size={36} /></div>
              <div>
                <p className="sp-playlist-name">Billboard Hot 100</p>
                <p className="sp-playlist-date">{fmt(playlist.date)}</p>
                <p className="sp-playlist-count">{playlist.tracks.length} tracks</p>
              </div>
            </div>
            <div className="sp-tracklist">
              {playlist.tracks.map((track, i) => (
                <div key={i} className="sp-track">
                  <span className="sp-track-num">{i + 1}</span>
                  <Music size={13} className="sp-track-icon" />
                  <span className="sp-track-name">{track.replace(/^\d+\.\s*/, '')}</span>
                </div>
              ))}
            </div>
            <p className="sp-disclaimer">In the real app, each track is searched on Spotify and added to your library via OAuth.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SpotifyDemo() {
  return <DemoShell files={FILES} setup={SETUP}><Demo /></DemoShell>;
}
