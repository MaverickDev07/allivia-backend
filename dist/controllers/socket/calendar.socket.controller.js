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
exports.CalendarRequestSocket = void 0;
const doctor_model_1 = __importDefault(require("../../models/doctor.model"));
const url_1 = require("../../helpers/url");
const connection_1 = __importDefault(require("../../database/connection"));
const CalendarRequestSocket = (payload, socket, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit } = payload;
        const doctor = yield doctor_model_1.default.findOne({ where: { usuario_id: user === null || user === void 0 ? void 0 : user.usuario_id } });
        const data = yield connection_1.default.query("SELECT id, CONCAT('" + (0, url_1.urlPatientPhotoServer)() + "/', foto) as foto,foto as path, nombre, edad, tipocita, fecha,fecha_fin, estadoconsulta, id_paciente, id_doctor, id_tipo_cita, id_antecedente_medico  FROM public.sala_espera_emr where id_doctor=" + (doctor === null || doctor === void 0 ? void 0 : doctor.id) + " and id_tipo_cita=2 and estadoconsulta='Confirmada' ");
        socket.emit("calendar-data", {
            data: data[0],
        });
    }
    catch (error) {
        console.log(error);
        socket.emit("calendar-data", {
            data: []
        });
    }
});
exports.CalendarRequestSocket = CalendarRequestSocket;
//# sourceMappingURL=calendar.socket.controller.js.map