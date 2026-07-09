import './Sidebar.css'
import { useTranslation } from '../i18n'

function Sidebar({ activeView, setActiveView }) {
  const { t } = useTranslation()
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">
          <button className="logo-button" onClick={() => setActiveView('dashboard')}>
            Ivy Bank
          </button>
        </h1>
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
          {t('dashboard')}
        </button>
        <button
          className={`nav-item ${activeView === 'transfer' ? 'active' : ''}`}
          onClick={() => setActiveView('transfer')}
        >
          <span className="nav-icon">💸</span>
          {t('transfers')}
        </button>
        <button
          className={`nav-item ${activeView === 'loan' ? 'active' : ''}`}
          onClick={() => setActiveView('loan')}
        >
          {t('applyForLoan')}
        </button>
        <button
          className={`nav-item ${activeView === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveView('settings')}
        >
          {t('settings')}
        </button>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
          {t('logout')}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
