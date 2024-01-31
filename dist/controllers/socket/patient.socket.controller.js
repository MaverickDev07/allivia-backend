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
exports.CreateMedicalBackgroundRequestSocket = void 0;
const medical_background_model_1 = require("../../models/medical_background.model");
const CreateMedicalBackgroundRequestSocket = (payload, socket, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_paciente } = payload;
        const medicalBackground = yield medical_background_model_1.MedicalBackground.create({
            genero: '',
            fecha_nacimiento: '',
            id_paciente: id_paciente,
            fuma: -1,
            alcohol: -1,
            cafeina: -1,
            ejercicio: -1,
            drogas: -1,
            testifico: false,
        });
        socket.emit("medical-background-created", {
            medicalBackground
        });
    }
    catch (error) {
        console.log(error);
        socket.emit("medical-background-created", {
            data: []
        });
    }
});
exports.CreateMedicalBackgroundRequestSocket = CreateMedicalBackgroundRequestSocket;
//# sourceMappingURL=patient.socket.controller.js.map