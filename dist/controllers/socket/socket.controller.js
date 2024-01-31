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
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketController = void 0;
const calendar_events_1 = require("../../events/calendar.events");
const patients_events_1 = require("../../events/patients.events");
const waiting_room_events_1 = require("../../events/waiting-room.events");
const jwt_middleware_1 = require("../../middleware/jwt.middleware");
const socketController = function (socket) {
    return __awaiter(this, void 0, void 0, function* () {
        let user;
        try {
            const token = socket.handshake.headers["x-token"];
            user = yield (0, jwt_middleware_1.jwtSocketValidation)(token);
            if (!user) {
                socket.emit("invalid-token");
                socket.disconnect();
            }
        }
        catch (error) {
            socket.emit("invalid-token");
            socket.disconnect();
        }
        (0, waiting_room_events_1.waitingRoomListeners)(socket, user);
        (0, calendar_events_1.calendarListeners)(socket, user);
        (0, patients_events_1.patientsListeners)(socket, user);
    });
};
exports.socketController = socketController;
//# sourceMappingURL=socket.controller.js.map