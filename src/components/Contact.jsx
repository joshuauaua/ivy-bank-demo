import { useState } from 'react'
import './Contact.css'

function Contact({ onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div className="contact">
      <button className="back-btn" onClick={onBack}>
        ← Back to Dashboard
      </button>

      <div className="contact-header">
        <h2>Contact Us</h2>
        <p>We're here to help with any questions or concerns</p>
      </div>

      <div className="contact-content">
        <div className="manager-card">
          <div className="manager-photo">
            <img src="/manager-placeholder.jpg" alt="Bank Manager" />
          </div>
          <div className="manager-info">
            <h3>Sarah Johnson</h3>
            <p className="manager-title">Senior Branch Manager</p>
            <div className="manager-contact">
              <div className="contact-item">
                <span className="label">Email:</span>
                <a href="mailto:sarah.johnson@ivybank.com">sarah.johnson@ivybank.com</a>
              </div>
              <div className="contact-item">
                <span className="label">Phone:</span>
                <a href="tel:+15551234567">(555) 123-4567</a>
              </div>
              <div className="contact-item">
                <span className="label">Extension:</span>
                <span>2100</span>
              </div>
            </div>
            <p className="manager-bio">
              With over 15 years of banking experience, Sarah is dedicated to helping our
              customers achieve their financial goals. Feel free to reach out with any questions
              about accounts, loans, or investment opportunities.
            </p>
          </div>
        </div>

        <div className="bank-info-section">
          <h3>General Information</h3>
          <div className="info-grid">
            <div className="info-card">
              <h4>Main Office</h4>
              <p>1234 Financial Boulevard</p>
              <p>New York, NY 10005</p>
            </div>
            <div className="info-card">
              <h4>Phone</h4>
              <p>(555) 123-4567</p>
              <p>1-800-IVY-BANK</p>
            </div>
            <div className="info-card">
              <h4>Email</h4>
              <p>support@ivybank.com</p>
              <p>info@ivybank.com</p>
            </div>
            <div className="info-card">
              <h4>Hours</h4>
              <p>Mon-Fri: 9:00 AM - 5:00 PM</p>
              <p>Sat: 10:00 AM - 2:00 PM</p>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <h3>Send Us a Message</h3>
          {submitted && (
            <div className="success-message" role="status" aria-live="polite">
              Thank you for your message! We&apos;ll get back to you within 24 hours.
            </div>
          )}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
