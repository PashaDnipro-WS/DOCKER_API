import { expect } from '@playwright/test';

export class ProjectsPage {
    constructor(page) {
        this.page = page;

        this.heading = page.getByRole('heading', { name: 'Projects' });
        this.createProjectButton = page.getByRole('button', { name: 'Create Project' });

        this.createHeading = page.getByRole('heading', { name: 'Create New Project' });
        this.nameInput = page.getByRole('textbox', { name: 'Project Name *' });
        this.descriptionInput = page.getByRole('textbox', { name: 'Description *' });
        this.wageInput = page.getByRole('spinbutton', { name: 'Wage' });

        this.activeCheckbox = page.getByRole('checkbox', { name: 'Active' });

        this.submitButton = page.getByRole('button', { name: 'Create' });
    }

    async expectOpened() {
        await expect(this.heading).toBeVisible();
        await expect(this.createProjectButton).toBeVisible();
    }

    async openCreateProjectForm() {
        await this.createProjectButton.click();

        await expect(this.createHeading).toBeVisible();
    }

    async createProject(project) {
        await this.nameInput.fill(project.name);

        await this.descriptionInput.fill(project.description);

        await this.wageInput.fill(project.wage);

        if (project.status === 'active') {
            await this.activeCheckbox.check();
        }

        if (project.status === 'inactive') {
            await this.activeCheckbox.uncheck();
        }

        await this.submitButton.click();
    }

    async expectProjectVisible(project) {
        await expect(this.page.getByText(project.name)).toBeVisible();
    }

    projectCard(name) {
        return this.page
            .getByText(name)
            .locator('xpath=ancestor::*[contains(@class,"rounded")]')
            .first();
    }

    async deleteProjectByName(name) {
        this.page.once('dialog', dialog => dialog.accept());

        await this.projectCard(name)
            .getByRole('button')
            .nth(2)
            .click();
    }

    async expectDeleteSuccessToastVisible() {
        await expect(
            this.page.getByRole('status').filter({
                hasText: /project deleted successfully/i,
            })
        ).toBeVisible();
    }

    async expectProjectDeleted(name) {
        await expect(
            this.page.getByText(name)
        ).toHaveCount(0);
    }
}