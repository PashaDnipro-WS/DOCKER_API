import { expect } from '@playwright/test';

export class EmployeesPage {
    constructor(page) {
        this.page = page;

        // Employees list page
        this.heading = page.getByRole('heading', { name: 'Employees' });
        this.addEmployeeButton = page.getByRole('button', { name: 'Add Employee' });

        // Create employee page
        this.createHeading = page.getByRole('heading', { name: 'Create New Employee' });
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name *' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name *' });
        this.middleNameInput = page.getByRole('textbox', { name: 'Middle Name *' });
        this.emailInput = page.getByRole('textbox', { name: 'Email *' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
        this.phoneInput = page.getByRole('textbox', { name: 'Phone *' });
        this.birthDateInput = page.getByRole('textbox', { name: 'Birth Date *' });
        this.programmingLanguageInput = page.getByRole('textbox', { name: 'Programming Language *' });
        this.countryInput = page.getByRole('textbox', { name: 'Country *' });
        this.bankCardInput = page.getByRole('textbox', { name: 'Bank Card *' });
        this.roleSelect = page.getByLabel('Role *');
        this.positionInput = page.getByRole('textbox', { name: 'Position' });
        this.salaryInput = page.getByRole('spinbutton', { name: 'Salary' });
        this.mentorNameInput = page.getByRole('textbox', { name: 'Mentor Name' });
        this.englishLevelInput = page.getByRole('textbox', { name: 'English Level' });
        this.workingHoursInput = page.getByRole('spinbutton', { name: 'Working Hours/Week' });
        this.vacationDatesInput = page.getByRole('textbox', { name: /Vacation Dates/i });
        this.githubLinkInput = page.getByRole('textbox', { name: 'GitHub Link' });
        this.linkedinLinkInput = page.getByRole('textbox', { name: 'LinkedIn Link' });
        this.adminNoteInput = page.getByRole('textbox', { name: 'Admin Note' });

        this.submitCreateEmployeeButton = page.getByRole('button', { name: 'Create Employee' });

        this.searchInput = page.getByRole('textbox', { name: 'Search by name...' });
    }

    async goto() {
        await this.page.goto('/employees');
    }

    async expectOpened() {
        await expect(this.heading).toBeVisible();
        await expect(this.addEmployeeButton).toBeVisible();
    }

    async openCreateEmployeeForm() {
        await this.addEmployeeButton.click();
        await expect(this.createHeading).toBeVisible();
    }

    async createEmployee(employee) {
        await this.firstNameInput.fill(employee.firstName);
        await this.lastNameInput.fill(employee.lastName);
        await this.middleNameInput.fill(employee.middleName);
        await this.emailInput.fill(employee.email);
        await this.passwordInput.fill(employee.password);
        await this.phoneInput.fill(employee.phone);
        await this.birthDateInput.fill(employee.birthDate);
        await this.programmingLanguageInput.fill(employee.programmingLanguage);
        await this.countryInput.fill(employee.country);
        await this.bankCardInput.fill(employee.bankCard);
        await this.roleSelect.selectOption(employee.role);
        await this.positionInput.fill(employee.position);
        await this.salaryInput.fill(employee.salary);
        await this.mentorNameInput.fill(employee.mentorName);
        await this.englishLevelInput.fill(employee.englishLevel);
        await this.workingHoursInput.fill(employee.workingHours);
        await this.vacationDatesInput.fill(employee.vacationDates);
        await this.githubLinkInput.fill(employee.githubLink);
        await this.linkedinLinkInput.fill(employee.linkedinLink);
        await this.adminNoteInput.fill(employee.adminNote);

        await this.submitCreateEmployeeButton.click();
    }

    async expectEmployeeVisible(employee) {
        await expect(
            this.page.getByText(`${employee.firstName} ${employee.lastName}`).last()
        ).toBeVisible();

        await expect(
            this.page.getByText(employee.email).last()
        ).toBeVisible();

        await expect(
            this.page.getByText(employee.position).last()
        ).toBeVisible();
    }

    async searchByName(name) {
        await this.searchInput.fill(name);
    }

    employeeHeading(name) {
        return this.page.getByRole('heading', { name });
    }

    async expectEmployeeNameVisible(name) {
        await expect(this.employeeHeading(name).first()).toBeVisible();
    }

    async expectEmployeeNameHidden(name) {
        await expect(this.employeeHeading(name)).toHaveCount(0);
    }

    async expectEmployeeNameExists(name) {
        await expect(
            this.employeeHeading(name).first()
        ).toBeVisible();
    }

    employeeByEmail(email) {
        return this.page.getByText(email);
    }

    async expectEmployeeVisibleByEmail(email) {
        await expect(this.employeeByEmail(email)).toBeVisible();
    }

    async expectEmployeeHiddenByEmail(email) {
        await expect(this.employeeByEmail(email)).toHaveCount(0);
    }

    async deleteEmployeeByEmail(email) {
        this.page.once('dialog', dialog => dialog.accept());

        const employeeCard = this.employeeCardByEmail(email);

        await employeeCard.getByRole('button').nth(1).click();
    }

    async expectDeleteSuccessToastVisible() {
        await expect(
            this.page.getByRole('status').filter({
                hasText: /employee deleted successfully/i,
            })
        ).toBeVisible();
    }

    async expectEmployeeDeleted(email) {
        await expect(
            this.page.getByText(email)
        ).toHaveCount(0);
    }

    employeeCardByEmail(email) {
        return this.page
            .getByText(email)
            .locator('xpath=ancestor::*[contains(@class,"rounded")]')
            .first();
    }

    async openEmployeeDetailsByEmail(email) {
        const employeeCard = this.employeeCardByEmail(email);

        await employeeCard.getByRole('button').first().click();
    }

    async expectEmployeeDetailsOpened(employee) {
        await expect(this.page).toHaveURL(/\/employees\/\d+/);
        await expect(this.page.getByText(employee.email)).toBeVisible();
    }

    async openEditEmployeeForm() {
        await this.page.getByRole('button', { name: 'Edit' }).click();
    }

    async updatePhone(phone) {
        await this.page.getByRole('textbox', { name: 'Phone' }).fill(phone);
        await this.page.getByRole('button', { name: 'Save Changes' }).click();
    }

    async expectUpdateSuccessToastVisible() {
        await expect(
            this.page.getByRole('status').filter({
                hasText: /employee updated successfully/i,
            })
        ).toBeVisible();
    }

    async reload() {
        await this.page.reload();
    }

    async expectPhoneVisible(phone) {
        await expect(this.page.getByText(phone)).toBeVisible();
    }
}