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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const express_validator_1 = require("express-validator");
const user_model_1 = require("../models/user.model");
const bcript = require("bcrypt");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit = 2, page = 1 } = req.query;
        const [total, users] = yield Promise.all([
            user_model_1.User.count(),
            user_model_1.User.findAll()
        ]);
        res.json({ total, users });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error inesperado!"
        });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const users = yield user_model_1.User.findByPk(id);
    if (users) {
        res.json(users);
    }
    else {
        res.status(404).json({
            msg: "No existe el usuario : " + id
        });
    }
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors);
        }
        const salt = bcript.genSaltSync();
        let { username, email, password, state } = body;
        password = bcript.hashSync(password, salt);
        const user = yield user_model_1.User.create({ username, email, password, state });
        user.save();
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _a = req.body, { password } = _a, cleanBody = __rest(_a, ["password"]);
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json(errors);
        }
        if (password) {
            const salt = bcript.genSaltSync();
            cleanBody.password = bcript.hashSync(password, salt);
        }
        const user = yield user_model_1.User.findByPk(id);
        user === null || user === void 0 ? void 0 : user.update(cleanBody);
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_model_1.User.findByPk(id);
        yield user.update({ state: false });
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.controller.js.map