import { test, expect } from '../fixtures/fixtures.js';
import { adminUser, invalidAdminUser } from '../data/users.js';

test.describe('Auth', () => {
  test('user can login with valid credentials', async ({
    page,
    loginPage,
    navbar,
  }) => {
    await loginPage.goto();

    await loginPage.expectOpened();

    await loginPage.login(adminUser.email, adminUser.password);

    await expect(page).toHaveURL(/employees/);

    await navbar.expectVisible();

    await navbar.expectUserVisible();

    const token = await page.evaluate(() => localStorage.getItem('token'));
    const user = await page.evaluate(() => JSON.parse(localStorage.getItem('user')));

    expect(token).toBeTruthy();
    expect(user.email).toBe(adminUser.email);
  });

  test('user cannot login with invalid credentials', async ({
    page,
    loginPage,
  }) => {
    await loginPage.goto();

    await loginPage.expectOpened();

    await loginPage.login(invalidAdminUser.email, invalidAdminUser.password);

    await expect(page).toHaveURL(/login/);

    const token = await page.evaluate(() => localStorage.getItem('token'));
    const user = await page.evaluate(() => localStorage.getItem('user'));

    expect(token).toBeNull();
    expect(user).toBeNull();
  });
});