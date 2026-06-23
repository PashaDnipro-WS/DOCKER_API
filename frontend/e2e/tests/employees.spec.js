import { test } from '../fixtures/fixtures.js';
import { adminUser, newEmployee, updatedEmployeeData } from '../data/users.js';

test.describe('Employees', () => {
    test('admin can create employee', async ({
        loginPage,
        employeesPage,
    }) => {
        await loginPage.goto();
        await loginPage.login(adminUser.email, adminUser.password);

        await employeesPage.expectOpened();

        await employeesPage.openCreateEmployeeForm();

        await employeesPage.createEmployee(newEmployee);

        await employeesPage.expectOpened();

        await employeesPage.expectEmployeeVisible(newEmployee);
    });

    test('user can search employee by name', async ({
        loginPage,
        employeesPage,
    }) => {
        await loginPage.goto();

        await loginPage.login(adminUser.email, adminUser.password);

        await employeesPage.expectOpened();

        await employeesPage.searchByName('John');

        await employeesPage.expectEmployeeNameExists('John Tester');

        await employeesPage.expectEmployeeNameHidden('Default Admin');
    });

    test('user can delete employee', async ({
        loginPage,
        employeesPage,
    }) => {
        await loginPage.goto();

        await loginPage.login(
            adminUser.email,
            adminUser.password
        );

        await employeesPage.expectOpened();

        await employeesPage.openCreateEmployeeForm();

        await employeesPage.createEmployee(newEmployee);

        await employeesPage.expectOpened();

        await employeesPage.expectEmployeeVisibleByEmail(
            newEmployee.email
        );

        await employeesPage.deleteEmployeeByEmail(
            newEmployee.email
        );

        await employeesPage.expectDeleteSuccessToastVisible();

        await employeesPage.expectEmployeeDeleted(
            newEmployee.email
        );
    });

    test('user can update employee information', async ({
        loginPage,
        employeesPage,
    }) => {
        await loginPage.goto();

        await loginPage.login(adminUser.email, adminUser.password);

        await employeesPage.expectOpened();

        await employeesPage.openCreateEmployeeForm();

        await employeesPage.createEmployee(newEmployee);

        await employeesPage.expectOpened();

        await employeesPage.expectEmployeeVisibleByEmail(newEmployee.email);

        await employeesPage.openEmployeeDetailsByEmail(newEmployee.email);

        await employeesPage.expectEmployeeDetailsOpened(newEmployee);

        await employeesPage.openEditEmployeeForm();

        await employeesPage.updatePhone(updatedEmployeeData.phone);

        await employeesPage.expectUpdateSuccessToastVisible();

        await employeesPage.reload();

        await employeesPage.expectPhoneVisible(updatedEmployeeData.phone);
    });
});