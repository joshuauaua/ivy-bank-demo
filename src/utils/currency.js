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

/**
 * Format a number with locale-aware thousands and decimal separators
 * @param {number} value - The number to format
 * @param {string} locale - BCP 47 language tag (e.g. 'en-US', 'sv-SE')
 * @param {object} options - Additional Intl.NumberFormat options
 * @returns {string} Formatted number string
 */
export function formatNumber(value, locale = 'en-US', options = {}) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: options.minimumFractionDigits ?? 0,
    maximumFractionDigits: options.maximumFractionDigits ?? 0,
    ...options
  }).format(value)
}
