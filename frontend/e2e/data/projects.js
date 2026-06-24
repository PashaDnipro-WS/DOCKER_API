export const createProjectData = (overrides = {}) => {
    const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    return {
        name: `QA Project ${uniqueId}`,
        description: 'Project created by Playwright test',
        wage: '0.1',
        status: 'active',

        ...overrides,
    };
};