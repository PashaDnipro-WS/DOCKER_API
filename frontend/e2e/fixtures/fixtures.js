import { test as base, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage.js';
import { EmployeesPage } from '../pages/EmployeesPage.js';
// import { ProjectsPage } from '../pages/ProjectsPage.js';
import { Navbar } from '../components/Navbar.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  employeesPage: async ({ page }, use) => {
    await use(new EmployeesPage(page));
  },

//   projectsPage: async ({ page }, use) => {
//     await use(new ProjectsPage(page));
//   },

  navbar: async ({ page }, use) => {
    await use(new Navbar(page));
  },
});

export { expect };