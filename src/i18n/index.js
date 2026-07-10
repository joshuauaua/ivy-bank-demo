import { useLanguage } from './LanguageContext'
import en from './en.json'
import sv from './sv.json'
import no from './no.json'
import da from './da.json'
import fi from './fi.json'
import de from './de.json'
import fr from './fr.json'

export const translations = {
  en,
  sv,
  no,
  da,
  fi,
  de,
  fr
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
  const localeMap = {
    en: 'en-US',
    sv: 'sv-SE',
    no: 'nb-NO',
    da: 'da-DK',
    fi: 'fi-FI',
    de: 'de-DE',
    fr: 'fr-FR'
  }
  const locale = localeMap[language] || 'en-US'

  return { t, language, locale }
}
