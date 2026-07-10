import { useState } from 'react'
import './Dashboard.css'
import { formatCurrency } from '../utils/currency'
import { useTranslation } from '../i18n'
import { dashboardTransactions } from '../data/transactions'

function Dashboard({ accounts, onAccountClick, onTransferClick }) {
  const { t, locale } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(6)

  const [transactionFilter, setTransactionFilter] = useState('all')

  const [transactions] = useState(dashboardTransactions)

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

            // Apply load-more slicing when search is not active
            const displayedTransactions = searchQuery 
              ? finalFiltered 
              : finalFiltered.slice(0, visibleCount)

            return displayedTransactions.map(transaction => (
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
        {!searchQuery && transactionFilter === 'all' && visibleCount < transactions.length && (
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
