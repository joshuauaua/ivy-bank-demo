import { useState } from 'react'
import './Dashboard.css'
import { formatCurrency } from '../utils/currency'
import { useTranslation } from '../i18n'

function Dashboard({ accounts, onAccountClick, onTransferClick }) {
  const { t, locale } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')

  const [transactionFilter, setTransactionFilter] = useState('all')

  const [transactions] = useState([
    { id: 1, date: '2026-07-06', description: 'Amazon Purchase', amount: -89.99, type: 'debit', currency: 'USD' },
    { id: 2, date: '2026-07-05', description: 'Direct Deposit - Salary', amount: 3500.00, type: 'credit', currency: 'USD' },
    { id: 3, date: '2026-07-04', description: 'Starbucks', amount: -12.45, type: 'debit', currency: 'USD' },
    { id: 4, date: '2026-07-03', description: 'Transfer to Savings', amount: -500.00, type: 'transfer', currency: 'USD' },
    { id: 5, date: '2026-07-02', description: 'Grocery Store', amount: -156.78, type: 'debit', currency: 'USD' },
    { id: 6, date: '2026-07-01', description: 'Netflix Subscription', amount: -15.99, type: 'debit', currency: 'USD' },
    { id: 7, date: '2026-06-28', description: 'Gas Station', amount: -45.20, type: 'debit', currency: 'USD' },
    { id: 8, date: '2026-06-25', description: 'Restaurant', amount: -78.50, type: 'debit', currency: 'USD' },
    { id: 9, date: '2026-06-22', description: 'Online Shopping', amount: -234.99, type: 'debit', currency: 'USD' },
    { id: 10, date: '2026-06-20', description: 'Direct Deposit - Salary', amount: 3500.00, type: 'credit', currency: 'USD' },
    { id: 11, date: '2026-06-18', description: 'Utility Bill', amount: -125.00, type: 'debit', currency: 'USD' },
    { id: 12, date: '2026-06-15', description: 'Coffee Shop', amount: -8.75, type: 'debit', currency: 'USD' },
    { id: 13, date: '2026-06-10', description: 'Transfer to Savings', amount: -500.00, type: 'transfer', currency: 'USD' },
    { id: 14, date: '2026-06-08', description: 'Pharmacy', amount: -32.50, type: 'debit', currency: 'USD' },
    { id: 15, date: '2026-06-05', description: 'Direct Deposit - Salary', amount: 3500.00, type: 'credit', currency: 'USD' },
  ])

  // Group balances by currency for multi-currency display
  const balancesByCurrency = accounts.reduce((acc, account) => {
    const currency = account.currency || 'USD'
    acc[currency] = (acc[currency] || 0) + account.balance
    return acc
  }, {})

  const currencies = Object.keys(balancesByCurrency)
  const isMultiCurrency = currencies.length > 1

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
        <h2>{t('welcomeBack', { name: 'John' })}</h2>
        <p className="date">{t('todayIs')} {new Date().toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </header>

      <div className="total-balance-card">
        <div className="total-balance-label">{t('totalBalance')}</div>
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
        <h3>{t('yourAccounts')}</h3>
        <div className="accounts-grid">
          {accounts.map(account => (
            <div
              key={account.id}
              className="account-card"
              onClick={() => onAccountClick(account)}
            >
              <div className="account-type">{t(account.type.toLowerCase())}</div>
              <div className="account-number">{account.accountNumber}</div>
              <div className="account-balance">
                {formatCurrency(account.balance, account.currency)}
              </div>
              <div className="account-available">{t('available')}: {formatCurrency(account.available, account.currency)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="quick-actions">
        <h3>{t('quickActions')}</h3>
        <div className="actions-grid">
          <button className="action-btn" onClick={onTransferClick}>
            <span>{t('transferMoney')}</span>
          </button>
          <button className="action-btn">
            <span>{t('payBills')}</span>
          </button>
          <button className="action-btn">
            <span>{t('mobileDeposit')}</span>
          </button>
          <button className="action-btn">
            <span>{t('viewStatements')}</span>
          </button>
        </div>
      </section>

      <section className="transactions-section">
        <h3>{t('recentTransactions')}</h3>
        <div className="transaction-filters">
          <button
            className={`filter-btn ${transactionFilter === 'all' ? 'active' : ''}`}
            onClick={() => setTransactionFilter('all')}
          >
            {t('all')}
          </button>
          <button
            className={`filter-btn ${transactionFilter === '7days' ? 'active' : ''}`}
            onClick={() => setTransactionFilter('7days')}
          >
            {t('last7Days')}
          </button>
          <button
            className={`filter-btn ${transactionFilter === '30days' ? 'active' : ''}`}
            onClick={() => setTransactionFilter('30days')}
          >
            {t('last30Days')}
          </button>
          <button
            className={`filter-btn ${transactionFilter === 'thisMonth' ? 'active' : ''}`}
            onClick={() => setTransactionFilter('thisMonth')}
          >
            {t('thisMonth')}
          </button>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder={t('searchTransactions')}
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
              return <div className="no-transactions">{t('noTransactionsFound')}</div>
            }

            return finalFiltered.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-details">
                  <div className="transaction-description">{transaction.description}</div>
                  <div className="transaction-date">{transaction.date}</div>
                </div>
                <div className={`transaction-amount ${transaction.type}`}>
                  {formatCurrency(Math.abs(transaction.amount), transaction.currency, transaction.amount > 0)}
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
