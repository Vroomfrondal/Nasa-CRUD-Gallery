import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import es from './es'
import en from './en'

// translations English & Spanish
const resources = {
  en: { translation: en },
  es: { translation: es },
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    lng: 'en' || 'es',
    interpolation: { escapeValue: false },
  })

export default i18n
