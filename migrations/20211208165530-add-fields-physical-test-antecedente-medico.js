'use strict';
//npx sequelize-cli migration:generate --name add-last-diagnostic-medical-background
//npx sequelize-cli db:migrate
//npx sequelize-cli db:migrate:undo
//npx sequelize-cli model:generate --name app_cancer --attributes descripcion:string,eliminado:boolean

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'app_antecedente_medico',
                'mini_mental_test',
                Sequelize.DataTypes.JSON,
            ),
            queryInterface.addColumn(
                'app_antecedente_medico',
                'cabeza',
                Sequelize.DataTypes.JSON,
            ),
            queryInterface.addColumn(
                'app_antecedente_medico',
                'cuello',
                Sequelize.DataTypes.JSON,
            ),
            queryInterface.addColumn(
                'app_antecedente_medico',
                'torax_anterior',
                Sequelize.DataTypes.JSON,
            ),
            queryInterface.addColumn(
                'app_antecedente_medico',
                'torax_posterior',
                Sequelize.DataTypes.JSON,
            ),
            queryInterface.addColumn(
                'app_antecedente_medico',
                'abdomen',
                Sequelize.DataTypes.JSON,
            ),
            queryInterface.addColumn(
                'app_antecedente_medico',
                'sistema_nervioso_perfiferico',
                Sequelize.DataTypes.JSON,
            ),
            queryInterface.addColumn(
                'app_antecedente_medico',
                'sistema_nervioso_motor',
                Sequelize.DataTypes.JSON,
            ),
            queryInterface.addColumn(
                'app_antecedente_medico',
                'extremidades',
                Sequelize.DataTypes.JSON,
            ),
        ]);


    },

    down: async(queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn(
                'app_antecedente_medico',
                'mini_mental_test',
            ),
            queryInterface.removeColumn(
                'app_antecedente_medico',
                'cuello'
            ),
            queryInterface.removeColumn(
                'app_antecedente_medico',
                'torax_anterior'
            ),
            queryInterface.removeColumn(
                'app_antecedente_medico',
                'torax_posterior',
            ),
            queryInterface.removeColumn(
                'app_antecedente_medico',
                'abdomen',
            ),
            queryInterface.removeColumn(
                'app_antecedente_medico',
                'sistema_nervioso_perfiferico',
            ),
            queryInterface.removeColumn(
                'app_antecedente_medico',
                'sistema_nervioso_motor',
            ),
            queryInterface.removeColumn(
                'app_antecedente_medico',
                'extremidades',
            ),
        ]);
    }
};