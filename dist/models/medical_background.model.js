"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalBackground = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.MedicalBackground = connection_1.default.define('app_antecedente_medico', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    genero: sequelize_1.DataTypes.TEXT,
    fecha_nacimiento: sequelize_1.DataTypes.TEXT,
    id_paciente: sequelize_1.DataTypes.BIGINT,
    fuma: sequelize_1.DataTypes.INTEGER,
    alcohol: sequelize_1.DataTypes.INTEGER,
    cafeina: sequelize_1.DataTypes.INTEGER,
    ejercicio: sequelize_1.DataTypes.INTEGER,
    drogas: sequelize_1.DataTypes.INTEGER,
    testifico: sequelize_1.DataTypes.BOOLEAN,
    mini_mental_test: sequelize_1.DataTypes.JSON,
    cabeza: sequelize_1.DataTypes.JSON,
    cuello: sequelize_1.DataTypes.JSON,
    torax_anterior: sequelize_1.DataTypes.JSON,
    torax_posterior: sequelize_1.DataTypes.JSON,
    abdomen: sequelize_1.DataTypes.JSON,
    sistema_nervioso_perfiferico: sequelize_1.DataTypes.JSON,
    sistema_nervioso_motor: sequelize_1.DataTypes.JSON,
    extremidades: sequelize_1.DataTypes.JSON,
    categorizacion_paciente: sequelize_1.DataTypes.STRING
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_antecedente_medico'
});
//# sourceMappingURL=medical_background.model.js.map