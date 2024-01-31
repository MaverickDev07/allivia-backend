"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyBackground = exports.DiseaseBackground = exports.SurgeryBackground = exports.VaccineBackground = exports.AllergyBackground = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const medical_background_model_1 = require("./medical_background.model");
const paciente_model_1 = require("./paciente.model");
exports.AllergyBackground = connection_1.default.define('app_antecedente_alergia', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_antecedente_medico: sequelize_1.DataTypes.BIGINT,
    id_alergia: sequelize_1.DataTypes.BIGINT,
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_antecedente_alergia'
});
exports.VaccineBackground = connection_1.default.define('app_antecedente_vacuna', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_antecedente_medico: sequelize_1.DataTypes.BIGINT,
    id_vacuna: sequelize_1.DataTypes.BIGINT,
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_antecedente_vacuna'
});
exports.SurgeryBackground = connection_1.default.define('app_antecedente_cirugia', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_antecedente_medico: sequelize_1.DataTypes.BIGINT,
    id_cirugia: sequelize_1.DataTypes.BIGINT,
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_antecedente_cirugia'
});
exports.DiseaseBackground = connection_1.default.define('app_antecedente_enfermedad_base', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_antecedente_medico: sequelize_1.DataTypes.BIGINT,
    id_enfermedad_base: sequelize_1.DataTypes.BIGINT,
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_antecedente_enfermedad_base'
});
exports.FamilyBackground = connection_1.default.define('app_antecedente_familia', {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: sequelize_1.DataTypes.TEXT,
    diabetes: sequelize_1.DataTypes.INTEGER,
    cancer: sequelize_1.DataTypes.TEXT,
    "enfemedadCorazon": sequelize_1.DataTypes.BOOLEAN,
    hipertension: sequelize_1.DataTypes.BOOLEAN,
    id_antecedente_medico: sequelize_1.DataTypes.BIGINT,
    enfemedad_corazon: sequelize_1.DataTypes.BOOLEAN,
}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'app_antecedente_familia'
});
medical_background_model_1.MedicalBackground.hasMany(exports.VaccineBackground, {
    foreignKey: 'id_antecedente_medico'
});
medical_background_model_1.MedicalBackground.hasMany(exports.AllergyBackground, {
    foreignKey: 'id_antecedente_medico'
});
medical_background_model_1.MedicalBackground.hasMany(exports.DiseaseBackground, {
    foreignKey: 'id_antecedente_medico'
});
medical_background_model_1.MedicalBackground.hasMany(exports.SurgeryBackground, {
    foreignKey: 'id_antecedente_medico'
});
medical_background_model_1.MedicalBackground.hasMany(exports.FamilyBackground, {
    foreignKey: 'id_antecedente_medico'
});
medical_background_model_1.MedicalBackground.belongsTo(paciente_model_1.Paciente, {
    foreignKey: 'id_paciente'
});
//# sourceMappingURL=medical_background_relations.js.map