import { useState } from 'react';
import { ShoppingCart, Bell, BellOff, RefreshCw } from 'lucide-react';
import DemoShell from './DemoShell';
import mainCode from '../../../PycharmProjects/Amazon_price_checker/main.py?raw';
import notifCode from '../../../PycharmProjects/Amazon_price_checker/notification_manager.py?raw';
import './demos.css';

const FILES = [
  { name: 'main.py',                code: mainCode  },
  { name: 'notification_manager.py', code: notifCode },
];

const SETUP = [
  { desc: 'Install dependencies:', cmd: 'pip install requests beautifulsoup4 python-dotenv' },
  { desc: 'Create a .env file with your Gmail credentials and target URL:', cmd: 'EMAIL=your@gmail.com\nPASSWORD=your_app_password\nTO_EMAIL=notify@email.com\nTARGET_URL=https://www.amazon.com/...\nTARGET_PRICE=1100' },
  { desc: 'Enable "App Passwords" in your Google account (required for SMTP).' },
  { desc: 'Run the script (best scheduled daily with Task Scheduler or cron):', cmd: 'python main.py' },
];

const MOCK_PRODUCTS = [
  { name: 'Samsung Galaxy S24 Ultra 256GB', base: 1199 },
  { name: 'Samsung Galaxy S24+ 256GB',      base:  999 },
  { name: 'Samsung Galaxy S24 128GB',        base:  799 },
  { name: 'iPhone 15 Pro 256GB',             base: 1099 },
  { name: 'Google Pixel 8 Pro 128GB',        base:  899 },
];

function mockPrice(base) {
  const variation = (Math.random() - 0.5) * base * 0.12;
  return +(base + variation).toFixed(2);
}

function Demo() {
  const [product, setProduct]   = useState(MOCK_PRODUCTS[0].name);
  const [target, setTarget]     = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult]     = useState(null);
  const [history, setHistory]   = useState([]);

  const check = () => {
    const t = parseFloat(target);
    if (!target || isNaN(t)) return;
    setChecking(true);
    setResult(null);
    setTimeout(() => {
      const base    = MOCK_PRODUCTS.find(p => p.name === product)?.base ?? 1000;
      const current = mockPrice(base);
      const triggered = current <= t;
      const r = { product, target: t, current, triggered, time: new Date().toLocaleTimeString() };
      setResult(r);
      setHistory(h => [r, ...h].slice(0, 5));
      setChecking(false);
    }, 1800);
  };

  return (
    <div className="demo-page">
      <div className="demo-container">
        <h1 className="demo-title">Amazon Price Checker</h1>
        <p className="demo-sub">Set a target price — the scraper monitors Amazon and emails you when the price drops below your threshold.</p>

        <div className="demo-card">
          <p className="demo-card-label">Configure Alert</p>
          <div className="ac-form">
            <label className="rz-label rz-label--full">Product
              <select className="demo-input demo-select" value={product} onChange={e => setProduct(e.target.value)}>
                {MOCK_PRODUCTS.map(p => <option key={p.name} value={p.name}>{p.name} (~${p.base})</option>)}
              </select>
            </label>
            <label className="rz-label">Target Price ($)
              <input className="demo-input" type="number" min={1} placeholder="1100" value={target} onChange={e => setTarget(e.target.value)} />
            </label>
          </div>
          <button className="demo-btn ac-btn" onClick={check} disabled={checking || !target}>
            {checking ? <><RefreshCw size={14} className="ac-spin" /> Scraping Amazon…</> : <><ShoppingCart size={14} /> Check Price</>}
          </button>
        </div>

        {checking && <div className="demo-card sp-loading"><div className="gh-spinner" /><p>Sending request to Amazon… parsing HTML… extracting price…</p></div>}

        {result && (
          <div className={`demo-card ac-result ${result.triggered ? 'ac-triggered' : 'ac-quiet'}`}>
            <div className="ac-result-icon">{result.triggered ? <Bell size={22} /> : <BellOff size={22} />}</div>
            <div>
              <p className="ac-result-product">{result.product}</p>
              <p className="ac-current-price">Current price: <strong>${result.current.toFixed(2)}</strong></p>
              <p className="ac-target-price">Your target: <strong>${result.target.toFixed(2)}</strong></p>
              {result.triggered
                ? <p className="ac-alert-msg">Price dropped below target! Email notification sent.</p>
                : <p className="ac-quiet-msg">Price is above target. Monitoring continues.</p>}
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="demo-card">
            <p className="demo-card-label">Check History</p>
            <div className="ac-history">
              {history.map((r, i) => (
                <div key={i} className="ac-history-row">
                  <span className="ac-history-time">{r.time}</span>
                  <span className="ac-history-name">{r.product.split(' ').slice(0, 3).join(' ')}</span>
                  <span className="ac-history-price">${r.current.toFixed(2)}</span>
                  <span className={`ac-history-status ${r.triggered ? 'ac-up' : 'ac-down'}`}>{r.triggered ? 'Alert sent' : 'Watching'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AmazonCheckerDemo() {
  return <DemoShell files={FILES} setup={SETUP}><Demo /></DemoShell>;
}
