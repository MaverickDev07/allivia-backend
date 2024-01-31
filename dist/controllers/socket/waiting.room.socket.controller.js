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
exports.clinicHistoryRequestSocket = exports.waitingRoomRequestSocket = void 0;
const connection_1 = __importDefault(require("../../database/connection"));
const date_helper_1 = require("../../helpers/date.helper");
const url_1 = require("../../helpers/url");
const _allergies_model_1 = require("../../models/ allergies.model");
const agenda_cita_model_1 = require("../../models/agenda.cita.model");
const base_disease_model_1 = require("../../models/base_disease.model");
const cancer_model_1 = require("../../models/cancer.model");
const doctor_model_1 = __importDefault(require("../../models/doctor.model"));
const medical_background_model_1 = require("../../models/medical_background.model");
const medical_background_relations_1 = require("../../models/medical_background_relations");
const objetivos_model_1 = require("../../models/objetivos.model");
const objetivos_seleccionados_model_1 = require("../../models/objetivos.seleccionados.model");
const paciente_model_1 = require("../../models/paciente.model");
const surgery_model_1 = require("../../models/surgery.model");
const user_model_1 = require("../../models/user.model");
const vaccines_model_1 = require("../../models/vaccines.model");
const waitingRoomRequestSocket = (payload, socket, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit } = payload;
        const now = (0, date_helper_1.dateTimeNowInitDay)();
        const doctor = yield doctor_model_1.default.findOne({ where: { usuario_id: user === null || user === void 0 ? void 0 : user.usuario_id } });
        const rawQuery = "SELECT id, CONCAT('" + (0, url_1.urlPatientPhotoServer)() + "/', foto) as foto,foto as path, nombre, edad, tipocita, fecha,fecha_fin, estadoconsulta, id_paciente, id_doctor, id_tipo_cita, id_antecedente_medico  FROM public.sala_espera_emr where id_doctor=" + (doctor === null || doctor === void 0 ? void 0 : doctor.id) + " and id_tipo_cita=2 and estadoconsulta='Confirmada' and fecha>'" + now + "' order by fecha limit " + limit;
        const data = yield connection_1.default.query(rawQuery);
        socket.emit("waiting-room", {
            data: data[0],
        });
    }
    catch (error) {
        console.log(error);
        socket.emit("waiting-room", {
            data: []
        });
    }
});
exports.waitingRoomRequestSocket = waitingRoomRequestSocket;
const clinicHistoryRequestSocket = (payload, socket, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { medical_background_id, id_agenda } = payload;
        const appointmentAgenda = yield agenda_cita_model_1.AgendaCita.findByPk(id_agenda);
        const medicalBackground = yield medical_background_model_1.MedicalBackground.findByPk(medical_background_id, {
            include: [
                {
                    model: medical_background_relations_1.AllergyBackground
                },
                {
                    model: medical_background_relations_1.VaccineBackground
                },
                {
                    model: medical_background_relations_1.DiseaseBackground
                },
                {
                    model: medical_background_relations_1.SurgeryBackground
                },
                {
                    model: medical_background_relations_1.FamilyBackground
                }
            ]
        });
        const vaccines = yield vaccines_model_1.Vaccine.findAll({
            where: {
                eliminado: false
            }
        });
        const surgeries = yield surgery_model_1.Surgery.findAll({
            where: {
                eliminado: false
            }
        });
        const allergies = yield _allergies_model_1.Allergies.findAll({
            where: {
                eliminado: false
            }
        });
        const baseDisease = yield base_disease_model_1.BaseDisease.findAll({
            where: {
                eliminado: false
            }
        });
        const cancer = yield cancer_model_1.Cancer.findAll({
            where: {
                eliminado: false
            }
        });
        const goals = yield objetivos_model_1.Goals.findAll();
        const goalsSelected = yield objetivos_seleccionados_model_1.GoalsSelected.findAll({
            where: {
                id_paciente: BigInt(medicalBackground.id_paciente)
            },
            include: [
                {
                    model: objetivos_model_1.Goals,
                },
            ]
        });
        const paciente = yield paciente_model_1.Paciente.findByPk(Number(medicalBackground.id_paciente), {
            include: [
                {
                    model: user_model_1.User
                }
            ]
        });
        paciente.app_usuario.nombrearchivo = (0, url_1.urlPatientPhotoServer)() + "/" + paciente.app_usuario.nombrearchivo;
        socket.emit("clinic-history-data", {
            medicalBackground,
            vaccines,
            surgeries,
            allergies,
            baseDisease,
            goals,
            goalsSelected,
            paciente,
            cancer,
            appointmentAgenda
        });
    }
    catch (error) {
        console.log(error);
        socket.emit("clinic-history-data", {
            data: []
        });
    }
});
exports.clinicHistoryRequestSocket = clinicHistoryRequestSocket;
//# sourceMappingURL=waiting.room.socket.controller.js.map