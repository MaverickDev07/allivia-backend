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
exports.getWaitingRoom = void 0;
const connection_1 = __importDefault(require("../../database/connection"));
const doctor_model_1 = __importDefault(require("../../models/doctor.model"));
const user_model_1 = require("../../models/user.model");
const getWaitingRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.body;
    try {
        const user = yield user_model_1.User.findByPk(uid);
        const doctor = yield doctor_model_1.default.findOne({ where: { usuario_id: user === null || user === void 0 ? void 0 : user.usuario_id } });
        const data = yield connection_1.default.query("SELECT * FROM sala_espera_emr where id_doctor=" + (doctor === null || doctor === void 0 ? void 0 : doctor.id) + " order by fecha limit 6");
        res.json(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error inesperado"
        });
    }
});
exports.getWaitingRoom = getWaitingRoom;
//# sourceMappingURL=medical.consultations.controller.js.map