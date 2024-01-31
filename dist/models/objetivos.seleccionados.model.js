"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalsSelected = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const objetivos_model_1 = require("./objetivos.model");
exports.GoalsSelected = connection_1.default.define('app_objetivos_seleccionados', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    creado: sequelize_1.DataTypes.DATE,
    modificado: sequelize_1.DataTypes.DATE,
    estado: sequelize_1.DataTypes.STRING,
    id_objetivo: sequelize_1.DataTypes.BIGINT,
    id_paciente: sequelize_1.DataTypes.BIGINT,
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_objetivos_seleccionados'
});
exports.GoalsSelected.belongsTo(objetivos_model_1.Goals, {
    foreignKey: 'id_objetivo',
});
//# sourceMappingURL=objetivos.seleccionados.model.js.map