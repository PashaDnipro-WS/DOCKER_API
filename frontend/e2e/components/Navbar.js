import { expect } from '@playwright/test';

export class Navbar {
  constructor(page) {
    this.page = page;

    this.employeesLink = page.getByRole('button', { name: 'Employees' });
    this.projectsLink = page.getByRole('button', { name: 'Projects' });
    this.notificationsLink = page.getByRole('button', { name: 'Notifications' });
    this.myProfileLink = page.getByRole('button', { name: 'My Profile' });

    this.logoutButton = page.getByRole('button', { name: 'Logout' });
    this.username = page.getByText('admin', { exact: true })
  }

  async expectVisible() {
    await expect(this.employeesLink).toBeVisible();
    await expect(this.projectsLink).toBeVisible();
    await expect(this.logoutButton).toBeVisible();
  }

  async expectUserVisible() {
    await expect(this.username).toBeVisible();
  }

  async logout() {
    await this.logoutButton.click();
  }
}