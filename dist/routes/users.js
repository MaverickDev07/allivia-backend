"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const users_controller_1 = require("../controllers/users.controller");
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const router = (0, express_1.Router)();
router.get("/", users_controller_1.getUsers);
router.get("/:id", users_controller_1.getUser);
router.post("/", [
    (0, express_validator_1.check)("name", "El nombre es obligatorio").notEmpty(),
    (0, express_validator_1.check)("password", "El password debe ser de mas de 6 letras").isLength({ min: 6 }),
    (0, express_validator_1.check)("email", "El correo no es valido").isEmail(),
    (0, express_validator_1.check)("role", "El rol no es valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    user_middleware_1.default
], users_controller_1.postUser);
router.put("/:id", users_controller_1.putUser);
router.delete("/:id", users_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=users.js.map