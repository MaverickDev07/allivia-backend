'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'app_antecedente_medico',
            'ultimo_diagnostico',
            Sequelize.DataTypes.STRING,
        );
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'app_antecedente_medico',
            'ultimo_diagnostico',
        );
    }
};