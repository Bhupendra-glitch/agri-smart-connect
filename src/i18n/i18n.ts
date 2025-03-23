
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all language resources
import translationEN from './locales/en/translation.json';
import translationHI from './locales/hi/translation.json';
import translationMR from './locales/mr/translation.json';
import translationGU from './locales/gu/translation.json';
import translationTA from './locales/ta/translation.json';
import translationTE from './locales/te/translation.json';
import translationKN from './locales/kn/translation.json';
import translationML from './locales/ml/translation.json';
import translationPA from './locales/pa/translation.json';
import translationBN from './locales/bn/translation.json';
import translationOR from './locales/or/translation.json';
import translationAS from './locales/as/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  hi: {
    translation: translationHI
  },
  mr: {
    translation: translationMR
  },
  gu: {
    translation: translationGU
  },
  ta: {
    translation: translationTA
  },
  te: {
    translation: translationTE
  },
  kn: {
    translation: translationKN
  },
  ml: {
    translation: translationML
  },
  pa: {
    translation: translationPA
  },
  bn: {
    translation: translationBN
  },
  or: {
    translation: translationOR
  },
  as: {
    translation: translationAS
  }
};

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;
