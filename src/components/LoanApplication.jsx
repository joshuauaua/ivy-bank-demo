import { useState } from 'react'
import './LoanApplication.css'
import { formatCurrency, SUPPORTED_CURRENCIES } from '../utils/currency'
import { useTranslation } from '../i18n'

function LoanApplication({ onBack }) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    loanType: 'personal',
    amount: '',
    purpose: '',
    term: '36',
    employmentStatus: 'employed',
    annualIncome: '',
    currency: 'USD'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Loan application submitted! Our team will review your application within 2-3 business days.')
  }

  return (
    <div className="loan-application">
      <button className="back-btn" onClick={onBack}>
        ← {t('backToDashboard')}
      </button>

      <div className="loan-header">
        <h2>{t('loanApplication')}</h2>
        <p>{t('loanApplicationDesc')}</p>
      </div>

      <div className="loan-types">
        <div className="loan-type-card">
          <h4>{t('personalLoan')}</h4>
          <p>{t('upTo')} {formatCurrency(50000, formData.currency)}</p>
          <p className="rate">{t('aprFrom')} 6.99%</p>
        </div>
        <div className="loan-type-card">
          <h4>{t('autoLoan')}</h4>
          <p>{t('upTo')} {formatCurrency(75000, formData.currency)}</p>
          <p className="rate">{t('aprFrom')} 4.49%</p>
        </div>
        <div className="loan-type-card">
          <h4>{t('homeEquity')}</h4>
          <p>{t('upTo')} {formatCurrency(250000, formData.currency)}</p>
          <p className="rate">{t('aprFrom')} 5.99%</p>
        </div>
      </div>

      <form className="loan-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="loanType">{t('loanType')}</label>
          <select
            id="loanType"
            name="loanType"
            value={formData.loanType}
            onChange={handleChange}
            required
          >
            <option value="personal">{t('personalLoanOption')}</option>
            <option value="auto">{t('autoLoanOption')}</option>
            <option value="home">{t('homeEquityLoan')}</option>
            <option value="business">{t('businessLoan')}</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="currency">{t('currency')}</label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            required
          >
            {Object.values(SUPPORTED_CURRENCIES).map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.name} ({currency.symbol})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">{t('loanAmount')}</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder={t('enterAmount')}
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="purpose">{t('loanPurpose')}</label>
          <textarea
            id="purpose"
            name="purpose"
            placeholder={t('loanPurposeDesc')}
            value={formData.purpose}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="term">{t('loanTerm')}</label>
          <select
            id="term"
            name="term"
            value={formData.term}
            onChange={handleChange}
            required
          >
            <option value="12">12 {t('months')}</option>
            <option value="24">24 {t('months')}</option>
            <option value="36">36 {t('months')}</option>
            <option value="48">48 {t('months')}</option>
            <option value="60">60 {t('months')}</option>
            <option value="84">84 {t('months')}</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="employmentStatus">{t('employmentStatus')}</label>
          <select
            id="employmentStatus"
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            required
          >
            <option value="employed">{t('employedFullTime')}</option>
            <option value="parttime">{t('employedPartTime')}</option>
            <option value="selfemployed">{t('selfEmployed')}</option>
            <option value="retired">{t('retired')}</option>
            <option value="unemployed">{t('unemployed')}</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="annualIncome">{t('annualIncome')}</label>
          <input
            type="number"
            id="annualIncome"
            name="annualIncome"
            placeholder={t('enterAnnualIncome')}
            value={formData.annualIncome}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">{t('submitApplication')}</button>
      </form>
    </div>
  )
}

export default LoanApplication
