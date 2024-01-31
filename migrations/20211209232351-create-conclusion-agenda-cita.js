'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('app_conclusion_agenda_cita', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            conclusion: {
                type: Sequelize.STRING
            },
            estado_ingreso: {
                type: Sequelize.STRING
            },
            estado_saliente: {
                type: Sequelize.STRING
            },
            id_agenda_cita: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'app_agendacita',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'NO ACTION',
                defaultValue: null,
            },
            id_antecedente_medico: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'app_antecedente_medico',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'NO ACTION',
                defaultValue: null,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('app_conclusion_agenda_cita');
    }
};