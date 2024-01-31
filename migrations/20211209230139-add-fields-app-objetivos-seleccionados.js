'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await Promise.all([
            queryInterface.addColumn(
                'app_objetivos_seleccionados',
                'id_objetivo',
                Sequelize.DataTypes.BIGINT,
            ),
            queryInterface.addColumn(
                'app_objetivos_seleccionados',
                'id_paciente',
                Sequelize.DataTypes.BIGINT,
            )
        ]);

        queryInterface.addConstraint('app_objetivos_seleccionados', {
                fields: ['id_objetivo'],
                type: 'foreign key',
                references: {
                    table: 'app_objetivos',
                    field: 'id'
                },
                onDelete: 'no action',
                onUpdate: 'no action'
            }),
            queryInterface.addConstraint('app_objetivos_seleccionados', {
                fields: ['id_paciente'],
                type: 'foreign key',
                references: {
                    table: 'app_paciente',
                    field: 'id'
                },
                onDelete: 'no action',
                onUpdate: 'no action'
            })


    },

    down: async(queryInterface, Sequelize) => {

    }
};