import { useState } from 'react';
import { PlayCircle, Code2, Terminal } from 'lucide-react';
import CodeViewer from './CodeViewer';

export default function DemoShell({ children, files, setup }) {
  const [tab, setTab] = useState('demo');

  return (
    <div>
      {/* Tab bar */}
      <div className="ds-tab-bar">
        <button
          className={`ds-tab ${tab === 'demo' ? 'ds-tab-active' : ''}`}
          onClick={() => setTab('demo')}
        >
          <PlayCircle size={15} /> Live Demo
        </button>
        <button
          className={`ds-tab ${tab === 'code' ? 'ds-tab-active' : ''}`}
          onClick={() => setTab('code')}
        >
          <Code2 size={15} /> Source Code
        </button>
      </div>

      {tab === 'demo' && children}

      {tab === 'code' && (
        <div className="demo-page">
          <div className="demo-container">
            <CodeViewer files={files} />

            {setup && (
              <div className="demo-card">
                <p className="demo-card-label"><Terminal size={13} style={{ display: 'inline', marginRight: 6 }} />How to Run</p>
                <div className="ds-setup">
                  {setup.map((step, i) => (
                    <div key={i} className="ds-step">
                      <span className="ds-step-num">{i + 1}</span>
                      <div className="ds-step-body">
                        {step.desc && <p className="ds-step-desc">{step.desc}</p>}
                        {step.cmd  && <pre className="ds-cmd"><code>{step.cmd}</code></pre>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
