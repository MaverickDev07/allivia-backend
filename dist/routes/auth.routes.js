"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/api/auth.controller");
const app_middleware_1 = __importDefault(require("../middleware/app.middleware"));
const jwt_middleware_1 = __importDefault(require("../middleware/jwt.middleware"));
const router = (0, express_1.Router)();
router.post("/login", [
    (0, express_validator_1.check)("email", "No pueden haber campos vacios en el formulario").notEmpty(),
    (0, express_validator_1.check)("password", "No pueden haber campos vacios en el formulario").notEmpty(),
    app_middleware_1.default
], auth_controller_1.postLogin);
router.post("/renew", [
    jwt_middleware_1.default,
    app_middleware_1.default
], auth_controller_1.renewToken);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map