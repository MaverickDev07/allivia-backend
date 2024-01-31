"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const doctor_model_1 = __importDefault(require("./doctor.model"));
exports.User = connection_1.default.define('app_usuario', {
    usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    descricpion: sequelize_1.DataTypes.TEXT,
    email: sequelize_1.DataTypes.TEXT,
    nombre: sequelize_1.DataTypes.TEXT,
    apellido: sequelize_1.DataTypes.TEXT,
    carnet: sequelize_1.DataTypes.TEXT,
    fecha_nacimiento: sequelize_1.DataTypes.TEXT,
    path: sequelize_1.DataTypes.TEXT,
    usuario: sequelize_1.DataTypes.TEXT,
    pin_password: sequelize_1.DataTypes.TEXT,
    estado: sequelize_1.DataTypes.TEXT,
    creado: sequelize_1.DataTypes.DATE,
    creado_por: sequelize_1.DataTypes.TEXT,
    modificado: sequelize_1.DataTypes.DATE,
    modificado_por: sequelize_1.DataTypes.TEXT,
    reestablecer_password: sequelize_1.DataTypes.BOOLEAN,
    grupo_id: sequelize_1.DataTypes.INTEGER,
    fecha_fin: sequelize_1.DataTypes.DATE,
    tipo_autenticacion_id: sequelize_1.DataTypes.INTEGER,
    password_valido_hasta: sequelize_1.DataTypes.DATE,
    genero: sequelize_1.DataTypes.CHAR,
    direccion: sequelize_1.DataTypes.TEXT,
    telefono: sequelize_1.DataTypes.TEXT,
    nombrearchivo: sequelize_1.DataTypes.TEXT,
    id_device: sequelize_1.DataTypes.TEXT,
    revision: sequelize_1.DataTypes.BOOLEAN,
    token: sequelize_1.DataTypes.TEXT
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_usuario'
});
exports.User.hasOne(doctor_model_1.default, {
    foreignKey: {
        name: 'usuario_id'
    }
});
//# sourceMappingURL=user.model.js.map