"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Goals = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
exports.Goals = connection_1.default.define('app_objetivos', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true
    },
    creado: sequelize_1.DataTypes.DATE,
    modificado: sequelize_1.DataTypes.DATE,
    estado: sequelize_1.DataTypes.STRING,
    objetivo: sequelize_1.DataTypes.STRING,
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_objetivos'
});
//# sourceMappingURL=objetivos.model.js.map