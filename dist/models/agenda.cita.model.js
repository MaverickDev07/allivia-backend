"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendaCita = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.AgendaCita = connection_1.default.define('app_agendacita', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true
    },
    id_paciente: sequelize_1.DataTypes.INTEGER,
    id_doctor: sequelize_1.DataTypes.INTEGER,
    id_tipocita: sequelize_1.DataTypes.INTEGER,
    id_pago: sequelize_1.DataTypes.INTEGER,
    id_tipoconsulta: sequelize_1.DataTypes.INTEGER,
    id_especialidad: sequelize_1.DataTypes.INTEGER,
    fecha: sequelize_1.DataTypes.STRING,
    inicioconsulta: sequelize_1.DataTypes.STRING,
    finconsulta: sequelize_1.DataTypes.STRING,
    estadoconsulta: sequelize_1.DataTypes.STRING,
    motivoconsulta: sequelize_1.DataTypes.STRING,
    precio: sequelize_1.DataTypes.DOUBLE,
    motivocancelacion: sequelize_1.DataTypes.STRING,
    tipoespecialidad: sequelize_1.DataTypes.STRING,
    horario: sequelize_1.DataTypes.STRING,
    reconsulta: sequelize_1.DataTypes.BOOLEAN,
    fecharegistro: sequelize_1.DataTypes.DATE,
    nit_comprador: sequelize_1.DataTypes.STRING,
    razon_social: sequelize_1.DataTypes.STRING,
    tipo_agenda: sequelize_1.DataTypes.STRING,
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_agendacita'
});
//# sourceMappingURL=agenda.cita.model.js.map