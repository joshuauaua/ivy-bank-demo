import { useState } from 'react'
import './UserSettings.css'

function UserSettings({ onBack }) {
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001'
  })

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    transactionNotifications: true,
    loginAlerts: true,
    monthlyStatements: true
  })

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handleSecurityChange = (e) => {
    const { name, value } = e.target
    setSecurityData(prev => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotifications(prev => ({ ...prev, [name]: checked }))
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    alert('Profile updated successfully!')
  }

  const handleSecuritySubmit = (e) => {
    e.preventDefault()
    if (securityData.newPassword !== securityData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    alert('Password changed successfully!')
    setSecurityData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleNotificationsSubmit = (e) => {
    e.preventDefault()
    alert('Notification preferences saved!')
  }

  return (
    <div className="user-settings">
      <button className="back-btn" onClick={onBack}>
        ← Back to Dashboard
      </button>

      <div className="settings-header">
        <h2>Account Settings</h2>
        <p>Manage your account information and preferences</p>
      </div>

      <div className="settings-tabs">
        <button
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`tab ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
        <button
          className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'profile' && (
          <form className="settings-form" onSubmit={handleProfileSubmit}>
            <h3>Personal Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                required
              />
            </div>

            <h3>Address</h3>
            <div className="form-group">
              <label htmlFor="address">Street Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={profileData.address}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={profileData.city}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={profileData.state}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={profileData.zipCode}
                  onChange={handleProfileChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">Save Changes</button>
          </form>
        )}

        {activeTab === 'security' && (
          <form className="settings-form" onSubmit={handleSecuritySubmit}>
            <h3>Change Password</h3>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={securityData.currentPassword}
                onChange={handleSecurityChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={securityData.newPassword}
                onChange={handleSecurityChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={securityData.confirmPassword}
                onChange={handleSecurityChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">Update Password</button>

            <div className="security-info">
              <h3>Two-Factor Authentication</h3>
              <p>Add an extra layer of security to your account</p>
              <button type="button" className="secondary-btn">Enable 2FA</button>
            </div>
          </form>
        )}

        {activeTab === 'notifications' && (
          <form className="settings-form" onSubmit={handleNotificationsSubmit}>
            <h3>Notification Preferences</h3>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="emailAlerts"
                  checked={notifications.emailAlerts}
                  onChange={handleNotificationChange}
                />
                <span>Email Alerts</span>
              </label>
              <p className="checkbox-description">Receive important account updates via email</p>
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="smsAlerts"
                  checked={notifications.smsAlerts}
                  onChange={handleNotificationChange}
                />
                <span>SMS Alerts</span>
              </label>
              <p className="checkbox-description">Get text messages for urgent notifications</p>
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="transactionNotifications"
                  checked={notifications.transactionNotifications}
                  onChange={handleNotificationChange}
                />
                <span>Transaction Notifications</span>
              </label>
              <p className="checkbox-description">Be notified of all transactions on your accounts</p>
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="loginAlerts"
                  checked={notifications.loginAlerts}
                  onChange={handleNotificationChange}
                />
                <span>Login Alerts</span>
              </label>
              <p className="checkbox-description">Receive alerts when someone logs into your account</p>
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="monthlyStatements"
                  checked={notifications.monthlyStatements}
                  onChange={handleNotificationChange}
                />
                <span>Monthly Statements</span>
              </label>
              <p className="checkbox-description">Receive monthly account statements via email</p>
            </div>

            <button type="submit" className="submit-btn">Save Preferences</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default UserSettings
