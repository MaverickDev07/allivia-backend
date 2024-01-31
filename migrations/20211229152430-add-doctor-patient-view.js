'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        queryInterface.sequelize.query("CREATE OR REPLACE VIEW public.doctor_paciente" +
            " AS " +
            " SELECT aa.id_paciente, " +
            " au.nombrearchivo AS foto, " +
            " (au.nombre::text || ' '::text) || au.apellido::text AS nombre, " +
            " date_part('year'::text, now()) - date_part('year'::text, au.fecha_nacimiento::date) AS edad, " +
            " aa.id_doctor, " +
            " am.id AS id_antecedente_medico, " +
            " am.ultimo_diagnostico " +
            " FROM app_agendacita aa " +
            " JOIN app_paciente ap ON ap.id = aa.id_paciente " +
            " JOIN app_doctor ad ON ad.id = aa.id_doctor " +
            " JOIN app_usuario au ON ap.usuario_id = au.usuario_id " +
            " JOIN app_antecedente_medico am ON am.id_paciente = aa.id_paciente " +
            " GROUP BY aa.id_paciente, au.nombrearchivo, au.nombre, au.nombre, au.apellido, (date_part('year'::text, now()) - date_part('year'::text, au.fecha_nacimiento::date)), aa.id_doctor, am.id; "
        );
    },

    down: async(queryInterface, Sequelize) => {
        queryInterface.sequelize.query('DROP VIEW public.doctor_paciente;')
    }
};