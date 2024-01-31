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
exports.waitingRoomRequestSocket = void 0;
const connection_1 = __importDefault(require("../../database/connection"));
const doctor_model_1 = __importDefault(require("../../models/doctor.model"));
const waitingRoomRequestSocket = (payload, socket, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit } = payload;
        const doctor = yield doctor_model_1.default.findOne({ where: { usuario_id: user === null || user === void 0 ? void 0 : user.usuario_id } });
        const data = yield connection_1.default.query("SELECT * FROM sala_espera_emr where id_doctor=" + (doctor === null || doctor === void 0 ? void 0 : doctor.id) + " order by fecha limit " + limit);
        /* const medicalBackground=await MedicalBackground.findByPk(38,{
           include:[
             {
               model:AllergyBackground
             },
             {
               model:VaccineBackground
             },
             {
               model:DiseaseBackground
             },
             {
               model:SurgeryBackground
             },
             {
               model:FamilyBackground
             }
           ]
         });*/
        socket.emit("waiting-room", {
            data: data[0],
        });
    }
    catch (error) {
        socket.emit("waiting-room", {
            data: []
        });
    }
});
exports.waitingRoomRequestSocket = waitingRoomRequestSocket;
//# sourceMappingURL=waiting.room.controller.js.map