import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Bell } from 'lucide-react';
import DemoShell from './DemoShell';
import mainCode from '../../../PycharmProjects/day-36/main.py?raw';
import './demos.css';

const FILES = [{ name: 'main.py', code: mainCode }];

const SETUP = [
  { desc: 'Install dependencies:', cmd: 'pip install requests twilio python-dotenv' },
  { desc: 'Create a .env file with your API keys:', cmd: 'ALPHA_VANTAGE_KEY=your_key\nNEWS_API_KEY=your_key\nTWILIO_SID=your_sid\nTWILIO_AUTH=your_auth\nFROM_NUMBER=+1234567890\nTO_NUMBER=+0987654321' },
  { desc: 'Run the script (best scheduled as a daily cron job):', cmd: 'python main.py' },
];

const MOCK_STOCKS = {
  TSLA: { name: 'Tesla, Inc.',        base: 248.23 },
  AAPL: { name: 'Apple Inc.',         base: 189.50 },
  MSFT: { name: 'Microsoft Corp.',    base: 415.20 },
  AMZN: { name: 'Amazon.com, Inc.',   base: 183.75 },
  NVDA: { name: 'NVIDIA Corp.',       base: 875.40 },
};

const HEADLINES = [
  'Analysts raise price target amid strong earnings beat',
  'CEO announces new product line at annual shareholder meeting',
  'Supply chain concerns ease as quarterly results impress',
];

function mockHistory(base) {
  return ['Mon','Tue','Wed','Thu','Fri','Mon','Tue'].map((day, i) => {
    const seed = Math.sin(i * 9.7) * 0.5 + Math.cos(i * 3.2) * 0.3;
    return { day, price: +(base * (1 + seed * 0.04)).toFixed(2) };
  });
}

function Demo() {
  const [symbol, setSymbol]       = useState('TSLA');
  const [threshold, setThreshold] = useState(5);
  const [history, setHistory]     = useState([]);
  const [alert, setAlert]         = useState(null);

  useEffect(() => {
    const stock = MOCK_STOCKS[symbol] || MOCK_STOCKS.TSLA;
    const h = mockHistory(stock.base);
    setHistory(h);
    const prev = h[h.length - 2].price;
    const curr = h[h.length - 1].price;
    const pct  = ((curr - prev) / prev) * 100;
    setAlert(Math.abs(pct) >= threshold ? { pct, curr, prev } : null);
  }, [symbol, threshold]);

  const stock   = MOCK_STOCKS[symbol] || MOCK_STOCKS.TSLA;
  const current = history[history.length - 1]?.price ?? stock.base;
  const prev    = history[history.length - 2]?.price ?? stock.base;
  const change  = ((current - prev) / prev * 100).toFixed(2);
  const up      = parseFloat(change) >= 0;
  const min = Math.min(...history.map(h => h.price));
  const max = Math.max(...history.map(h => h.price));

  return (
    <div className="demo-page">
      <div className="demo-container">
        <h1 className="demo-title">Stock Price Alert</h1>
        <p className="demo-sub">Monitor stock price swings and trigger SMS alerts when movement exceeds your threshold.</p>

        <div className="demo-card">
          <p className="demo-card-label">Settings</p>
          <div className="sa-controls">
            <label className="rz-label">Stock Symbol
              <select className="demo-input demo-select" value={symbol} onChange={e => setSymbol(e.target.value)}>
                {Object.entries(MOCK_STOCKS).map(([sym, s]) => (
                  <option key={sym} value={sym}>{sym} — {s.name}</option>
                ))}
              </select>
            </label>
            <label className="rz-label">Alert Threshold (%)
              <div className="sa-slider-row">
                <input type="range" min={1} max={20} value={threshold}
                  onChange={e => setThreshold(+e.target.value)} className="pm-slider" />
                <span className="sa-pct-val">{threshold}%</span>
              </div>
            </label>
          </div>
        </div>

        <div className="demo-card">
          <div className="sa-price-header">
            <div><p className="sa-symbol">{symbol}</p><p className="sa-name">{stock.name}</p></div>
            <div className="sa-price-right">
              <p className="sa-price">${current.toFixed(2)}</p>
              <p className={`sa-change ${up ? 'sa-up' : 'sa-down'}`}>
                {up ? <TrendingUp size={14}/> : <TrendingDown size={14}/>}
                {up ? '+' : ''}{change}%
              </p>
            </div>
          </div>
          <div className="sa-chart">
            {history.map(({ day, price }, i) => {
              const pct  = ((price - min) / (max - min || 1)) * 100;
              const isLast = i === history.length - 1;
              return (
                <div key={i} className="sa-bar-wrap" title={`${day}: $${price}`}>
                  <div className="sa-bar" style={{ height: `${Math.max(pct, 5)}%`, background: isLast ? (up ? '#4ade80' : '#f87171') : 'rgba(0,212,255,0.25)' }} />
                  <span className="sa-bar-label">{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`demo-card sa-alert-card ${alert ? 'sa-alert-active' : 'sa-alert-quiet'}`}>
          <Bell size={18} />
          {alert ? (
            <div>
              <p className="sa-alert-title">Alert Triggered!</p>
              <p className="sa-alert-body">{symbol} moved <strong>{Math.abs(alert.pct).toFixed(2)}%</strong> — from ${alert.prev.toFixed(2)} to ${alert.curr.toFixed(2)}. An SMS would be sent with headlines:</p>
              <ul className="sa-headlines">{HEADLINES.map(h => <li key={h}>{h}</li>)}</ul>
            </div>
          ) : (
            <p className="sa-alert-body">No alert — {symbol} moved only {Math.abs(change)}% today, below your {threshold}% threshold.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StockAlertDemo() {
  return <DemoShell files={FILES} setup={SETUP}><Demo /></DemoShell>;
}
