// @ts-check

import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import App from './components/App.jsx';
import resources from './locales/index.js';

export default async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const vdom = (
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );

  return vdom;
};
