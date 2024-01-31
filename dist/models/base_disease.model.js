"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDisease = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.BaseDisease = connection_1.default.define('app_enfermedad_base', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    descripcion: sequelize_1.DataTypes.TEXT,
    eliminado: sequelize_1.DataTypes.BOOLEAN,
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_enfermedad_base'
});
//# sourceMappingURL=base_disease.model.js.map