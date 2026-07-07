import { useState } from 'react'
import './Dashboard.css'
import { formatCurrency } from '../utils/currency'

function Dashboard({ accounts, onAccountClick, onTransferClick }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(6)

  const [transactions] = useState([
    { id: 1, date: '2026-07-06', description: 'Amazon Purchase', amount: -89.99, type: 'debit', currency: 'USD' },
    { id: 2, date: '2026-07-05', description: 'Direct Deposit - Salary', amount: 3500.00, type: 'credit', currency: 'USD' },
    { id: 3, date: '2026-07-04', description: 'Starbucks', amount: -12.45, type: 'debit', currency: 'USD' },
    { id: 4, date: '2026-07-03', description: 'Transfer to Savings', amount: -500.00, type: 'transfer', currency: 'USD' },
    { id: 5, date: '2026-07-02', description: 'Grocery Store', amount: -156.78, type: 'debit', currency: 'USD' },
    { id: 6, date: '2026-07-01', description: 'Netflix Subscription', amount: -15.99, type: 'debit', currency: 'USD' },
    { id: 7, date: '2026-06-30', description: 'Electric Bill Payment', amount: -125.50, type: 'debit', currency: 'USD' },
    { id: 8, date: '2026-06-29', description: 'Restaurant Dinner', amount: -78.25, type: 'debit', currency: 'USD' },
    { id: 9, date: '2026-06-28', description: 'ATM Withdrawal', amount: -100.00, type: 'debit', currency: 'USD' },
    { id: 10, date: '2026-06-27', description: 'Spotify Subscription', amount: -9.99, type: 'debit', currency: 'USD' },
    { id: 11, date: '2026-06-26', description: 'Gas Station', amount: -55.00, type: 'debit', currency: 'USD' },
    { id: 12, date: '2026-06-25', description: 'Pharmacy', amount: -34.50, type: 'debit', currency: 'USD' },
    { id: 13, date: '2026-06-24', description: 'Gym Membership', amount: -45.00, type: 'debit', currency: 'USD' },
    { id: 14, date: '2026-06-23', description: 'Online Course Payment', amount: -199.99, type: 'debit', currency: 'USD' },
    { id: 15, date: '2026-06-22', description: 'Freelance Payment Received', amount: 850.00, type: 'credit', currency: 'USD' },
    { id: 16, date: '2026-06-21', description: 'Water Bill', amount: -42.30, type: 'debit', currency: 'USD' },
    { id: 17, date: '2026-06-20', description: 'Coffee Shop', amount: -8.75, type: 'debit', currency: 'USD' },
    { id: 18, date: '2026-06-19', description: 'Movie Tickets', amount: -28.00, type: 'debit', currency: 'USD' },
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
          <button className="action-btn" onClick={onTransferClick}>
            <span>Transfer Money</span>
          </button>
          <button className="action-btn">
            <span>Pay Bills</span>
          </button>
          <button className="action-btn">
            <span>Mobile Deposit</span>
          </button>
          <button className="action-btn">
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

            return filteredTransactions.slice(0, visibleCount).map(transaction => (
              <div key={transaction.id} className="transaction-item">
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
        {!searchQuery && visibleCount < transactions.length && (
          <button
            className="load-more-btn"
            onClick={() => setVisibleCount(prev => Math.min(prev + 5, transactions.length))}
          >
            Load More
          </button>
        )}
      </section>
    </div>
  )
}

export default Dashboard
