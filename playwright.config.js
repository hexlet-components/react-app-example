// @ts-check
/* eslint-disable no-useless-escape */

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  workers: 5,
  maxFailures: 1,
  testDir: './__tests__',
  outputDir: './tmp/artifacts',
  use: {
    baseURL: 'http://localhost:5000',
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    locale: 'ru-RU',
    launchOptions: {
      slowMo: 100,
    },
  },
  webServer: {
    command: 'npm start',
    url: 'http://localhost:5001',
  },
  // timeout: 30000,
};

export default config;
