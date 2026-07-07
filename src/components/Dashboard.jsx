import { useState } from 'react'
import './Dashboard.css'

function Dashboard({ onAccountClick }) {
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

  const [transactions] = useState([
    { id: 1, date: '2026-07-06', description: 'Amazon Purchase', amount: -89.99, type: 'debit' },
    { id: 2, date: '2026-07-05', description: 'Direct Deposit - Salary', amount: 3500.00, type: 'credit' },
    { id: 3, date: '2026-07-04', description: 'Starbucks', amount: -12.45, type: 'debit' },
    { id: 4, date: '2026-07-03', description: 'Transfer to Savings', amount: -500.00, type: 'transfer' },
    { id: 5, date: '2026-07-02', description: 'Grocery Store', amount: -156.78, type: 'debit' },
    { id: 6, date: '2026-07-01', description: 'Netflix Subscription', amount: -15.99, type: 'debit' },
  ])

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)

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
        <div className="transactions-list">
          {transactions.map(transaction => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-details">
                <div className="transaction-description">{transaction.description}</div>
                <div className="transaction-date">{transaction.date}</div>
              </div>
              <div className={`transaction-amount ${transaction.type}`}>
                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
