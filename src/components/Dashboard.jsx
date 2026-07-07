import { useState } from 'react'
import './Dashboard.css'

function Dashboard({ onAccountClick }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [accounts] = useState([
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

  const [transactionFilter, setTransactionFilter] = useState('all')

  const [transactions] = useState([
    { id: 1, date: '2026-07-06', description: 'Amazon Purchase', amount: -89.99, type: 'debit' },
    { id: 2, date: '2026-07-05', description: 'Direct Deposit - Salary', amount: 3500.00, type: 'credit' },
    { id: 3, date: '2026-07-04', description: 'Starbucks', amount: -12.45, type: 'debit' },
    { id: 4, date: '2026-07-03', description: 'Transfer to Savings', amount: -500.00, type: 'transfer' },
    { id: 5, date: '2026-07-02', description: 'Grocery Store', amount: -156.78, type: 'debit' },
    { id: 6, date: '2026-07-01', description: 'Netflix Subscription', amount: -15.99, type: 'debit' },
    { id: 7, date: '2026-06-28', description: 'Gas Station', amount: -45.20, type: 'debit' },
    { id: 8, date: '2026-06-25', description: 'Restaurant', amount: -78.50, type: 'debit' },
    { id: 9, date: '2026-06-22', description: 'Online Shopping', amount: -234.99, type: 'debit' },
    { id: 10, date: '2026-06-20', description: 'Direct Deposit - Salary', amount: 3500.00, type: 'credit' },
    { id: 11, date: '2026-06-18', description: 'Utility Bill', amount: -125.00, type: 'debit' },
    { id: 12, date: '2026-06-15', description: 'Coffee Shop', amount: -8.75, type: 'debit' },
    { id: 13, date: '2026-06-10', description: 'Transfer to Savings', amount: -500.00, type: 'transfer' },
    { id: 14, date: '2026-06-08', description: 'Pharmacy', amount: -32.50, type: 'debit' },
    { id: 15, date: '2026-06-05', description: 'Direct Deposit - Salary', amount: 3500.00, type: 'credit' },
  ])

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)

  const filteredTransactions = transactions.filter(transaction => {
    if (transactionFilter === 'all') return true

    const transactionDate = new Date(transaction.date)
    const today = new Date('2026-07-07') // Current date from firmware

    if (transactionFilter === '7days') {
      const sevenDaysAgo = new Date(today)
      sevenDaysAgo.setDate(today.getDate() - 7)
      return transactionDate >= sevenDaysAgo
    }

    if (transactionFilter === '30days') {
      const thirtyDaysAgo = new Date(today)
      thirtyDaysAgo.setDate(today.getDate() - 30)
      return transactionDate >= thirtyDaysAgo
    }

    if (transactionFilter === 'thisMonth') {
      return transactionDate.getMonth() === today.getMonth() &&
             transactionDate.getFullYear() === today.getFullYear()
    }

    return true
  })

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Welcome back, John!</h2>
        <p className="date">Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </header>

      <div className="total-balance-card">
        <div className="total-balance-label">Total Balance</div>
        <div className="total-balance-amount">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
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
                ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="account-available">Available: ${account.available.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
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
        <div className="transaction-filters">
          <button
            className={`filter-btn ${transactionFilter === 'all' ? 'active' : ''}`}
            onClick={() => setTransactionFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${transactionFilter === '7days' ? 'active' : ''}`}
            onClick={() => setTransactionFilter('7days')}
          >
            Last 7 Days
          </button>
          <button
            className={`filter-btn ${transactionFilter === '30days' ? 'active' : ''}`}
            onClick={() => setTransactionFilter('30days')}
          >
            Last 30 Days
          </button>
          <button
            className={`filter-btn ${transactionFilter === 'thisMonth' ? 'active' : ''}`}
            onClick={() => setTransactionFilter('thisMonth')}
          >
            This Month
          </button>
        </div>
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
            // Apply both time filter and search query
            const timeFiltered = filteredTransactions
            const finalFiltered = searchQuery
              ? timeFiltered.filter(transaction =>
                  transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
              : timeFiltered

            if (finalFiltered.length === 0) {
              return <div className="no-transactions">No transactions found</div>
            }

            return finalFiltered.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-icon">
                  {transaction.type === 'credit' ? '💰' : transaction.type === 'transfer' ? '🔄' : '💳'}
                </div>
                <div className="transaction-details">
                  <div className="transaction-description">{transaction.description}</div>
                  <div className="transaction-date">{transaction.date}</div>
                </div>
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
