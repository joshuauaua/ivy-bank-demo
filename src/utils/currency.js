// Supported currencies with their display properties
export const SUPPORTED_CURRENCIES = {
  USD: {
    code: 'USD',
    symbol: '$',
    locale: 'en-US',
    name: 'US Dollar'
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    locale: 'de-DE',
    name: 'Euro'
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    locale: 'en-GB',
    name: 'British Pound'
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    locale: 'ja-JP',
    name: 'Japanese Yen'
  },
  CHF: {
    code: 'CHF',
    symbol: 'CHF',
    locale: 'de-CH',
    name: 'Swiss Franc'
  }
}

/**
 * Format a monetary amount in the specified currency
 * @param {number} amount - The amount to format
 * @param {string} currencyCode - ISO 4217 currency code (e.g. 'USD', 'EUR')
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currencyCode = 'USD') {
  const currency = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.USD

  return new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

/**
 * Get the currency symbol for a given currency code
 * @param {string} currencyCode - ISO 4217 currency code
 * @returns {string} Currency symbol
 */
export function getCurrencySymbol(currencyCode = 'USD') {
  return SUPPORTED_CURRENCIES[currencyCode]?.symbol || '$'
}
