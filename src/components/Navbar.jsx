import { useState } from 'react'
import './Navbar.css'

function Navbar({ activeView, setActiveView }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <button className="logo-button" onClick={() => setActiveView('dashboard')}>
            🏦 Ivy Bank
          </button>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>

        <div className={`navbar-center ${menuOpen ? 'open' : ''}`}>
          <button
            className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => {
              setActiveView('dashboard')
              setMenuOpen(false)
            }}
          >
            <span className="nav-icon">📊</span>
            Dashboard
          </button>
          <button
            className={`nav-item ${activeView === 'loan' ? 'active' : ''}`}
            onClick={() => {
              setActiveView('loan')
              setMenuOpen(false)
            }}
          >
            <span className="nav-icon">💰</span>
            Apply for Loan
          </button>
          <button
            className={`nav-item ${activeView === 'settings' ? 'active' : ''}`}
            onClick={() => {
              setActiveView('settings')
              setMenuOpen(false)
            }}
          >
            <span className="nav-icon">⚙️</span>
            Settings
          </button>
        </div>

        <div className="navbar-right">
          <div className="user-info">
            <div className="avatar">JD</div>
            <div className="user-details">
              <div className="user-name">John Doe</div>
            </div>
          </div>
          <button className="logout-btn" title="Logout">
            <span className="nav-icon">🚪</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
