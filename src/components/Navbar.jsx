import { useState } from 'react'
import './Navbar.css'

function Navbar({ activeView, setActiveView, onLogoClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleHamburgerKeyDown = (e) => {
    if (e.key === 'Escape' && menuOpen) {
      setMenuOpen(false)
    }
  }

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-content">
        <div className="navbar-left">
          <button className="logo-button" onClick={onLogoClick || (() => setActiveView('dashboard'))}>
            🏦 Ivy Bank
          </button>
        </div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          onKeyDown={handleHamburgerKeyDown}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <div className={`navbar-center ${menuOpen ? 'open' : ''}`}>
          <button
            className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => {
              setActiveView('dashboard')
              setMenuOpen(false)
            }}
            aria-current={activeView === 'dashboard' ? 'page' : undefined}
          >
            <span className="nav-icon" aria-hidden="true">📊</span>
            Dashboard
          </button>
          <button
            className={`nav-item ${activeView === 'loan' ? 'active' : ''}`}
            onClick={() => {
              setActiveView('loan')
              setMenuOpen(false)
            }}
            aria-current={activeView === 'loan' ? 'page' : undefined}
          >
            <span className="nav-icon" aria-hidden="true">💰</span>
            Apply for Loan
          </button>
          <button
            className={`nav-item ${activeView === 'settings' ? 'active' : ''}`}
            onClick={() => {
              setActiveView('settings')
              setMenuOpen(false)
            }}
            aria-current={activeView === 'settings' ? 'page' : undefined}
          >
            <span className="nav-icon" aria-hidden="true">⚙️</span>
            Settings
          </button>
          <button
            className={`nav-item ${activeView === 'contact' ? 'active' : ''}`}
            onClick={() => {
              setActiveView('contact')
              setMenuOpen(false)
            }}
            aria-current={activeView === 'contact' ? 'page' : undefined}
          >
            <span className="nav-icon" aria-hidden="true">📞</span>
            Contact
          </button>
        </div>

        <div className="navbar-right">
          <div className="user-info">
            <div className="avatar" aria-hidden="true">JD</div>
            <div className="user-details">
              <div className="user-name">John Doe</div>
            </div>
          </div>
          <button className="logout-btn" aria-label="Logout">
            <span className="nav-icon" aria-hidden="true">🚪</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
