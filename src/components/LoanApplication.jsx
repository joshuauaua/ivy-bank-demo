import { useState, useEffect } from 'react'
import './LoanApplication.css'
import { formatCurrency, SUPPORTED_CURRENCIES } from '../utils/currency'
import { useTranslation } from '../i18n'

const LOAN_CONFIG = {
  personal: { minAmount: 1000, maxAmount: 50000, stepAmount: 500, minTerm: 12, maxTerm: 60, rate: 6.99 },
  auto:     { minAmount: 5000, maxAmount: 75000, stepAmount: 1000, minTerm: 12, maxTerm: 84, rate: 4.49 },
  home:     { minAmount: 10000, maxAmount: 250000, stepAmount: 5000, minTerm: 60, maxTerm: 360, rate: 5.99 },
  business: { minAmount: 5000, maxAmount: 100000, stepAmount: 1000, minTerm: 12, maxTerm: 84, rate: 7.49 }
}

function LoanApplication({ onBack }) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    loanType: 'personal',
    amount: 25000,
    purpose: '',
    term: 36,
    employmentStatus: 'employed',
    annualIncome: '',
    currency: 'USD'
  })

  useEffect(() => {
    const config = LOAN_CONFIG[formData.loanType]
    const midAmount = Math.floor((config.minAmount + config.maxAmount) / 2)
    const midTerm = Math.floor((config.minTerm + config.maxTerm) / 2)
    setFormData(prev => ({
      ...prev,
      amount: midAmount,
      term: midTerm
    }))
  }, [formData.loanType])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const calculateMonthlyPayment = () => {
    const config = LOAN_CONFIG[formData.loanType]
    const P = parseFloat(formData.amount)
    const r = (config.rate / 100) / 12
    const n = parseFloat(formData.term)

    if (P && r && n) {
      const monthlyPayment = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      return monthlyPayment
    }
    return 0
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
          <div className="slider-group">
            <input
              type="range"
              id="amount"
              name="amount"
              min={LOAN_CONFIG[formData.loanType].minAmount}
              max={LOAN_CONFIG[formData.loanType].maxAmount}
              step={LOAN_CONFIG[formData.loanType].stepAmount}
              value={formData.amount}
              onChange={handleChange}
              required
            />
            <div className="slider-labels">
              <span>{formatCurrency(LOAN_CONFIG[formData.loanType].minAmount, formData.currency)}</span>
              <span className="slider-value">{formatCurrency(formData.amount, formData.currency)}</span>
              <span>{formatCurrency(LOAN_CONFIG[formData.loanType].maxAmount, formData.currency)}</span>
            </div>
          </div>
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
          <div className="slider-group">
            <input
              type="range"
              id="term"
              name="term"
              min={LOAN_CONFIG[formData.loanType].minTerm}
              max={LOAN_CONFIG[formData.loanType].maxTerm}
              step="12"
              value={formData.term}
              onChange={handleChange}
              required
            />
            <div className="slider-labels">
              <span>{LOAN_CONFIG[formData.loanType].minTerm} mo</span>
              <span className="slider-value">{formData.term} mo</span>
              <span>{LOAN_CONFIG[formData.loanType].maxTerm} mo</span>
            </div>
          </div>
        </div>

        <div className="payment-estimate">
          <span>{t('estimatedMonthlyPayment')}</span>
          <span className="estimate-value">{formatCurrency(calculateMonthlyPayment(), formData.currency)}</span>
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
