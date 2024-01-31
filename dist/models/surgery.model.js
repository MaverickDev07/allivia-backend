"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Surgery = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.Surgery = connection_1.default.define('app_cirugia', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: sequelize_1.DataTypes.TEXT,
    eliminado: sequelize_1.DataTypes.BOOLEAN,
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_cirugia'
});
//# sourceMappingURL=surgery.model.js.map