"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medical_consultations_controller_1 = require("../controllers/api/medical.consultations.controller");
const jwt_middleware_1 = __importDefault(require("../middleware/jwt.middleware"));
const router = (0, express_1.Router)();
router.get("/waiting-room", [
    jwt_middleware_1.default,
], medical_consultations_controller_1.getWaitingRoom);
exports.default = router;
//# sourceMappingURL=medical.consultations.routes.js.map