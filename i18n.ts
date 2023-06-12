import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import es from './public/locales/es'
import en from './public/locales/en'

// translations English & Spanish
const resources = {
  en: { translation: en },
  es: { translation: es },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || 'en',
    fallbackLng: ['en'],
    supportedLngs: ['en', 'es'],
    debug: false,
    interpolation: { escapeValue: false },
  })

export default i18n
