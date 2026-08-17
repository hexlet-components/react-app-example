/* eslint-disable import/no-anonymous-default-export */
// @ts-check

// Тексты лежат в json, а сами json собирает i18next-cli из вызовов t()
// (`make i18n-extract`, настройки — i18next.config.js). Руками они не правятся.
import en from "./en/translation.json";
import ru from "./ru/translation.json";

export default {
  en: { translation: en },
  ru: { translation: ru },
};
