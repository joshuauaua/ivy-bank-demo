import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Ivy Bank</h3>
          <p>📍 123 Financial District</p>
          <p>New York, NY 10004</p>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>📞 1-800-IVY-BANK</p>
          <p>✉️ support@ivybank.com</p>
        </div>

        <div className="footer-section">
          <h3>Hours</h3>
          <p>Mon-Fri</p>
          <p>9AM-5PM EST</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Member FDIC | © {currentYear} Ivy Bank. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
