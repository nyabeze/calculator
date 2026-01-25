import { useState } from "react";
import "./Navbar.css";
import { Home, Key, Building2 } from "lucide-react";

const Navbar = () => {
  const [active, setActive] = useState("rent");

  return (
    <nav className="navbar">
      <div className="logo">
        <div className="logo-icon">
          <Home size={20} />
        </div>
        <span>Dzimba</span>
      </div>
      <div className="nav-center">
        <div className="pill-container">
          <span
            className={`pill ${active === "buy" ? "right" : ""}`}
          />

          <button
            className={`pill-btn ${active === "rent" ? "active" : ""}`}
            onClick={() => setActive("rent")}
          >
            <Key size={16} />
            <span>Rent</span>
          </button>

          <button
            className={`pill-btn ${active === "buy" ? "active" : ""}`}
            onClick={() => setActive("buy")}
          >
            <Building2 size={16} />
            <span>Buy</span>
          </button>

        </div>
      </div>

      <div className="nav-right">
        <button className="login">Login</button>
        <button className="signup">Sign up</button>
      </div>
    </nav>
  );
};

export default Navbar;