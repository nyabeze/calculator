import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './portfolio.css';

export default function ProjectWrapper({ title, children }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="pw-bar">
        <button className="pw-back" onClick={() => navigate('/')}>
          <ArrowLeft size={15} />
          Back to Portfolio
        </button>
        <span className="pw-sep">·</span>
        <span className="pw-name">{title}</span>
      </div>
      <div className="pw-body">{children}</div>
    </>
  );
}
