"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Schema, model } = require('mongoose');
const RolesSchema = Schema({
    role: {
        type: String,
        require: [true, "El rol es requerido"]
    }
});
exports.default = model("Rols", RolesSchema);
//# sourceMappingURL=role.model.js.map