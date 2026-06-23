// migrations/20231005000000-remove-currentProject-field.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Users', { schema: 'public' });

    if (table.currentProject) {
      await queryInterface.removeColumn('Users', 'currentProject', { schema: 'public' });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Users', { schema: 'public' });

    if (!table.currentProject) {
      await queryInterface.addColumn(
        'Users',
        'currentProject',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
        { schema: 'public' }
      );
    }
  },
};