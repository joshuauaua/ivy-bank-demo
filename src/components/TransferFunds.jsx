import { useState } from 'react'
import './TransferFunds.css'
import { formatCurrency } from '../utils/currency'

function TransferFunds({ accounts, setAccounts, onBack }) {
  const [fromAccountId, setFromAccountId] = useState('')
  const [toAccountId, setToAccountId] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [transferDetails, setTransferDetails] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validation
    if (!fromAccountId || !toAccountId) {
      setError('Please select both source and destination accounts')
      return
    }

    if (fromAccountId === toAccountId) {
      setError('Source and destination accounts must be different')
      return
    }

    const transferAmount = parseFloat(amount)
    if (isNaN(transferAmount) || transferAmount <= 0) {
      setError('Please enter a valid amount greater than 0')
      return
    }

    const fromAccount = accounts.find(acc => acc.id.toString() === fromAccountId)
    if (transferAmount > fromAccount.available) {
      setError(`Insufficient funds. Available balance: ${formatCurrency(fromAccount.available, 'USD')}`)
      return
    }

    // Perform transfer
    const toAccount = accounts.find(acc => acc.id.toString() === toAccountId)
    const updatedAccounts = accounts.map(acc => {
      if (acc.id.toString() === fromAccountId) {
        return {
          ...acc,
          balance: acc.balance - transferAmount,
          available: acc.available - transferAmount
        }
      }
      if (acc.id.toString() === toAccountId) {
        return {
          ...acc,
          balance: acc.balance + transferAmount,
          available: acc.available + transferAmount
        }
      }
      return acc
    })

    setAccounts(updatedAccounts)
    setTransferDetails({
      from: fromAccount,
      to: toAccount,
      amount: transferAmount,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    })
    setSuccess(true)
    setFromAccountId('')
    setToAccountId('')
    setAmount('')
  }

  return (
    <div className="transfer-funds">
      <button className="back-btn" onClick={onBack}>
        ← Back to Dashboard
      </button>

      <div className="transfer-header">
        <h2>Transfer Money</h2>
        <p className="transfer-subtitle">Move money between your accounts</p>
      </div>

      {success && transferDetails && (
        <div className="success-message" role="status" aria-live="polite">
          <div className="success-icon" aria-hidden="true">✓</div>
          <h3>Transfer Successful!</h3>
          <div className="transfer-summary">
            <p><strong>{formatCurrency(transferDetails.amount, 'USD')}</strong> transferred</p>
            <p>From: {transferDetails.from.type} ({transferDetails.from.accountNumber})</p>
            <p>To: {transferDetails.to.type} ({transferDetails.to.accountNumber})</p>
            <p className="transfer-date">{transferDetails.date}</p>
          </div>
        </div>
      )}

      <div className="transfer-form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="from-account">From Account</label>
            <select
              id="from-account"
              value={fromAccountId}
              onChange={(e) => setFromAccountId(e.target.value)}
              className="form-select"
            >
              <option value="">Select source account</option>
              {accounts.map(account => (
                <option key={account.id} value={account.id}>
                  {account.type} ({account.accountNumber}) - Available: {formatCurrency(account.available, 'USD')}
                </option>
              ))}
            </select>
          </div>

          <div className="transfer-arrow" aria-hidden="true">↓</div>

          <div className="form-group">
            <label htmlFor="to-account">To Account</label>
            <select
              id="to-account"
              value={toAccountId}
              onChange={(e) => setToAccountId(e.target.value)}
              className="form-select"
            >
              <option value="">Select destination account</option>
              {accounts.map(account => (
                <option key={account.id} value={account.id}>
                  {account.type} ({account.accountNumber})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <div className="amount-input-wrapper">
              <span className="currency-symbol" aria-hidden="true">$</span>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0.01"
                className="form-input amount-input"
              />
            </div>
          </div>

          {error && (
            <div className="error-message" role="alert" aria-live="assertive">
              {error}
            </div>
          )}

          <button type="submit" className="submit-btn">
            Transfer Funds
          </button>
        </form>
      </div>
    </div>
  )
}

export default TransferFunds
