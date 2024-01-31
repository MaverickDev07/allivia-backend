"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medicalBackgroundCLinicHistoryUpdateSocket = void 0;
const connection_1 = __importDefault(require("../../database/connection"));
const _allergies_model_1 = require("../../models/ allergies.model");
const base_disease_model_1 = require("../../models/base_disease.model");
const cancer_model_1 = require("../../models/cancer.model");
const medical_background_model_1 = require("../../models/medical_background.model");
const medical_background_relations_1 = require("../../models/medical_background_relations");
const surgery_model_1 = require("../../models/surgery.model");
const vaccines_model_1 = require("../../models/vaccines.model");
const medicalBackgroundCLinicHistoryUpdateSocket = (payload, socket, user) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield connection_1.default.transaction();
    try {
        const { medical_background } = payload;
        const vaccines = medical_background.app_antecedente_vacunas;
        const allergies = medical_background.app_antecedente_alergia;
        const baseDiseases = medical_background.app_antecedente_enfermedad_bases;
        const surgeries = medical_background.app_antecedente_cirugia;
        const familyBackground = medical_background.app_antecedente_familia;
        const nuevas_alergias = medical_background.nuevas_alergias;
        const nuevas_cirugia = medical_background.nuevas_cirugia;
        const nuevas_enfermedad_bases = medical_background.nuevas_enfermedad_bases;
        const nuevas_vacunas = medical_background.nuevas_vacunas;
        const medicalBackgroundDB = yield medical_background_model_1.MedicalBackground.findByPk(Number(medical_background.id));
        medicalBackgroundDB.fecha_nacimiento = medical_background.fecha_nacimiento;
        medicalBackgroundDB.genero = medical_background.genero;
        medicalBackgroundDB.alcohol = medical_background.alcohol;
        medicalBackgroundDB.fuma = medical_background.fuma;
        medicalBackgroundDB.cafeina = medical_background.cafeina;
        medicalBackgroundDB.ejercicio = medical_background.ejercicio;
        medicalBackgroundDB.drogas = medical_background.drogas;
        yield medicalBackgroundDB.save({
            transaction: t
        });
        yield medical_background_relations_1.VaccineBackground.destroy({
            where: {
                id_antecedente_medico: Number(medical_background.id)
            },
            transaction: t
        });
        yield medical_background_relations_1.AllergyBackground.destroy({
            where: {
                id_antecedente_medico: Number(medical_background.id)
            },
            transaction: t
        });
        yield medical_background_relations_1.SurgeryBackground.destroy({
            where: {
                id_antecedente_medico: Number(medical_background.id)
            },
            transaction: t
        });
        yield medical_background_relations_1.DiseaseBackground.destroy({
            where: {
                id_antecedente_medico: Number(medical_background.id)
            },
            transaction: t
        });
        yield medical_background_relations_1.FamilyBackground.destroy({
            where: {
                id_antecedente_medico: Number(medical_background.id)
            }
        });
        const [vaccinesNews, allergiesNews, surgeriesNews, baseDiseaseNews] = yield Promise.all([
            vaccines_model_1.Vaccine.bulkCreate(nuevas_vacunas, { transaction: t }),
            _allergies_model_1.Allergies.bulkCreate(nuevas_alergias, { transaction: t }),
            surgery_model_1.Surgery.bulkCreate(nuevas_cirugia, { transaction: t }),
            base_disease_model_1.BaseDisease.bulkCreate(nuevas_enfermedad_bases, { transaction: t }),
        ]);
        let vaccinesBackgroundNew = [];
        let allergiesBackgroundNew = [];
        let surgeriesBackgroundNew = [];
        let baseDiseaseBackgroundNew = [];
        vaccinesNews.forEach(element => {
            vaccinesBackgroundNew.push({
                id_antecedente_medico: Number(medical_background.id),
                id_vacuna: element.id,
            });
        });
        allergiesNews.forEach(element => {
            allergiesBackgroundNew.push({
                id_antecedente_medico: Number(medical_background.id),
                id_alergia: element.id,
            });
        });
        surgeriesNews.forEach(element => {
            surgeriesBackgroundNew.push({
                id_antecedente_medico: Number(medical_background.id),
                id_cirugia: element.id,
            });
        });
        baseDiseaseNews.forEach(element => {
            baseDiseaseBackgroundNew.push({
                id_antecedente_medico: Number(medical_background.id),
                id_enfermedad_base: element.id,
            });
        });
        let newCancer = [];
        familyBackground.forEach(element => {
            if (element.nuevo_valor_cancer) {
                newCancer.push({
                    descripcion: element.cancer,
                    eliminado: false
                });
            }
        });
        yield Promise.all([
            medical_background_relations_1.VaccineBackground.bulkCreate(vaccines, { transaction: t }),
            medical_background_relations_1.AllergyBackground.bulkCreate(allergies, { transaction: t }),
            medical_background_relations_1.SurgeryBackground.bulkCreate(surgeries, { transaction: t }),
            medical_background_relations_1.DiseaseBackground.bulkCreate(baseDiseases, { transaction: t }),
            medical_background_relations_1.FamilyBackground.bulkCreate(familyBackground, { transaction: t }),
        ]);
        yield Promise.all([
            medical_background_relations_1.VaccineBackground.bulkCreate(vaccinesBackgroundNew, { transaction: t }),
            medical_background_relations_1.AllergyBackground.bulkCreate(allergiesBackgroundNew, { transaction: t }),
            medical_background_relations_1.SurgeryBackground.bulkCreate(surgeriesBackgroundNew, { transaction: t }),
            medical_background_relations_1.DiseaseBackground.bulkCreate(baseDiseaseBackgroundNew, { transaction: t }),
            cancer_model_1.Cancer.bulkCreate(newCancer, { transaction: t }),
        ]);
        yield t.commit();
        socket.emit("operation-state", {
            error: false,
        });
    }
    catch (error) {
        console.log(error);
        yield t.rollback();
        socket.emit("operation-state", {
            error: true,
        });
    }
});
exports.medicalBackgroundCLinicHistoryUpdateSocket = medicalBackgroundCLinicHistoryUpdateSocket;
//# sourceMappingURL=medical.background.socket.controller.js.map