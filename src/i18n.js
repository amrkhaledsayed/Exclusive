import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      fallbackLng: 'en',
      debug: false,
      supportedLngs: ['en', 'ar', 'tr', 'sp', 'it'],
      interpolation: { escapeValue: false },
      detection: {
        order: ['localStorage'],
        caches: ['localStorage'],
      },
      backend: { loadPath: '/locales/{{lng}}/translation.json' },
    },
    () => {
      const currentLang = i18n.language || 'en';
      document.documentElement.lang = currentLang;
      document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    }
  )
  .then(() => {
    const currentLang = i18n.language || 'en';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  });

export default i18n;
