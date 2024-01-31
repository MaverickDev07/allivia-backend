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
exports.physicalTestUpdateSocket = void 0;
const medical_background_model_1 = require("../../models/medical_background.model");
const physicalTestUpdateSocket = (payload, socket, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { medical_background, } = payload;
        const medicalBackgroundDB = yield medical_background_model_1.MedicalBackground.findByPk(Number(medical_background.id));
        medicalBackgroundDB.cabeza = medical_background.cabeza,
            medicalBackgroundDB.mini_mental_test = medical_background.mini_mental_test;
        medicalBackgroundDB.cuello = medical_background.cuello,
            medicalBackgroundDB.torax_anterior = medical_background.torax_anterior,
            medicalBackgroundDB.torax_posterior = medical_background.torax_posterior,
            medicalBackgroundDB.abdomen = medical_background.abdomen,
            medicalBackgroundDB.sistema_nervioso_perfiferico = medical_background.sistema_nervioso_perfiferico,
            medicalBackgroundDB.sistema_nervioso_motor = medical_background.sistema_nervioso_motor,
            medicalBackgroundDB.extremidades = medical_background.extremidades;
        yield medicalBackgroundDB.save();
        socket.emit("operation-state", {
            error: false,
        });
    }
    catch (error) {
        console.log(error);
        socket.emit("operation-state", {
            error: true,
        });
    }
});
exports.physicalTestUpdateSocket = physicalTestUpdateSocket;
//# sourceMappingURL=physica.test.background.socket.controller.js.map