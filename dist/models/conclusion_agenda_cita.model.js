"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConclusionAgendaCita = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.ConclusionAgendaCita = connection_1.default.define('app_conclusion_agenda_cita', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    conclusion: sequelize_1.DataTypes.TEXT,
    estado_ingreso: sequelize_1.DataTypes.TEXT,
    estado_saliente: sequelize_1.DataTypes.TEXT,
    id_agenda_cita: sequelize_1.DataTypes.BIGINT,
    id_antecedente_medico: sequelize_1.DataTypes.BIGINT,
}, {
    timestamps: true,
    freezeTableName: true,
    tableName: 'app_conclusion_agenda_cita'
});
//# sourceMappingURL=conclusion_agenda_cita.model.js.map