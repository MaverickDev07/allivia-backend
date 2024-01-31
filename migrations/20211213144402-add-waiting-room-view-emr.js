'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        queryInterface.sequelize.query("CREATE OR REPLACE VIEW public.sala_espera_emr " +
            " AS " +
            " SELECT aa.id, " +
            "  au.nombrearchivo AS foto, " +
            " (au.nombre::text || ' '::text) || au.apellido::text AS nombre, " +
            " date_part('year'::text, now()) - date_part('year'::text, au.fecha_nacimiento::date) AS edad, " +
            " tc.descripcion AS tipocita, " +
            " aa.fecha::timestamp without time zone AS fecha, " +
            "aa.fecha::timestamp without time zone + 2::double precision * '00:01:00'::interval AS fecha_fin, " +
            " aa.estadoconsulta, " +
            " aa.id_paciente, " +
            " aa.id_doctor, " +
            " tc.id AS id_tipo_cita, " +
            " am.id AS id_antecedente_medico " +
            " FROM app_agendacita aa " +
            " JOIN app_tipocita tc ON tc.id = aa.id_tipocita " +
            " JOIN app_paciente ap ON ap.id = aa.id_paciente " +
            " JOIN app_doctor ad ON ad.id = aa.id_doctor " +
            " JOIN app_usuario au ON ap.usuario_id = au.usuario_id " +
            " JOIN app_antecedente_medico am ON am.id_paciente = aa.id_paciente;");
    },

    down: async(queryInterface, Sequelize) => {
        queryInterface.sequelize.query('DROP VIEW public.sala_espera_emr;')
    }
};