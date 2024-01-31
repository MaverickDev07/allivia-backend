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
exports.waitingRoomListeners = void 0;
const conclusions_background_socket_controller_1 = require("../controllers/socket/conclusions.background.socket.controller");
const medical_background_socket_controller_1 = require("../controllers/socket/medical.background.socket.controller");
const physica_test_background_socket_controller_1 = require("../controllers/socket/physica.test.background.socket.controller");
const waiting_room_socket_controller_1 = require("../controllers/socket/waiting.room.socket.controller");
const waitingRoomListeners = function (socket, user) {
    return __awaiter(this, void 0, void 0, function* () {
        socket.on('waiting-room-request', (payload) => {
            (0, waiting_room_socket_controller_1.waitingRoomRequestSocket)(payload, socket, user);
        });
        socket.on('clinic-history-request', (payload) => {
            (0, waiting_room_socket_controller_1.clinicHistoryRequestSocket)(payload, socket, user);
        });
        socket.on('medical-background-update', (payload) => {
            (0, medical_background_socket_controller_1.medicalBackgroundCLinicHistoryUpdateSocket)(payload, socket, user);
        });
        socket.on('medical-background-physical-test-update', (payload) => {
            (0, physica_test_background_socket_controller_1.physicalTestUpdateSocket)(payload, socket, user);
        });
        socket.on('conclusion-background-update', (payload) => {
            (0, conclusions_background_socket_controller_1.conclusionBackgroundSocket)(payload, socket, user);
        });
    });
};
exports.waitingRoomListeners = waitingRoomListeners;
//# sourceMappingURL=waiting-room.events.js.map