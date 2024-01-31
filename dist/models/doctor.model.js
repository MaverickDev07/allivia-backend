"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Doctor = connection_1.default.define('app_doctor', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    usuario_id: sequelize_1.DataTypes.INTEGER,
    descripcion: sequelize_1.DataTypes.TEXT,
    pais: sequelize_1.DataTypes.TEXT,
    adjunto: sequelize_1.DataTypes.TEXT,
    recomendacion: sequelize_1.DataTypes.TEXT,
    biografia: sequelize_1.DataTypes.TEXT,
    pacientes: sequelize_1.DataTypes.TEXT,
    experiencia: sequelize_1.DataTypes.TEXT,
    path: sequelize_1.DataTypes.TEXT,
    nombrearchivo: sequelize_1.DataTypes.TEXT,
    tipo_doctor: sequelize_1.DataTypes.TEXT
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_doctor'
});
exports.default = Doctor;
//# sourceMappingURL=doctor.model.js.map