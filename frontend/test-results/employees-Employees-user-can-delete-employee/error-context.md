# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: employees.spec.js >> Employees >> user can delete employee
- Location: e2e\tests\employees.spec.js:40:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Employees' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Employees' })

```

```yaml
- banner:
  - text: Employee Management
  - navigation:
    - link "Employees":
      - /url: /employees
      - button "Employees"
    - link "Projects":
      - /url: /projects
      - button "Projects"
    - link "Notifications":
      - /url: /notifications
      - button "Notifications"
    - link "My Profile":
      - /url: /profile
      - button "My Profile"
  - paragraph
  - paragraph: admin
  - button "Logout"
- main:
  - button "Back to Employees"
  - heading "Create New Employee" [level=3]
  - paragraph: Add a new employee to the system
  - text: First Name *
  - textbox "First Name *": John
  - text: Last Name *
  - textbox "Last Name *": Tester
  - text: Middle Name *
  - textbox "Middle Name *": QA
  - text: Email *
  - textbox "Email *": john.tester.1782236880782@example.com
  - text: Password *
  - textbox "Password *": password123
  - text: Phone *
  - textbox "Phone *": "+1234567890"
  - text: Birth Date *
  - textbox "Birth Date *": 1998-06-23
  - text: Programming Language *
  - textbox "Programming Language *":
    - /placeholder: e.g., JavaScript, Python
    - text: JavaScript
  - text: Country *
  - textbox "Country *":
    - /placeholder: e.g., USA, Canada
    - text: Ukraine
  - text: Bank Card *
  - textbox "Bank Card *":
    - /placeholder: 1234-5678-9012-3456
    - text: 1234-5678-9012-3456
  - text: Role *
  - combobox "Role *":
    - option "Employee" [selected]
    - option "Admin"
  - text: Position
  - textbox "Position": QA Engineer
  - text: Salary
  - spinbutton "Salary": "1000"
  - text: Mentor Name
  - textbox "Mentor Name": Default Admin
  - text: English Level
  - textbox "English Level":
    - /placeholder: e.g., B2, C1
    - text: B1
  - text: Assigned Projects
  - paragraph: No projects available
  - text: Working Hours/Week
  - spinbutton "Working Hours/Week": "40"
  - text: "Vacation Dates (comma-separated: YYYY-MM-DD)"
  - 'textbox "Vacation Dates (comma-separated: YYYY-MM-DD)"':
    - /placeholder: 2024-12-25, 2024-12-26
    - text: 2026-07-01
  - text: GitHub Link
  - textbox "GitHub Link":
    - /placeholder: https://github.com/username
    - text: https://github.com/tester
  - text: LinkedIn Link
  - textbox "LinkedIn Link":
    - /placeholder: https://linkedin.com/in/username
    - text: https://linkedin.com/in/tester
  - text: Admin Note
  - textbox "Admin Note":
    - /placeholder: Internal notes about this employee...
    - text: Created by Playwright test
  - button "Create Employee"
  - button "Cancel"
- region "Notifications (F8)":
  - list:
    - listitem:
      - text: Error Пользователь с таким email уже существует
      - button
```

# Test source

```ts
  1   | import { expect } from '@playwright/test';
  2   | 
  3   | export class EmployeesPage {
  4   |     constructor(page) {
  5   |         this.page = page;
  6   | 
  7   |         // Employees list page
  8   |         this.heading = page.getByRole('heading', { name: 'Employees' });
  9   |         this.addEmployeeButton = page.getByRole('button', { name: 'Add Employee' });
  10  | 
  11  |         // Create employee page
  12  |         this.createHeading = page.getByRole('heading', { name: 'Create New Employee' });
  13  |         this.firstNameInput = page.getByRole('textbox', { name: 'First Name *' });
  14  |         this.lastNameInput = page.getByRole('textbox', { name: 'Last Name *' });
  15  |         this.middleNameInput = page.getByRole('textbox', { name: 'Middle Name *' });
  16  |         this.emailInput = page.getByRole('textbox', { name: 'Email *' });
  17  |         this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
  18  |         this.phoneInput = page.getByRole('textbox', { name: 'Phone *' });
  19  |         this.birthDateInput = page.getByRole('textbox', { name: 'Birth Date *' });
  20  |         this.programmingLanguageInput = page.getByRole('textbox', { name: 'Programming Language *' });
  21  |         this.countryInput = page.getByRole('textbox', { name: 'Country *' });
  22  |         this.bankCardInput = page.getByRole('textbox', { name: 'Bank Card *' });
  23  |         this.roleSelect = page.getByLabel('Role *');
  24  |         this.positionInput = page.getByRole('textbox', { name: 'Position' });
  25  |         this.salaryInput = page.getByRole('spinbutton', { name: 'Salary' });
  26  |         this.mentorNameInput = page.getByRole('textbox', { name: 'Mentor Name' });
  27  |         this.englishLevelInput = page.getByRole('textbox', { name: 'English Level' });
  28  |         this.workingHoursInput = page.getByRole('spinbutton', { name: 'Working Hours/Week' });
  29  |         this.vacationDatesInput = page.getByRole('textbox', { name: /Vacation Dates/i });
  30  |         this.githubLinkInput = page.getByRole('textbox', { name: 'GitHub Link' });
  31  |         this.linkedinLinkInput = page.getByRole('textbox', { name: 'LinkedIn Link' });
  32  |         this.adminNoteInput = page.getByRole('textbox', { name: 'Admin Note' });
  33  | 
  34  |         this.submitCreateEmployeeButton = page.getByRole('button', { name: 'Create Employee' });
  35  | 
  36  |         this.searchInput = page.getByRole('textbox', { name: 'Search by name...' });
  37  |     }
  38  | 
  39  |     async goto() {
  40  |         await this.page.goto('/employees');
  41  |     }
  42  | 
  43  |     async expectOpened() {
> 44  |         await expect(this.heading).toBeVisible();
      |                                    ^ Error: expect(locator).toBeVisible() failed
  45  |         await expect(this.addEmployeeButton).toBeVisible();
  46  |     }
  47  | 
  48  |     async openCreateEmployeeForm() {
  49  |         await this.addEmployeeButton.click();
  50  |         await expect(this.createHeading).toBeVisible();
  51  |     }
  52  | 
  53  |     async createEmployee(employee) {
  54  |         await this.firstNameInput.fill(employee.firstName);
  55  |         await this.lastNameInput.fill(employee.lastName);
  56  |         await this.middleNameInput.fill(employee.middleName);
  57  |         await this.emailInput.fill(employee.email);
  58  |         await this.passwordInput.fill(employee.password);
  59  |         await this.phoneInput.fill(employee.phone);
  60  |         await this.birthDateInput.fill(employee.birthDate);
  61  |         await this.programmingLanguageInput.fill(employee.programmingLanguage);
  62  |         await this.countryInput.fill(employee.country);
  63  |         await this.bankCardInput.fill(employee.bankCard);
  64  |         await this.roleSelect.selectOption(employee.role);
  65  |         await this.positionInput.fill(employee.position);
  66  |         await this.salaryInput.fill(employee.salary);
  67  |         await this.mentorNameInput.fill(employee.mentorName);
  68  |         await this.englishLevelInput.fill(employee.englishLevel);
  69  |         await this.workingHoursInput.fill(employee.workingHours);
  70  |         await this.vacationDatesInput.fill(employee.vacationDates);
  71  |         await this.githubLinkInput.fill(employee.githubLink);
  72  |         await this.linkedinLinkInput.fill(employee.linkedinLink);
  73  |         await this.adminNoteInput.fill(employee.adminNote);
  74  | 
  75  |         await this.submitCreateEmployeeButton.click();
  76  |     }
  77  | 
  78  |     async expectEmployeeVisible(employee) {
  79  |         await expect(
  80  |             this.page.getByText(`${employee.firstName} ${employee.lastName}`).last()
  81  |         ).toBeVisible();
  82  | 
  83  |         await expect(
  84  |             this.page.getByText(employee.email).last()
  85  |         ).toBeVisible();
  86  | 
  87  |         await expect(
  88  |             this.page.getByText(employee.position).last()
  89  |         ).toBeVisible();
  90  |     }
  91  | 
  92  |     async searchByName(name) {
  93  |         await this.searchInput.fill(name);
  94  |     }
  95  | 
  96  |     employeeHeading(name) {
  97  |         return this.page.getByRole('heading', { name });
  98  |     }
  99  | 
  100 |     async expectEmployeeNameVisible(name) {
  101 |         await expect(this.employeeHeading(name).first()).toBeVisible();
  102 |     }
  103 | 
  104 |     async expectEmployeeNameHidden(name) {
  105 |         await expect(this.employeeHeading(name)).toHaveCount(0);
  106 |     }
  107 | 
  108 |     async expectEmployeeNameExists(name) {
  109 |         await expect(
  110 |             this.employeeHeading(name).first()
  111 |         ).toBeVisible();
  112 |     }
  113 | 
  114 |     employeeByEmail(email) {
  115 |         return this.page.getByText(email);
  116 |     }
  117 | 
  118 |     async expectEmployeeVisibleByEmail(email) {
  119 |         await expect(this.employeeByEmail(email)).toBeVisible();
  120 |     }
  121 | 
  122 |     async expectEmployeeHiddenByEmail(email) {
  123 |         await expect(this.employeeByEmail(email)).toHaveCount(0);
  124 |     }
  125 | 
  126 |     async deleteEmployeeByEmail(email) {
  127 |         this.page.once('dialog', dialog => dialog.accept());
  128 | 
  129 |         const employeeCard = this.employeeCardByEmail(email);
  130 | 
  131 |         await employeeCard.getByRole('button').nth(1).click();
  132 |     }
  133 | 
  134 |     async expectDeleteSuccessToastVisible() {
  135 |         await expect(
  136 |             this.page.getByRole('status').filter({
  137 |                 hasText: /employee deleted successfully/i,
  138 |             })
  139 |         ).toBeVisible();
  140 |     }
  141 | 
  142 |     async expectEmployeeDeleted(email) {
  143 |         await expect(
  144 |             this.page.getByText(email)
```