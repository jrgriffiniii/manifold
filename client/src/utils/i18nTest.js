import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        date_fns: null,
        forms: { upload: { image_preview: "<0></0><br/><1></1>" } }
      }
    }
  }
});

export default i18n;