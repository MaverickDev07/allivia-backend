"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_controller_1 = require("../controllers/api/users.controller");
const users_validators_1 = require("../helpers/users-validators");
const app_middleware_1 = __importDefault(require("../middleware/app.middleware"));
const jwt_middleware_1 = __importDefault(require("../middleware/jwt.middleware"));
const router = (0, express_1.Router)();
router.get("/", [
    jwt_middleware_1.default,
], users_controller_1.getUsers);
router.get("/:id", [
    jwt_middleware_1.default,
], users_controller_1.getUser);
router.post("/", [
    jwt_middleware_1.default,
    (0, express_validator_1.check)("username", "El nombre es obligatorio").notEmpty(),
    (0, express_validator_1.check)("password", "El password debe ser de mas de 6 letras").isLength({ min: 6 }),
    (0, express_validator_1.check)("email").custom(users_validators_1.existEmail),
    app_middleware_1.default
], users_controller_1.postUser);
router.put("/:id", [
    jwt_middleware_1.default,
    (0, express_validator_1.check)("email", "El campo debe ser un email valido").isEmail(),
    (0, express_validator_1.check)("id").custom(users_validators_1.existUserId),
    app_middleware_1.default
], users_controller_1.putUser);
router.delete("/:id", [
    jwt_middleware_1.default,
    (0, express_validator_1.check)("id").custom(users_validators_1.existUserId),
    app_middleware_1.default
], users_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users.routes.js.map