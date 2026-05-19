import { useState, useCallback } from 'react';
import { Copy, Check, Trash2, Plus, RefreshCw, Search } from 'lucide-react';
import DemoShell from './DemoShell';
import mainCode from '../../../PycharmProjects/day-29/002 password-manager-start/main.py?raw';
import passGenCode from '../../../PycharmProjects/day-29/002 password-manager-start/pass gen.py?raw';
import './demos.css';

const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const UPPER   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER   = 'abcdefghijklmnopqrstuvwxyz';
const DIGITS  = '0123456789';

const FILES = [
  { name: 'main.py',       code: mainCode    },
  { name: 'pass gen.py',   code: passGenCode },
];

const SETUP = [
  { desc: 'Make sure Python 3 is installed.' },
  { desc: 'Install the only dependency:', cmd: 'pip install pyperclip' },
  { desc: 'Run the app:', cmd: 'python main.py' },
  { desc: 'The Tkinter window will open. Generate a password, enter your website and email, and save it to the JSON vault.' },
];

function generate(len, opts) {
  let pool = LOWER;
  if (opts.upper)   pool += UPPER;
  if (opts.digits)  pool += DIGITS;
  if (opts.symbols) pool += SYMBOLS;
  return Array.from({ length: len }, () => pool[Math.floor(Math.random() * pool.length)]).join('');
}

function Demo() {
  const [len, setLen]       = useState(16);
  const [opts, setOpts]     = useState({ upper: true, digits: true, symbols: true });
  const [password, setPassword] = useState(() => generate(16, { upper: true, digits: true, symbols: true }));
  const [copied, setCopied] = useState(false);
  const [website, setWebsite] = useState('');
  const [email, setEmail]   = useState('');
  const [vault, setVault]   = useState([]);
  const [search, setSearch] = useState('');

  const regen = useCallback(() => {
    setPassword(generate(len, opts));
    setCopied(false);
  }, [len, opts]);

  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addToVault = () => {
    if (!website || !email) return;
    setVault(v => [...v, { id: Date.now(), website, email, password }]);
    setWebsite('');
    setEmail('');
    regen();
  };

  const del = id => setVault(v => v.filter(e => e.id !== id));

  const filtered = vault.filter(e =>
    e.website.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase())
  );

  const strength = (() => {
    if (len >= 20 && opts.upper && opts.digits && opts.symbols) return { label: 'Strong', color: '#00d4ff' };
    if (len >= 12 && (opts.digits || opts.symbols)) return { label: 'Good', color: '#4caf50' };
    if (len >= 8) return { label: 'Fair', color: '#ff9800' };
    return { label: 'Weak', color: '#f44336' };
  })();

  return (
    <div className="demo-page">
      <div className="demo-container">
        <h1 className="demo-title">Password Manager</h1>
        <p className="demo-sub">Generate strong passwords and manage your vault</p>

        <div className="demo-card">
          <p className="demo-card-label">Generator</p>
          <div className="pm-output">
            <span className="pm-password">{password}</span>
            <div className="pm-output-actions">
              <button className="pm-icon-btn" onClick={regen} title="Regenerate"><RefreshCw size={15} /></button>
              <button className="pm-icon-btn" onClick={copy} title="Copy">
                {copied ? <Check size={15} color="#4caf50" /> : <Copy size={15} />}
              </button>
            </div>
          </div>
          <div className="pm-strength">
            <span className="pm-strength-label">Strength:</span>
            <span style={{ color: strength.color, fontWeight: 700 }}>{strength.label}</span>
          </div>
          <div className="pm-controls">
            <label className="pm-label">
              Length: <strong>{len}</strong>
              <input type="range" min={6} max={32} value={len}
                onChange={e => { setLen(+e.target.value); regen(); }} className="pm-slider" />
            </label>
            <div className="pm-checkboxes">
              {[['upper', 'A–Z'], ['digits', '0–9'], ['symbols', '!@#']].map(([key, lbl]) => (
                <label key={key} className="pm-check">
                  <input type="checkbox" checked={opts[key]}
                    onChange={e => { setOpts(o => ({ ...o, [key]: e.target.checked })); regen(); }} />
                  {lbl}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="demo-card">
          <p className="demo-card-label">Save to Vault</p>
          <div className="pm-form">
            <input className="demo-input" placeholder="Website" value={website} onChange={e => setWebsite(e.target.value)} />
            <input className="demo-input" placeholder="Email / Username" value={email} onChange={e => setEmail(e.target.value)} />
            <button className="demo-btn" onClick={addToVault}><Plus size={14} /> Save</button>
          </div>
        </div>

        {vault.length > 0 && (
          <div className="demo-card">
            <p className="demo-card-label">Vault ({vault.length})</p>
            <div className="pm-search-wrap">
              <Search size={14} className="pm-search-icon" />
              <input className="demo-input pm-search" placeholder="Search vault…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="pm-vault">
              {filtered.map(entry => (
                <div key={entry.id} className="pm-entry">
                  <div className="pm-entry-info">
                    <p className="pm-entry-site">{entry.website}</p>
                    <p className="pm-entry-email">{entry.email}</p>
                    <p className="pm-entry-pw">{entry.password}</p>
                  </div>
                  <button className="pm-icon-btn pm-del" onClick={() => del(entry.id)}><Trash2 size={14} /></button>
                </div>
              ))}
              {filtered.length === 0 && <p className="pm-no-results">No results found.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PasswordManagerDemo() {
  return <DemoShell files={FILES} setup={SETUP}><Demo /></DemoShell>;
}
