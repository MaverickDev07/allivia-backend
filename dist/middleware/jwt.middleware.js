"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSocketValidation = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const jwtValidation = (req, res, next) => {
    let bearerToken = req.header("authorization");
    if (bearerToken) {
        bearerToken = bearerToken.split(" ")[1];
    }
    else {
        res.status(401).json({
            msg: "no hay token en la peticion"
        });
    }
    try {
        const data = jwt.verify(bearerToken, process.env.SECRETJWT || "");
        if (data.id) {
            req.body.uid = data.id;
            req.params.uid = data.id;
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "token no valido"
        });
    }
};
const jwtSocketValidation = (bearerToken = '') => {
    try {
        const data = jwt.verify(bearerToken, process.env.SECRETJWT || "");
        return user_model_1.User.findByPk(data.id);
    }
    catch (error) {
        return null;
    }
};
exports.jwtSocketValidation = jwtSocketValidation;
exports.default = jwtValidation;
//# sourceMappingURL=jwt.middleware.js.map