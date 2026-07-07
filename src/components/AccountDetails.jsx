import './AccountDetails.css'
import { formatCurrency } from '../utils/currency'

function AccountDetails({ account, onBack }) {
  const recentTransactions = [
    { id: 1, date: '2026-07-06', description: 'Amazon Purchase', amount: -89.99, balance: 12543.67 },
    { id: 2, date: '2026-07-05', description: 'Direct Deposit - Salary', amount: 3500.00, balance: 12633.66 },
    { id: 3, date: '2026-07-04', description: 'Starbucks', amount: -12.45, balance: 9133.66 },
    { id: 4, date: '2026-07-03', description: 'ATM Withdrawal', amount: -100.00, balance: 9146.11 },
    { id: 5, date: '2026-07-02', description: 'Grocery Store', amount: -156.78, balance: 9246.11 },
    { id: 6, date: '2026-07-01', description: 'Netflix Subscription', amount: -15.99, balance: 9402.89 },
    { id: 7, date: '2026-06-30', description: 'Restaurant', amount: -65.50, balance: 9418.88 },
    { id: 8, date: '2026-06-29', description: 'Gas Station', amount: -45.00, balance: 9484.38 },
  ]

  return (
    <div className="account-details">
      <button className="back-btn" onClick={onBack}>
        ← Back to Dashboard
      </button>

      <div className="account-header">
        <h2>{account.type} Account</h2>
        <p className="account-number-full">Account Number: {account.accountNumber}</p>
      </div>

      <div className="account-summary">
        <div className="summary-card">
          <div className="summary-label">Current Balance</div>
          <div className="summary-amount">
            {formatCurrency(account.balance, account.currency)}
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Available Balance</div>
          <div className="summary-amount">
            {formatCurrency(account.available, account.currency)}
          </div>
        </div>
      </div>

      <div className="account-actions">
        <button className="action-btn-primary">Transfer</button>
        <button className="action-btn-secondary">Download Statement</button>
        <button className="action-btn-secondary">Order Checks</button>
      </div>

      <section className="account-transactions">
        <h3>Transaction History</h3>
        <div className="transactions-table">
          <div className="table-header">
            <div className="col-date">Date</div>
            <div className="col-description">Description</div>
            <div className="col-amount">Amount</div>
            <div className="col-balance">Balance</div>
          </div>
          {recentTransactions.map(transaction => (
            <div key={transaction.id} className="table-row">
              <div className="col-date">{transaction.date}</div>
              <div className="col-description">{transaction.description}</div>
              <div className={`col-amount ${transaction.amount < 0 ? 'negative' : 'positive'}`}>
                {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount), account.currency)}
              </div>
              <div className="col-balance">
                {formatCurrency(transaction.balance, account.currency)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AccountDetails
