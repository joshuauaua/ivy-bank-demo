import './AccountDetails.css'
import { formatCurrency } from '../utils/currency'
import { useTranslation } from '../i18n'
import { accountDetailsTransactions } from '../data/transactions'

function AccountDetails({ account, onBack, onTransferClick }) {
  const { t } = useTranslation()
  const recentTransactions = accountDetailsTransactions

  const downloadCSV = () => {
    const headers = 'Date,Description,Amount,Balance\n'
    const rows = recentTransactions.map(transaction => {
      const description = `"${transaction.description.replace(/"/g, '""')}"`
      return `${transaction.date},${description},${transaction.amount},${transaction.balance}`
    }).join('\n')

    const csvContent = headers + rows
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)

    const today = new Date().toISOString().split('T')[0]
    const filename = `${account.type}_Statement_${today}.csv`

    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()

    URL.revokeObjectURL(url)
  }

  return (
    <div className="account-details">
      <button className="back-btn" onClick={onBack}>
        ← {t('backToDashboard')}
      </button>

      <div className="account-header">
        <h2>{t(account.type.toLowerCase())} {t('account')}</h2>
        <p className="account-number-full">{t('accountNumber')}: {account.accountNumber}</p>
      </div>

      <div className="account-summary">
        <div className="summary-card">
          <div className="summary-label">{t('currentBalance')}</div>
          <div className="summary-amount">
            {formatCurrency(account.balance, account.currency)}
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-label">{t('availableBalance')}</div>
          <div className="summary-amount">
            {formatCurrency(account.available, account.currency)}
          </div>
        </div>
      </div>

      <div className="account-actions">
        <button className="action-btn-primary" onClick={onTransferClick}>{t('transfer')}</button>
        <button className="action-btn-secondary" onClick={downloadCSV}>{t('downloadStatement')}</button>
        <button className="action-btn-secondary">{t('orderChecks')}</button>
      </div>

      <section className="account-transactions">
        <h3>{t('transactionHistory')}</h3>
        <table className="transactions-table">
          <thead>
            <tr className="table-header">
              <th scope="col" className="col-date">{t('date')}</th>
              <th scope="col" className="col-description">{t('description')}</th>
              <th scope="col" className="col-amount">{t('amount')}</th>
              <th scope="col" className="col-balance">{t('balance')}</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map(transaction => (
              <tr key={transaction.id} className="table-row">
                <td className="col-date">{transaction.date}</td>
                <td className="col-description">{transaction.description}</td>
                <td className={`col-amount ${transaction.amount < 0 ? 'negative' : 'positive'}`}>
                  {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount), account.currency)}
                </td>
                <td className="col-balance">
                  {formatCurrency(transaction.balance, account.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default AccountDetails
