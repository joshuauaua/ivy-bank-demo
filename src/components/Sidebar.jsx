import './Sidebar.css'

function Sidebar({ activeView, setActiveView }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">🏦 Ivy Bank</h1>
        <div className="user-info">
          <div className="avatar">JD</div>
          <div className="user-details">
            <div className="user-name">John Doe</div>
            <div className="user-email">john.doe@email.com</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveView('dashboard')}
        >
          <span className="nav-icon">📊</span>
          Dashboard
        </button>
        <button
          className={`nav-item ${activeView === 'transfer' ? 'active' : ''}`}
          onClick={() => setActiveView('transfer')}
        >
          <span className="nav-icon">💸</span>
          Transfers
        </button>
        <button
          className={`nav-item ${activeView === 'loan' ? 'active' : ''}`}
          onClick={() => setActiveView('loan')}
        >
          <span className="nav-icon">💰</span>
          Apply for Loan
        </button>
        <button
          className={`nav-item ${activeView === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveView('settings')}
        >
          <span className="nav-icon">⚙️</span>
          Settings
        </button>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <span className="nav-icon">🚪</span>
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
