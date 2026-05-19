import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('python', python);

export default function CodeViewer({ files }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(files[active].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cv-wrap">
      {files.length > 1 && (
        <div className="cv-tabs">
          {files.map((f, i) => (
            <button key={f.name} className={`cv-tab ${i === active ? 'cv-tab-active' : ''}`} onClick={() => setActive(i)}>
              {f.name}
            </button>
          ))}
        </div>
      )}

      <div className="cv-header">
        <span className="cv-filename">{files[active].name}</span>
        <button className="pm-icon-btn" onClick={copy} title="Copy code">
          {copied ? <Check size={14} color="#4caf50" /> : <Copy size={14} />}
        </button>
      </div>

      <SyntaxHighlighter
        language="python"
        style={vscDarkPlus}
        customStyle={{ margin: 0, borderRadius: '0 0 10px 10px', fontSize: '0.82rem', lineHeight: '1.6', maxHeight: '520px', background: '#0d0d0d' }}
        showLineNumbers
        lineNumberStyle={{ color: '#3a3a3a', fontSize: '0.75rem' }}
      >
        {files[active].code}
      </SyntaxHighlighter>
    </div>
  );
}
