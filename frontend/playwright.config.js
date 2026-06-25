import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/tests',

  workers: 1,
  fullyParallel: false,
  timeout: 60000,

  expect: {
    timeout: 10000,
  },

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});