"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Schema, model } = require('mongoose');
const UserSchema = Schema({
    name: {
        type: String,
        require: [true, 'The name field has been required']
    },
    email: {
        type: String,
        require: [true, 'The email field has been required'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'The password field has been required']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        require: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"]
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    }
});
exports.default = model("Users", UserSchema);
//# sourceMappingURL=user.model.js.map