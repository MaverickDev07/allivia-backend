import * as socketio from "socket.io";
import { conclusionBackgroundSocket } from "../controllers/socket/conclusions.background.socket.controller";
import { medicalBackgroundCLinicHistoryUpdateSocket } from "../controllers/socket/medical.background.socket.controller";
import { physicalTestUpdateSocket } from "../controllers/socket/physica.test.background.socket.controller";
import { clinicHistoryRequestSocket, waitingRoomRequestSocket } from "../controllers/socket/waiting.room.socket.controller";
import { UserModel } from "../models/user.model";

export  const waitingRoomListeners = async function(socket: socketio.Socket,user:UserModel | null) {

    socket.on('waiting-room-request',(payload)=>{
        waitingRoomRequestSocket(payload,socket,user);
    });


    socket.on('clinic-history-request',(payload)=>{
        clinicHistoryRequestSocket(payload,socket,user);
    });


    socket.on('medical-background-update',(payload)=>{
        medicalBackgroundCLinicHistoryUpdateSocket(payload,socket,user);
    });

    socket.on('medical-background-physical-test-update',(payload)=>{
        physicalTestUpdateSocket(payload,socket,user);
    });

    socket.on('conclusion-background-update',(payload)=>{
        conclusionBackgroundSocket(payload,socket,user);
    });



}