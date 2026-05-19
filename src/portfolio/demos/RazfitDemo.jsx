import { useState } from 'react';
import DemoShell from './DemoShell';
import appCode      from '../../../PycharmProjects/razfit/app.py?raw';
import modelsCode   from '../../../PycharmProjects/razfit/models.py?raw';
import workoutCode  from '../../../PycharmProjects/razfit/workout_generator.py?raw';
import mealCode     from '../../../PycharmProjects/razfit/meal_generator.py?raw';
import mainCode     from '../../../PycharmProjects/razfit/main.py?raw';
import './demos.css';

const FILES = [
  { name: 'app.py',               code: appCode     },
  { name: 'models.py',            code: modelsCode  },
  { name: 'workout_generator.py', code: workoutCode },
  { name: 'meal_generator.py',    code: mealCode    },
  { name: 'main.py',              code: mainCode    },
];

const SETUP = [
  { desc: 'Install dependencies:', cmd: 'pip install flask flask-sqlalchemy flask-jwt-extended flask-cors flask-mail openai python-dotenv' },
  { desc: 'Create a .env file with your credentials:', cmd: 'SECRET_KEY=your_secret\nOPENAI_API_KEY=your_key\nMAIL_USERNAME=your@gmail.com\nMAIL_PASSWORD=your_app_password' },
  { desc: 'Initialise the database:', cmd: 'flask db init && flask db migrate && flask db upgrade' },
  { desc: 'Run the Flask server:', cmd: 'python main.py' },
  { desc: 'The API will be available at http://localhost:5000. Use any REST client (Postman, Insomnia) to register, log in, and generate your plan.' },
];

function calcPlan({ age, weight, height, gender, goal }) {
  const w = parseFloat(weight), h = parseFloat(height), a = parseInt(age);
  const bmr = gender === 'male'
    ? 10 * w + 6.25 * h - 5 * a + 5
    : 10 * w + 6.25 * h - 5 * a - 161;
  const tdee = Math.round(bmr * 1.55);

  const targets = {
    lose:     { calories: tdee - 500, protein: Math.round(w * 2.2), carbs: Math.round((tdee - 500) * 0.35 / 4), fat: Math.round((tdee - 500) * 0.30 / 9) },
    gain:     { calories: tdee + 300, protein: Math.round(w * 2.0), carbs: Math.round((tdee + 300) * 0.50 / 4), fat: Math.round((tdee + 300) * 0.25 / 9) },
    maintain: { calories: tdee,       protein: Math.round(w * 1.8), carbs: Math.round(tdee * 0.45 / 4),         fat: Math.round(tdee * 0.30 / 9) },
  };

  const schedules = {
    lose: [
      { day: 'Monday',    type: 'Cardio',         workout: '30 min run + 15 min HIIT' },
      { day: 'Tuesday',   type: 'Upper Body',     workout: 'Push-ups, rows, shoulder press — 3×12' },
      { day: 'Wednesday', type: 'Active Rest',    workout: '45 min walk or yoga' },
      { day: 'Thursday',  type: 'Lower Body',     workout: 'Squats, lunges, glute bridges — 3×15' },
      { day: 'Friday',    type: 'Cardio',         workout: '40 min steady-state run' },
      { day: 'Saturday',  type: 'Full Body',      workout: 'Circuit training — 4 rounds' },
      { day: 'Sunday',    type: 'Rest',           workout: 'Full recovery — stretch & foam roll' },
    ],
    gain: [
      { day: 'Monday',    type: 'Chest & Triceps', workout: 'Bench press, dips, cable flyes — 4×8' },
      { day: 'Tuesday',   type: 'Back & Biceps',   workout: 'Pull-ups, rows, curls — 4×8' },
      { day: 'Wednesday', type: 'Rest',            workout: 'Light walk or stretching' },
      { day: 'Thursday',  type: 'Legs',            workout: 'Squats, leg press, Romanian deadlift — 4×10' },
      { day: 'Friday',    type: 'Shoulders',       workout: 'Overhead press, lateral raises, face pulls — 4×10' },
      { day: 'Saturday',  type: 'Arms & Core',     workout: 'Curls, tricep extensions, planks — 3×12' },
      { day: 'Sunday',    type: 'Rest',            workout: 'Full recovery — sleep 8+ hours' },
    ],
    maintain: [
      { day: 'Monday',    type: 'Full Body',   workout: 'Compound lifts — squats, bench, rows — 3×10' },
      { day: 'Tuesday',   type: 'Cardio',      workout: '25 min moderate run' },
      { day: 'Wednesday', type: 'Upper Body',  workout: 'Push + pull superset — 3×12' },
      { day: 'Thursday',  type: 'Active Rest', workout: 'Yoga or 30 min walk' },
      { day: 'Friday',    type: 'Lower Body',  workout: 'Squats, deadlifts, lunges — 3×10' },
      { day: 'Saturday',  type: 'Cardio',      workout: 'Cycling or swimming — 30 min' },
      { day: 'Sunday',    type: 'Rest',        workout: 'Full recovery' },
    ],
  };

  const bmi = (w / ((h / 100) ** 2)).toFixed(1);
  return { bmr: Math.round(bmr), tdee, bmi, ...targets[goal], schedule: schedules[goal] };
}

const TYPE_COLORS = { Cardio: '#00d4ff', 'Upper Body': '#a78bfa', 'Lower Body': '#4ade80', 'Full Body': '#fb923c', Rest: '#6b7280', 'Active Rest': '#6b7280', 'Chest & Triceps': '#f472b6', 'Back & Biceps': '#34d399', Legs: '#4ade80', Shoulders: '#fbbf24', 'Arms & Core': '#a78bfa' };

function Demo() {
  const [form, setForm] = useState({ age: '', weight: '', height: '', gender: 'male', goal: 'lose' });
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState('');

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const generate = () => {
    if (!form.age || !form.weight || !form.height) { setError('Please fill in all fields.'); return; }
    setError('');
    setPlan(calcPlan(form));
  };

  return (
    <div className="demo-page">
      <div className="demo-container">
        <h1 className="demo-title">Razfit</h1>
        <p className="demo-sub">Enter your details to receive a personalised fitness plan with calorie targets and a weekly workout schedule.</p>

        <div className="demo-card">
          <p className="demo-card-label">Your Profile</p>
          <div className="rz-form">
            <label className="rz-label">Age
              <input className="demo-input" type="number" min={10} max={100} placeholder="25" value={form.age} onChange={set('age')} />
            </label>
            <label className="rz-label">Weight (kg)
              <input className="demo-input" type="number" min={30} max={250} placeholder="70" value={form.weight} onChange={set('weight')} />
            </label>
            <label className="rz-label">Height (cm)
              <input className="demo-input" type="number" min={100} max={250} placeholder="175" value={form.height} onChange={set('height')} />
            </label>
            <label className="rz-label">Gender
              <select className="demo-input demo-select" value={form.gender} onChange={set('gender')}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label className="rz-label rz-label--full">Goal
              <select className="demo-input demo-select" value={form.goal} onChange={set('goal')}>
                <option value="lose">Lose Weight</option>
                <option value="gain">Build Muscle</option>
                <option value="maintain">Maintain</option>
              </select>
            </label>
          </div>
          {error && <p className="demo-error">{error}</p>}
          <button className="demo-btn rz-btn" onClick={generate}>Generate My Plan</button>
        </div>

        {plan && (
          <>
            <div className="rz-stats-row">
              {[['BMI', plan.bmi], ['BMR', `${plan.bmr} kcal`], ['Daily Target', `${plan.calories} kcal`]].map(([label, value]) => (
                <div key={label} className="rz-stat">
                  <p className="rz-stat-value">{value}</p>
                  <p className="rz-stat-label">{label}</p>
                </div>
              ))}
            </div>

            <div className="demo-card">
              <p className="demo-card-label">Daily Macros</p>
              <div className="rz-macros">
                {[['Protein', plan.protein, 'g', '#00d4ff'], ['Carbs', plan.carbs, 'g', '#fb923c'], ['Fat', plan.fat, 'g', '#4ade80']].map(([name, val, unit, color]) => (
                  <div key={name} className="rz-macro">
                    <p className="rz-macro-value" style={{ color }}>{val}{unit}</p>
                    <p className="rz-macro-label">{name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="demo-card">
              <p className="demo-card-label">Weekly Schedule</p>
              <div className="rz-schedule">
                {plan.schedule.map(({ day, type, workout }) => (
                  <div key={day} className="rz-day">
                    <span className="rz-day-name">{day}</span>
                    <span className="rz-day-type" style={{ color: TYPE_COLORS[type] || '#888' }}>{type}</span>
                    <span className="rz-day-workout">{workout}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function RazfitDemo() {
  return <DemoShell files={FILES} setup={SETUP}><Demo /></DemoShell>;
}
