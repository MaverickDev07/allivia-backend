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
exports.renewToken = exports.postLogin = void 0;
const user_model_1 = require("../../models/user.model");
const doctor_model_1 = __importDefault(require("../../models/doctor.model"));
const generate_jwt_1 = __importDefault(require("../../helpers/generate-jwt"));
const connection_1 = __importDefault(require("../../database/connection"));
const url_1 = require("../../helpers/url");
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const { email, password } = body;
        const user = yield user_model_1.User.findOne({ where: { email }, include: [{
                    model: doctor_model_1.default,
                }] });
        if (!user) {
            res.status(400).json({
                token: null,
                user: null,
                ok: false,
                errors: [
                    {
                        "msg": "Credenciales incorrectas",
                        "param": null,
                    }
                ]
            });
            return;
        }
        const data = yield connection_1.default.query("select pin_password = crypt(CAST('" + password + "' AS TEXT), pin_password) as authentication FROM app_usuario WHERE email='" + email + "'");
        const validPassword = data[0][0].authentication;
        if (!validPassword) {
            res.status(400).json({
                token: null,
                user: null,
                ok: false,
                errors: [
                    {
                        "msg": "Credenciales incorrectas",
                        "param": null,
                    }
                ]
            });
            return;
        }
        const token = yield (0, generate_jwt_1.default)(user.usuario_id, user.usuario);
        const ok = true;
        user.nombrearchivo = (0, url_1.urlDoctorPhotoServer)() + "/" + user.nombrearchivo;
        console.log(user.nombrearchivo);
        res.json({ ok, token, user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postLogin = postLogin;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const { uid } = body;
        const user = yield user_model_1.User.findByPk(uid);
        if (!user) {
            res.status(404).json({
                errors: [
                    {
                        "msg": "Usuario no encontrado",
                        "param": null,
                    }
                ]
            });
        }
        const token = yield (0, generate_jwt_1.default)(user.usuario_id, user.usuario);
        res.json({ user, token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.renewToken = renewToken;
//# sourceMappingURL=auth.controller.js.map