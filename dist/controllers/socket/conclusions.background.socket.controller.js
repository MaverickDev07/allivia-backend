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
exports.conclusionBackgroundSocket = void 0;
const connection_1 = __importDefault(require("../../database/connection"));
const agenda_cita_model_1 = require("../../models/agenda.cita.model");
const conclusion_agenda_cita_model_1 = require("../../models/conclusion_agenda_cita.model");
const medical_background_model_1 = require("../../models/medical_background.model");
const objetivos_seleccionados_model_1 = require("../../models/objetivos.seleccionados.model");
//fecha del dia actual
//finalizo sin exito finalizar
//app_conclusion_agenda_cita
const conclusionBackgroundSocket = (payload, socket, user) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield connection_1.default.transaction();
    const { conclusion } = payload;
    try {
        const goalsSeleted = conclusion.customGoals;
        const createObjects = [];
        yield objetivos_seleccionados_model_1.GoalsSelected.destroy({
            where: {
                id_paciente: BigInt(conclusion.id_paciente),
            },
            transaction: t
        });
        goalsSeleted.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
            createObjects.push({
                creado: new Date(),
                modificado: new Date(),
                estado: element.estado,
                id_objetivo: BigInt(element.app_objetivo.id),
                id_paciente: BigInt(conclusion.id_paciente),
            });
        }));
        yield Promise.all([
            objetivos_seleccionados_model_1.GoalsSelected.bulkCreate(createObjects, { transaction: t }),
        ]);
        const medicalBackgroundDB = yield medical_background_model_1.MedicalBackground.findByPk(Number(conclusion.id_antecendente));
        medicalBackgroundDB.categorizacion_paciente = conclusion.state;
        yield medicalBackgroundDB.save({
            transaction: t
        });
        const agendaDb = yield agenda_cita_model_1.AgendaCita.findByPk(Number(conclusion.id_agenda_cita));
        agendaDb.estadoconsulta = 'Finalizado';
        yield (agendaDb === null || agendaDb === void 0 ? void 0 : agendaDb.save({
            transaction: t
        }));
        const conclusionDb = yield conclusion_agenda_cita_model_1.ConclusionAgendaCita.create({
            conclusion: conclusion.conclusion,
            estado_ingreso: conclusion.state_initial,
            estado_saliente: conclusion.state,
            id_agenda_cita: Number(conclusion.id_agenda_cita),
            id_antecedente_medico: Number(conclusion.id_antecendente),
        }, {
            transaction: t
        });
        yield t.commit();
        socket.emit("operation-state", {
            error: false,
        });
    }
    catch (error) {
        yield t.rollback();
        console.log(error, conclusion);
        socket.emit("operation-state", {
            error: true,
        });
    }
});
exports.conclusionBackgroundSocket = conclusionBackgroundSocket;
//# sourceMappingURL=conclusions.background.socket.controller.js.map