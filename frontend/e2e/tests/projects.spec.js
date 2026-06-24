import { test } from '../fixtures/fixtures.js';

test.describe('Projects', () => {
    test('user can create project', async ({
        loggedInProjectsPage,
        project,
    }) => {
        await loggedInProjectsPage.openCreateProjectForm();

        await loggedInProjectsPage.createProject(project);

        await loggedInProjectsPage.expectOpened();

        await loggedInProjectsPage.expectProjectVisible(project);
    });

    test('user can delete project', async ({
        loggedInProjectsPage,
        project,
    }) => {
        await loggedInProjectsPage.openCreateProjectForm();

        await loggedInProjectsPage.createProject(project);

        await loggedInProjectsPage.expectProjectVisible(project);

        await loggedInProjectsPage.deleteProjectByName(project.name);

        await loggedInProjectsPage.expectDeleteSuccessToastVisible();

        await loggedInProjectsPage.expectProjectDeleted(project.name);
    });
});