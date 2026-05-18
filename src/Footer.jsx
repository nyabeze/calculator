import React from "react";
import {
  Compass,
  Heart,
  Clock,
  User
} from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Desktop footer */}
      <div className="footer-desktop">
        <p>© {new Date().getFullYear()} Dzimba. All rights reserved.</p>
      </div>

      {/* Mobile bottom nav */}
      <nav className="footer-mobile">
        <button className="footer-item active">
          <Compass size={22} />
          <span>Explore</span>
        </button>

        <button className="footer-item">
          <Heart size={22} />
          <span>Wishlist</span>
        </button>

        <button className="footer-item">
          <Clock size={22} />
          <span>History</span>
        </button>

        <button className="footer-item">
          <User size={22} />
          <span>Profile</span>
        </button>
      </nav>
    </footer>
  );
};

export default Footer;