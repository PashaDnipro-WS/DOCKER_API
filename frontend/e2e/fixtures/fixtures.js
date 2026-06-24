import { test as base, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage.js';
import { EmployeesPage } from '../pages/EmployeesPage.js';
import { Navbar } from '../components/Navbar.js';
import { ProjectsPage } from '../pages/ProjectsPage.js';

import {
    adminUser,
    invalidAdminUser,
    createEmployeeData,
} from '../data/users.js';

import { createProjectData } from '../data/projects.js';

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    employeesPage: async ({ page }, use) => {
        await use(new EmployeesPage(page));
    },

    navbar: async ({ page }, use) => {
        await use(new Navbar(page));
    },

    projectsPage: async ({ page }, use) => {
        await use(new ProjectsPage(page));
    },

    admin: async ({}, use) => {
        await use(adminUser);
    },

    invalidAdmin: async ({}, use) => {
        await use(invalidAdminUser);
    },

    employee: async ({}, use) => {
        const employee = createEmployeeData();

        await use(employee);
    },

    project: async ({}, use) => {
        const project = createProjectData();

        await use(project);
    },

    loggedInEmployeesPage: async ({
        loginPage,
        employeesPage,
        admin,
    }, use) => {
        await loginPage.goto();

        await loginPage.login(
            admin.email,
            admin.password
        );

        await employeesPage.expectOpened();

        await use(employeesPage);
    },

    loggedInProjectsPage: async ({
        loginPage,
        navbar,
        projectsPage,
        admin,
    }, use) => {
        await loginPage.goto();

        await loginPage.login(
            admin.email,
            admin.password
        );

        await navbar.openProjects();

        await projectsPage.expectOpened();

        await use(projectsPage);
    },
});

export { expect };