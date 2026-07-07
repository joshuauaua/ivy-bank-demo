import { useState } from 'react'
import './LoanApplication.css'

function LoanApplication({ onBack }) {
  const [formData, setFormData] = useState({
    loanType: 'personal',
    amount: '',
    purpose: '',
    term: '36',
    employmentStatus: 'employed',
    annualIncome: ''
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
        ← Back to Dashboard
      </button>

      <div className="loan-header">
        <h2>Apply for a Loan</h2>
        <p>Complete the form below to apply for a loan. We'll review your application and get back to you within 2-3 business days.</p>
      </div>

      <div className="loan-types">
        <div className="loan-type-card">
          <h4>Personal Loan</h4>
          <p>Up to $50,000</p>
          <p className="rate">APR from 6.99%</p>
        </div>
        <div className="loan-type-card">
          <h4>Auto Loan</h4>
          <p>Up to $75,000</p>
          <p className="rate">APR from 4.49%</p>
        </div>
        <div className="loan-type-card">
          <h4>Home Equity</h4>
          <p>Up to $250,000</p>
          <p className="rate">APR from 5.99%</p>
        </div>
      </div>

      <form className="loan-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="loanType">Loan Type</label>
          <select
            id="loanType"
            name="loanType"
            value={formData.loanType}
            onChange={handleChange}
            required
          >
            <option value="personal">Personal Loan</option>
            <option value="auto">Auto Loan</option>
            <option value="home">Home Equity Loan</option>
            <option value="business">Business Loan</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Loan Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="purpose">Loan Purpose</label>
          <textarea
            id="purpose"
            name="purpose"
            placeholder="Describe the purpose of this loan"
            value={formData.purpose}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="term">Loan Term</label>
          <select
            id="term"
            name="term"
            value={formData.term}
            onChange={handleChange}
            required
          >
            <option value="12">12 months</option>
            <option value="24">24 months</option>
            <option value="36">36 months</option>
            <option value="48">48 months</option>
            <option value="60">60 months</option>
            <option value="84">84 months</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="employmentStatus">Employment Status</label>
          <select
            id="employmentStatus"
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            required
          >
            <option value="employed">Employed Full-Time</option>
            <option value="parttime">Employed Part-Time</option>
            <option value="selfemployed">Self-Employed</option>
            <option value="retired">Retired</option>
            <option value="unemployed">Unemployed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="annualIncome">Annual Income</label>
          <input
            type="number"
            id="annualIncome"
            name="annualIncome"
            placeholder="Enter annual income"
            value={formData.annualIncome}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Submit Application</button>
      </form>
    </div>
  )
}

export default LoanApplication
