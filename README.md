# 🏦 Ivy Bank App

A modern, professional demo banking application built with React and Vite. This app demonstrates a full-featured banking interface suitable for showcasing software capabilities.

## Features

### Dashboard
- **Total Balance Overview** - View combined balance across all accounts
- **Multiple Account Types** - Checking and Savings accounts
- **Recent Transactions** - Transaction history with categorization (credits, debits, transfers)
- **Quick Actions** - Transfer money, pay bills, mobile deposit, view statements

### Account Management
- Detailed account views with transaction history
- Current and available balance tracking
- Account-specific actions (transfers, statements, order checks)
- Transaction details with running balance

### Loan Application
- Apply for various loan types (Personal, Auto, Home Equity, Business)
- Comprehensive application form
- Loan type comparison cards with APR rates
- Employment and income verification fields

### User Settings
- **Profile Management** - Update personal information and contact details
- **Security Settings** - Change password and enable two-factor authentication
- **Notification Preferences** - Customize email, SMS, and transaction alerts
- Tabbed interface for organized settings

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Technology Stack

- **React 18** - Modern React with Hooks
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling with responsive design
- **JavaScript ES6+** - Modern JavaScript features

## Demo Data

The app includes pre-populated demo data:
- User: John Doe (john.doe@email.com)
- Checking Account: ****4521 ($12,543.67)
- Savings Account: ****8732 ($45,230.12)
- Recent transaction history

## Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx          # Main dashboard view
│   ├── AccountDetails.jsx     # Account detail page
│   ├── LoanApplication.jsx    # Loan application form
│   ├── UserSettings.jsx       # User settings page
│   ├── Sidebar.jsx            # Navigation sidebar
│   └── *.css                  # Component styles
├── App.jsx                    # Main app component
├── App.css                    # Global app styles
└── index.css                  # Root styles
```

## Features Overview

### Navigation
- Sidebar navigation with active state indicators
- User profile display with avatar
- Easy access to main features
- Logout functionality

### Responsive Design
- Mobile-friendly layout
- Adaptive grid systems
- Touch-friendly interface elements
- Responsive tables and forms

### UI/UX Highlights
- Clean, modern design
- Consistent color scheme (purple gradient theme)
- Smooth transitions and hover effects
- Clear visual hierarchy
- Accessible form inputs

## Customization

To customize the app for your needs:

1. **Colors**: Update the color values in the CSS files (look for `#667eea` and `#764ba2`)
2. **Demo Data**: Modify the state data in component files
3. **Branding**: Update the logo and app name in `Sidebar.jsx`
4. **Features**: Add or remove navigation items and components

## License

This is a demo application. Use it as you see fit.
