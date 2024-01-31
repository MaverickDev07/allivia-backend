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
exports.calendarListeners = void 0;
const calendar_socket_controller_1 = require("../controllers/socket/calendar.socket.controller");
const calendarListeners = function (socket, user) {
    return __awaiter(this, void 0, void 0, function* () {
        socket.on('calendar-request', (payload) => {
            (0, calendar_socket_controller_1.CalendarRequestSocket)(payload, socket, user);
        });
    });
};
exports.calendarListeners = calendarListeners;
//# sourceMappingURL=calendar.events.js.map