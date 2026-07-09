import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import AccountDetails from './components/AccountDetails'
import LoanApplication from './components/LoanApplication'
import UserSettings from './components/UserSettings'
import { ThemeProvider } from './context/ThemeContext'
import TransferFunds from './components/TransferFunds'

function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedAccount, setSelectedAccount] = useState(null)
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
      <div className="app">
        <Navbar activeView={activeView} setActiveView={setActiveView} />
        <main className="main-content">
          {renderView()}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
