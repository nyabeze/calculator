import { useState } from "react";
import "./Navbar.css";
import { Home, Key, Building2, Menu, X, UserPlus } from "lucide-react";

const Navbar = () => {
  const [active, setActive] = useState("rent");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo">
        <Home size={20} />
        <span>Dzimba</span>
      </div>

      {/* CENTER PILL */}
      <div className="nav-center">
        <div className="pill-container">
          <span className={`pill ${active === "buy" ? "right" : ""}`} />

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

      {/* DESKTOP RIGHT */}
      <div className="nav-right desktop-only">
        <button className="lister-btn">
          <UserPlus size={18} />
          <span>Become a Property Lister</span>
        </button>
        <button className="login">Login</button>
        <button className="signup">Sign up</button>
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        className="menu-btn mobile-only"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="mobile-menu">
          <button className="mobile-link">Login</button>
          <button className="mobile-link">Sign up</button>
          <hr />
          <button className="mobile-link lister-mobile">
            <UserPlus size={18} />
            <span>Become a Property Lister</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;