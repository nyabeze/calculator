import { useState } from 'react';
import { Plus, Trash2, Dumbbell } from 'lucide-react';
import DemoShell from './DemoShell';
import mainCode from '../../../PycharmProjects/day-38/main.py?raw';
import './demos.css';

const FILES = [{ name: 'main.py', code: mainCode }];

const SETUP = [
  { desc: 'Install dependencies:', cmd: 'pip install requests python-dotenv' },
  { desc: 'Create a .env file with your API credentials:', cmd: 'NUTRITIONIX_APP_ID=your_id\nNUTRITIONIX_API_KEY=your_key\nSHEETY_ENDPOINT=your_sheety_url\nSHEETY_USERNAME=your_username\nSHEETY_PASSWORD=your_password' },
  { desc: 'Run the script:', cmd: 'python main.py' },
  { desc: 'When prompted, describe your workout in natural English — e.g. "ran 5km for 30 minutes". The script logs it to your Google Sheet.' },
];

const EXERCISES = [
  { keywords: ['ran', 'run', 'running', 'jog', 'jogged', 'jogging'], name: 'Running',    met: 9.8,  unit: 'km' },
  { keywords: ['walked', 'walk', 'walking', 'hike', 'hiked'],         name: 'Walking',    met: 3.5,  unit: 'km' },
  { keywords: ['cycled', 'cycle', 'cycling', 'biked', 'bike'],        name: 'Cycling',    met: 7.5,  unit: 'km' },
  { keywords: ['swam', 'swim', 'swimming'],                            name: 'Swimming',   met: 8.0,  unit: 'm'  },
  { keywords: ['push up', 'pushup', 'push-up'],                       name: 'Push-ups',   met: 8.0,  unit: 'reps'},
  { keywords: ['squat', 'squats'],                                     name: 'Squats',     met: 5.0,  unit: 'reps'},
  { keywords: ['jumped', 'jump rope', 'skipping'],                    name: 'Jump Rope',  met: 11.0, unit: 'min' },
  { keywords: ['yoga'],                                                name: 'Yoga',       met: 2.5,  unit: 'min' },
  { keywords: ['weights', 'lifted', 'lifting', 'gym', 'workout'],     name: 'Weight Training', met: 6.0, unit: 'min'},
];

const WEIGHT_KG = 70;

function parse(text) {
  const lower = text.toLowerCase();
  let exercise = EXERCISES.find(e => e.keywords.some(k => lower.includes(k)));
  if (!exercise) exercise = { name: 'Exercise', met: 5.0, unit: 'min' };
  const numMatch = text.match(/(\d+(\.\d+)?)/);
  const amount   = numMatch ? parseFloat(numMatch[1]) : 30;
  const minMatch = text.match(/(\d+)\s*(min|minute|minutes|hours|hour|hrs)/i);
  let duration   = minMatch
    ? (minMatch[2].startsWith('h') ? parseFloat(minMatch[1]) * 60 : parseFloat(minMatch[1]))
    : (exercise.unit === 'km' ? amount * 6 : amount);
  const calories = Math.round((exercise.met * WEIGHT_KG * duration) / 60);
  return { id: Date.now(), raw: text, exercise: exercise.name, amount: `${amount} ${exercise.unit}`, duration: `${Math.round(duration)} min`, calories, date: new Date().toLocaleDateString() };
}

function Demo() {
  const [input, setInput] = useState('');
  const [log, setLog]     = useState([]);
  const [error, setError] = useState('');

  const add = () => {
    const trimmed = input.trim();
    if (!trimmed) { setError('Describe your workout first.'); return; }
    setLog(l => [parse(trimmed), ...l]);
    setInput('');
    setError('');
  };

  const del = id => setLog(l => l.filter(e => e.id !== id));
  const totalCals = log.reduce((s, e) => s + e.calories, 0);
  const examples = ['ran 5km for 30 minutes', 'did 50 push ups', 'walked 3km', 'cycled 20km in 45 minutes', 'swam 1000m'];

  return (
    <div className="demo-page">
      <div className="demo-container">
        <h1 className="demo-title">Natural Language Workout Logger</h1>
        <p className="demo-sub">Describe your workout in plain English — the app parses it and calculates calories burned (based on a {WEIGHT_KG}kg body weight).</p>

        <div className="demo-card">
          <p className="demo-card-label">Log a Workout</p>
          <div className="wl-input-row">
            <input className="demo-input wl-input" placeholder='e.g. "ran 5km for 30 minutes"' value={input}
              onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} />
            <button className="demo-btn" onClick={add}><Plus size={14} /> Log</button>
          </div>
          {error && <p className="demo-error">{error}</p>}
          <div className="wl-examples">
            <p className="wl-examples-label">Try:</p>
            {examples.map(ex => (
              <button key={ex} className="wl-example-chip" onClick={() => setInput(ex)}>{ex}</button>
            ))}
          </div>
        </div>

        {log.length > 0 && (
          <div className="demo-card">
            <div className="wl-log-header">
              <p className="demo-card-label">Workout Log</p>
              <span className="wl-total">Total: <strong>{totalCals} kcal</strong></span>
            </div>
            <div className="wl-log">
              {log.map(entry => (
                <div key={entry.id} className="wl-entry">
                  <div className="wl-entry-icon"><Dumbbell size={16} /></div>
                  <div className="wl-entry-info">
                    <p className="wl-entry-name">{entry.exercise}</p>
                    <p className="wl-entry-detail">"{entry.raw}"</p>
                    <div className="wl-entry-meta"><span>{entry.amount}</span><span>·</span><span>{entry.duration}</span><span>·</span><span>{entry.date}</span></div>
                  </div>
                  <div className="wl-entry-right">
                    <span className="wl-calories">{entry.calories} kcal</span>
                    <button className="pm-icon-btn pm-del" onClick={() => del(entry.id)}><Trash2 size={13} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function WorkoutLoggerDemo() {
  return <DemoShell files={FILES} setup={SETUP}><Demo /></DemoShell>;
}
