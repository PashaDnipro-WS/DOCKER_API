export const adminUser = {
  email: 'admin@example.com',
  password: 'adminpassword',
};

export const invalidAdminUser = {
  email: 'admin@example.com',
  password: 'wrongpassword',
};

export const newEmployee = {
  firstName: 'John',
  lastName: 'Tester',
  middleName: 'QA',
  email: `john.tester.${Date.now()}@example.com`,
  password: 'password123',
  phone: '+1234567890',
  birthDate: '1998-06-23',
  programmingLanguage: 'JavaScript',
  country: 'Ukraine',
  bankCard: '1234-5678-9012-3456',
  role: 'employee',
  position: 'QA Engineer',
  salary: '1000',
  mentorName: 'Default Admin',
  englishLevel: 'B1',
  workingHours: '40',
  vacationDates: '2026-07-01',
  githubLink: 'https://github.com/tester',
  linkedinLink: 'https://linkedin.com/in/tester',
  adminNote: 'Created by Playwright test',
};

export const updatedEmployeeData = {
  phone: '+380991112233',
};