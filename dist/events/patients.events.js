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
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientsListeners = void 0;
const patient_socket_controller_1 = require("../controllers/socket/patient.socket.controller");
const patients_socket_controller_1 = require("../controllers/socket/patients.socket.controller");
const patientsListeners = function (socket, user) {
    return __awaiter(this, void 0, void 0, function* () {
        socket.on('patients-request', (payload) => {
            (0, patients_socket_controller_1.PatientsRequestSocket)(payload, socket, user);
        });
        socket.on('patient-medical-background-create-request', (payload) => {
            (0, patient_socket_controller_1.CreateMedicalBackgroundRequestSocket)(payload, socket, user);
        });
    });
};
exports.patientsListeners = patientsListeners;
//# sourceMappingURL=patients.events.js.map