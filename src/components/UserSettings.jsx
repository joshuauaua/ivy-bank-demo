import { useState, useRef } from 'react'
import './UserSettings.css'
import { useTheme } from '../context/ThemeContext'
import { SUPPORTED_CURRENCIES } from '../utils/currency'
import { useTranslation } from '../i18n'
import { useLanguage } from '../i18n/LanguageContext'

const TABS = ['profile', 'security', 'notifications', 'appearance']

function UserSettings({ onBack }) {
  const { t } = useTranslation()
  const { language, setLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('profile')
  const tabRefs = useRef({})
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    preferredCurrency: 'USD'
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

  const handleTabKeyDown = (e) => {
    const currentIndex = TABS.indexOf(activeTab)
    let newIndex = currentIndex

    if (e.key === 'ArrowRight') {
      e.preventDefault()
      newIndex = (currentIndex + 1) % TABS.length
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      newIndex = (currentIndex - 1 + TABS.length) % TABS.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      newIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      newIndex = TABS.length - 1
    } else {
      return
    }

    setActiveTab(TABS[newIndex])
    tabRefs.current[TABS[newIndex]]?.focus()
  }

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
        ← {t('backToDashboard')}
      </button>

      <div className="settings-header">
        <h2>{t('accountSettings')}</h2>
        <p>{t('manageAccountInfo')}</p>
      </div>

      <div className="settings-tabs" role="tablist" aria-label={t('accountSettings')}>
        <button
          ref={el => { tabRefs.current.profile = el }}
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
          onKeyDown={handleTabKeyDown}
          role="tab"
          id="tab-profile"
          aria-selected={activeTab === 'profile'}
          aria-controls="panel-profile"
          tabIndex={activeTab === 'profile' ? 0 : -1}
        >
          {t('profile')}
        </button>
        <button
          ref={el => { tabRefs.current.security = el }}
          className={`tab ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
          onKeyDown={handleTabKeyDown}
          role="tab"
          id="tab-security"
          aria-selected={activeTab === 'security'}
          aria-controls="panel-security"
          tabIndex={activeTab === 'security' ? 0 : -1}
        >
          {t('security')}
        </button>
        <button
          ref={el => { tabRefs.current.notifications = el }}
          className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
          onKeyDown={handleTabKeyDown}
          role="tab"
          id="tab-notifications"
          aria-selected={activeTab === 'notifications'}
          aria-controls="panel-notifications"
          tabIndex={activeTab === 'notifications' ? 0 : -1}
        >
          {t('notifications')}
        </button>
        <button
          ref={el => { tabRefs.current.appearance = el }}
          className={`tab ${activeTab === 'appearance' ? 'active' : ''}`}
          onClick={() => setActiveTab('appearance')}
          onKeyDown={handleTabKeyDown}
          role="tab"
          id="tab-appearance"
          aria-selected={activeTab === 'appearance'}
          aria-controls="panel-appearance"
          tabIndex={activeTab === 'appearance' ? 0 : -1}
        >
          {t('appearance')}
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'profile' && (
          <div role="tabpanel" id="panel-profile" aria-labelledby="tab-profile">
            <form className="settings-form" onSubmit={handleProfileSubmit}>
              <h3>{t('personalInformation')}</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">{t('firstName')}</label>
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
                  <label htmlFor="lastName">{t('lastName')}</label>
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
                <label htmlFor="email">{t('emailAddress')}</label>
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
                <label htmlFor="phone">{t('phoneNumber')}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="preferredCurrency">{t('preferredCurrency')}</label>
                <select
                  id="preferredCurrency"
                  name="preferredCurrency"
                  value={profileData.preferredCurrency}
                  onChange={handleProfileChange}
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
                <label htmlFor="language">{t('language')}</label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="sv">Svenska</option>
                  <option value="no">Norsk</option>
                  <option value="da">Dansk</option>
                  <option value="fi">Suomi</option>
                  <option value="de">Deutsch</option>
                  <option value="fr">Français</option>
                </select>
              </div>

              <h3>{t('address')}</h3>
              <div className="form-group">
                <label htmlFor="address">{t('streetAddress')}</label>
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
                  <label htmlFor="city">{t('city')}</label>
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
                  <label htmlFor="state">{t('state')}</label>
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
                  <label htmlFor="zipCode">{t('zipCode')}</label>
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

              <button type="submit" className="submit-btn">{t('saveChanges')}</button>
            </form>
          </div>
        )}

        {activeTab === 'security' && (
          <div role="tabpanel" id="panel-security" aria-labelledby="tab-security">
            <form className="settings-form" onSubmit={handleSecuritySubmit}>
              <h3>{t('changePassword')}</h3>
              <div className="form-group">
                <label htmlFor="currentPassword">{t('currentPassword')}</label>
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
                <label htmlFor="newPassword">{t('newPassword')}</label>
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
                <label htmlFor="confirmPassword">{t('confirmNewPassword')}</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={securityData.confirmPassword}
                  onChange={handleSecurityChange}
                  required
                />
              </div>

              <button type="submit" className="submit-btn">{t('updatePassword')}</button>

              <div className="security-info">
                <h3>{t('twoFactorAuth')}</h3>
                <p>{t('addSecurityLayer')}</p>
                <button type="button" className="secondary-btn">{t('enable2FA')}</button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div role="tabpanel" id="panel-notifications" aria-labelledby="tab-notifications">
            <form className="settings-form" onSubmit={handleNotificationsSubmit}>
              <h3>{t('notificationPreferences')}</h3>

              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="emailAlerts"
                    checked={notifications.emailAlerts}
                    onChange={handleNotificationChange}
                  />
                  <span>{t('emailAlerts')}</span>
                </label>
                <p className="checkbox-description">{t('emailAlertsDesc')}</p>
              </div>

              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="smsAlerts"
                    checked={notifications.smsAlerts}
                    onChange={handleNotificationChange}
                  />
                  <span>{t('smsAlerts')}</span>
                </label>
                <p className="checkbox-description">{t('smsAlertsDesc')}</p>
              </div>

              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="transactionNotifications"
                    checked={notifications.transactionNotifications}
                    onChange={handleNotificationChange}
                  />
                  <span>{t('transactionNotifications')}</span>
                </label>
                <p className="checkbox-description">{t('transactionNotificationsDesc')}</p>
              </div>

              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="loginAlerts"
                    checked={notifications.loginAlerts}
                    onChange={handleNotificationChange}
                  />
                  <span>{t('loginAlerts')}</span>
                </label>
                <p className="checkbox-description">{t('loginAlertsDesc')}</p>
              </div>

              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="monthlyStatements"
                    checked={notifications.monthlyStatements}
                    onChange={handleNotificationChange}
                  />
                  <span>{t('monthlyStatements')}</span>
                </label>
                <p className="checkbox-description">{t('monthlyStatementsDesc')}</p>
              </div>

              <button type="submit" className="submit-btn">{t('savePreferences')}</button>
            </form>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div role="tabpanel" id="panel-appearance" aria-labelledby="tab-appearance">
            <div className="settings-form">
              <h3>{t('theme')}</h3>
              <div className="theme-setting">
                <div className="theme-info">
                  <span className="theme-label" id="dark-mode-label">{t('darkMode')}</span>
                  <p className="theme-description">{t('darkModeDesc')}</p>
                </div>
                <label className="theme-toggle">
                  <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                    aria-labelledby="dark-mode-label"
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserSettings
