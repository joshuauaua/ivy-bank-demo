import { useState, useEffect, useRef } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import AccountDetails from './components/AccountDetails'
import LoanApplication from './components/LoanApplication'
import UserSettings from './components/UserSettings'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './i18n/LanguageContext'
import TransferFunds from './components/TransferFunds'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedAccount, setSelectedAccount] = useState(null)
  const mainRef = useRef(null)
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      type: 'Checking',
      accountNumber: '****4521',
      balance: 12543.67,
      available: 12543.67
    },
    {
      id: 2,
      type: 'Savings',
      accountNumber: '****8732',
      balance: 45230.12,
      available: 45230.12
    }
  ])

  // Move focus to main content on view change for screen reader context
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.focus()
    }
  }, [activeView])

  const navigateHome = () => {
    setActiveView('dashboard')
    setSelectedAccount(null)
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard
          accounts={accounts}
          onAccountClick={(account) => {
            setSelectedAccount(account)
            setActiveView('account-details')
          }}
          onTransferClick={() => setActiveView('transfer')}
        />
      case 'account-details':
        return <AccountDetails
          account={selectedAccount}
          onBack={() => setActiveView('dashboard')}
          onTransferClick={() => setActiveView('transfer')}
        />
      case 'transfer':
        return <TransferFunds
          accounts={accounts}
          setAccounts={setAccounts}
          onBack={() => setActiveView('dashboard')}
        />
      case 'loan':
        return <LoanApplication onBack={() => setActiveView('dashboard')} />
      case 'settings':
        return <UserSettings onBack={() => setActiveView('dashboard')} />
      case 'contact':
        return <Contact onBack={() => setActiveView('dashboard')} />
      default:
        return <Dashboard
          accounts={accounts}
          onAccountClick={(account) => {
            setSelectedAccount(account)
            setActiveView('account-details')
          }}
          onTransferClick={() => setActiveView('transfer')}
        />
    }
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app">
          <a href="#main-content" className="sr-only skip-link">Skip to main content</a>
          <Navbar activeView={activeView} setActiveView={setActiveView} onLogoClick={navigateHome} />
          <main
            id="main-content"
            className="main-content"
            ref={mainRef}
            tabIndex={-1}
          >
            {renderView()}
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
