"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/* "development": {
        "username": "fgolbnwqpeapxi",
        "password": "f0af243ca4dfa0c25dd2d45051603d651f21b8f563ef0f2759ef2f1a33c69131",
        "database": "da7taf9mh7td8a",
        "host": "ec2-52-200-188-218.compute-1.amazonaws.com",
        "dialect": "postgres",
        "dialectOptions": {
            "ssl": {
                "require": true,
                "rejectUnauthorized": false
            }
        }
    }*/
const db = new sequelize_1.Sequelize(process.env.DB, process.env.USERDB, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});
exports.default = db;
//# sourceMappingURL=connection.js.map