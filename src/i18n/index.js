import { useLanguage } from './LanguageContext'
import en from './en.json'
import sv from './sv.json'

export const translations = {
  en,
  sv
}

export function useTranslation() {
  const { language } = useLanguage()

  const t = (key, params = {}) => {
    const translation = translations[language]?.[key] || translations.en[key] || key

    // Replace {{placeholder}} with actual values
    return Object.keys(params).reduce((text, param) => {
      return text.replace(`{{${param}}}`, params[param])
    }, translation)
  }

  // Return locale for date formatting
  const locale = language === 'sv' ? 'sv-SE' : 'en-US'

  return { t, language, locale }
}
