import { test } from '../fixtures/fixtures.js';
import { updatedEmployeeData } from '../data/users.js';

test.describe('Employees', () => {
    test('admin can create employee', async ({
        loggedInEmployeesPage,
        employee,
    }) => {
        await loggedInEmployeesPage.openCreateEmployeeForm();

        await loggedInEmployeesPage.createEmployee(employee);

        await loggedInEmployeesPage.expectOpened();

        await loggedInEmployeesPage.expectEmployeeVisible(employee);
    });

    test('user can delete employee', async ({
        loggedInEmployeesPage,
        employee,
    }) => {
        await loggedInEmployeesPage.openCreateEmployeeForm();

        await loggedInEmployeesPage.createEmployee(employee);

        await loggedInEmployeesPage.expectOpened();

        await loggedInEmployeesPage.expectEmployeeVisibleByEmail(
            employee.email
        );

        await loggedInEmployeesPage.deleteEmployeeByEmail(
            employee.email
        );

        await loggedInEmployeesPage.expectDeleteSuccessToastVisible();

        await loggedInEmployeesPage.expectEmployeeDeleted(
            employee.email
        );
    });

    test('user can update employee information', async ({
        loggedInEmployeesPage,
        employee,
    }) => {
        await loggedInEmployeesPage.openCreateEmployeeForm();

        await loggedInEmployeesPage.createEmployee(employee);

        await loggedInEmployeesPage.expectOpened();

        await loggedInEmployeesPage.expectEmployeeVisibleByEmail(
            employee.email
        );

        await loggedInEmployeesPage.openEmployeeDetailsByEmail(
            employee.email
        );

        await loggedInEmployeesPage.expectEmployeeDetailsOpened(
            employee
        );

        await loggedInEmployeesPage.openEditEmployeeForm();

        await loggedInEmployeesPage.updatePhone(
            updatedEmployeeData.phone
        );

        await loggedInEmployeesPage.expectUpdateSuccessToastVisible();

        await loggedInEmployeesPage.reload();

        await loggedInEmployeesPage.expectPhoneVisible(
            updatedEmployeeData.phone
        );
    });
});