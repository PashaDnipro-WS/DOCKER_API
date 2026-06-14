import { test, expect } from '@playwright/test';

test('should login as admin', async ({ page }) => {
  await page.goto('/login');

  await page.getByLabel('Email').fill('admin@example.com');
  await page.getByLabel('Password').fill('adminpassword');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).not.toHaveURL(/login/);
});