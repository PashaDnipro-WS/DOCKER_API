import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/tests',
  
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],

  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },
});