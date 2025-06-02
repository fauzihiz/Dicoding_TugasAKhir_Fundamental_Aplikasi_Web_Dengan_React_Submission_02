import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../src/contexts/AuthContext";
import { useLanguage } from "../src/contexts/LanguageContext";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

function Nav() {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { getText } = useLanguage();

  // Handler untuk logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav id="nav">
      <div className="nav-links">
        <Link to='/note' className="nav-link">
          <h2>{getText('activeNotes')}</h2>
        </Link>
        
        {/* Link tambah catatan (hanya tampil jika bukan di halaman add) */}
        {location.pathname !== "/add" && (
          <Link to='/add' className="nav-link">
            <h2>{getText('addNote')}</h2>
          </Link>
        )}
        
        <Link to='/arsip' className="nav-link">
          <h2>{getText('archivedNotes')}</h2>
        </Link>
      </div>

      <div className="nav-controls">
        <div className="nav-toggle">
          <ThemeToggle />
          <LanguageToggle />
        </div>

        <button onClick={handleLogout} className="logout-btn">
          {getText('logout')}
        </button>
      </div>
    </nav>
  );
}

export default Nav;