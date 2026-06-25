import { test, expect } from '../fixtures/fixtures.js';

test.describe('Auth', () => {
  test('user can login with valid credentials', async ({
    page,
    loginPage,
    navbar,
    admin,
  }) => {
    await loginPage.goto();

    await loginPage.expectOpened();

    await loginPage.login(
      admin.email,
      admin.password
    );

    await expect(page).toHaveURL(/employees/);

    await navbar.expectVisible();

    await navbar.expectUserVisible();

    const storage = await page.evaluate(() => {
      return {
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user') || 'null'),
      };
    });

    expect(storage.token).toBeTruthy();

    expect(storage.user).toBeTruthy();

    expect(storage.user.email).toBe(admin.email);
  });

  test('user cannot login with invalid credentials', async ({
    page,
    loginPage,
    invalidAdmin,
  }) => {
    await loginPage.goto();

    await loginPage.expectOpened();

    await loginPage.login(
      invalidAdmin.email,
      invalidAdmin.password
    );

    await expect(page).toHaveURL(/login/);

    const storage = await page.evaluate(() => {
      return {
        token: localStorage.getItem('token'),
        user: localStorage.getItem('user'),
      };
    });

    expect(storage.token).toBeNull();

    expect(storage.user).toBeNull();
  });

  test('user can logout', async ({
    loggedInEmployeesPage,
    loginPage,
    page,
    navbar,
  }) => {
    await navbar.expectVisible();

    await navbar.logout();

    await expect(page).toHaveURL(/login/, { timeout: 15000 });
    await loginPage.expectOpened();

    const storage = await page.evaluate(() => ({
      token: localStorage.getItem('token'),
      user: localStorage.getItem('user'),
    }));

    expect(storage.token).toBeNull();
    expect(storage.user).toBeNull();

    await loginPage.expectOpened();
  });
});