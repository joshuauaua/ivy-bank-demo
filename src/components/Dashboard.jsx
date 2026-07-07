import { useState } from 'react'
import './Dashboard.css'
import { formatCurrency } from '../utils/currency'

function Dashboard({ onAccountClick }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [accounts] = useState([
    {
      id: 1,
      type: 'Checking',
      accountNumber: '****4521',
      balance: 12543.67,
      available: 12543.67,
      currency: 'USD'
    },
    {
      id: 2,
      type: 'Savings',
      accountNumber: '****8732',
      balance: 45230.12,
      available: 45230.12,
      currency: 'EUR'
    }
  ])

  const [transactions] = useState([
    { id: 1, date: '2026-07-06', description: 'Amazon Purchase', amount: -89.99, type: 'debit', currency: 'USD' },
    { id: 2, date: '2026-07-05', description: 'Direct Deposit - Salary', amount: 3500.00, type: 'credit', currency: 'USD' },
    { id: 3, date: '2026-07-04', description: 'Starbucks', amount: -12.45, type: 'debit', currency: 'USD' },
    { id: 4, date: '2026-07-03', description: 'Transfer to Savings', amount: -500.00, type: 'transfer', currency: 'USD' },
    { id: 5, date: '2026-07-02', description: 'Grocery Store', amount: -156.78, type: 'debit', currency: 'USD' },
    { id: 6, date: '2026-07-01', description: 'Netflix Subscription', amount: -15.99, type: 'debit', currency: 'USD' },
  ])

  // Group balances by currency for multi-currency display
  const balancesByCurrency = accounts.reduce((acc, account) => {
    const currency = account.currency || 'USD'
    acc[currency] = (acc[currency] || 0) + account.balance
    return acc
  }, {})

  const currencies = Object.keys(balancesByCurrency)
  const isMultiCurrency = currencies.length > 1

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Welcome back, John!</h2>
        <p className="date">Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </header>

      <div className="total-balance-card">
        <div className="total-balance-label">Total Balance</div>
        {isMultiCurrency ? (
          <div className="total-balance-amount">
            {currencies.map((currency, index) => (
              <span key={currency}>
                {formatCurrency(balancesByCurrency[currency], currency)}
                {index < currencies.length - 1 && ' | '}
              </span>
            ))}
          </div>
        ) : (
          <div className="total-balance-amount">
            {formatCurrency(balancesByCurrency[currencies[0]], currencies[0])}
          </div>
        )}
      </div>

      <section className="accounts-section">
        <h3>Your Accounts</h3>
        <div className="accounts-grid">
          {accounts.map(account => (
            <div
              key={account.id}
              className="account-card"
              onClick={() => onAccountClick(account)}
            >
              <div className="account-type">{account.type}</div>
              <div className="account-number">{account.accountNumber}</div>
              <div className="account-balance">
                {formatCurrency(account.balance, account.currency)}
              </div>
              <div className="account-available">Available: {formatCurrency(account.available, account.currency)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-btn">
            <span className="action-icon">💸</span>
            <span>Transfer Money</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">💳</span>
            <span>Pay Bills</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">📱</span>
            <span>Mobile Deposit</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">📄</span>
            <span>View Statements</span>
          </button>
        </div>
      </section>

      <section className="transactions-section">
        <h3>Recent Transactions</h3>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="transactions-list">
          {(() => {
            const filteredTransactions = searchQuery
              ? transactions.filter(transaction =>
                  transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
              : transactions

            if (filteredTransactions.length === 0) {
              return <div className="no-transactions">No transactions found</div>
            }

            return filteredTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-icon">
                  {transaction.type === 'credit' ? '💰' : transaction.type === 'transfer' ? '🔄' : '💳'}
                </div>
                <div className="transaction-details">
                  <div className="transaction-description">{transaction.description}</div>
                  <div className="transaction-date">{transaction.date}</div>
                </div>
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount), transaction.currency)}
                </div>
              </div>
            ))
          })()}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
