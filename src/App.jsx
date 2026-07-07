import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'
import AccountDetails from './components/AccountDetails'
import LoanApplication from './components/LoanApplication'
import UserSettings from './components/UserSettings'

function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedAccount, setSelectedAccount] = useState(null)

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onAccountClick={(account) => {
          setSelectedAccount(account)
          setActiveView('account-details')
        }} />
      case 'account-details':
        return <AccountDetails account={selectedAccount} onBack={() => setActiveView('dashboard')} />
      case 'loan':
        return <LoanApplication onBack={() => setActiveView('dashboard')} />
      case 'settings':
        return <UserSettings onBack={() => setActiveView('dashboard')} />
      default:
        return <Dashboard onAccountClick={(account) => {
          setSelectedAccount(account)
          setActiveView('account-details')
        }} />
    }
  }

  return (
    <div className="app">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  )
}

export default App
