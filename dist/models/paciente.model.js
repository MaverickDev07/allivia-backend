"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paciente = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const user_model_1 = require("./user.model");
exports.Paciente = connection_1.default.define('app_paciente', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true
    },
    usuario_id: sequelize_1.DataTypes.BIGINT,
    descripcion: sequelize_1.DataTypes.STRING,
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_paciente'
});
exports.Paciente.belongsTo(user_model_1.User, {
    foreignKey: 'usuario_id',
});
//# sourceMappingURL=paciente.model.js.map