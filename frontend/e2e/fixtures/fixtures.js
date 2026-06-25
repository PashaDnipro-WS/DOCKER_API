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

async function loginByApi(request, admin) {
    const apiURL = process.env.API_URL || 'http://localhost:3000';

    const response = await request.post(`${apiURL}/login`, {
        data: {
            email: admin.email,
            password: admin.password,
        },
    });

    const body = await response.text();

    if (!response.ok()) {
        throw new Error(`API login failed. Status: ${response.status()}. Body: ${body}`);
    }

    const data = JSON.parse(body);

    return {
        token: data.token,
        user: {
            email: admin.email,
            role: 'admin',
            userId: 1,
            id: 1,
        },
    };
}

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

    admin: async ({ }, use) => {
        await use(adminUser);
    },

    invalidAdmin: async ({ }, use) => {
        await use(invalidAdminUser);
    },

    employee: async ({ }, use) => {
        const employee = createEmployeeData();

        await use(employee);
    },

    project: async ({ }, use) => {
        const project = createProjectData();

        await use(project);
    },

    loggedInEmployeesPage: async ({
        page,
        request,
        employeesPage,
        admin,
    }, use) => {
        const { token, user } = await loginByApi(request, admin);

        await page.addInitScript(({ token, user }) => {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        }, { token, user });

        await page.goto('/employees');

        await employeesPage.expectOpened();

        await use(employeesPage);
    },

    loggedInProjectsPage: async ({
        page,
        request,
        navbar,
        projectsPage,
        admin,
    }, use) => {
        const { token, user } = await loginByApi(request, admin);

        await page.addInitScript(({ token, user }) => {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        }, { token, user });

        await page.goto('/employees');

        await navbar.expectVisible();
        await navbar.openProjects();

        await projectsPage.expectOpened();

        await use(projectsPage);
    },
});

export { expect };