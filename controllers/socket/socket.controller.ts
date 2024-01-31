import * as socketio from "socket.io";
import { calendarListeners } from "../../events/calendar.events";
import { patientsListeners } from "../../events/patients.events";
import { waitingRoomListeners } from "../../events/waiting-room.events";
import { jwtSocketValidation } from "../../middleware/jwt.middleware";
import { UserModel } from "../../models/user.model";
import { waitingRoomRequestSocket } from "./waiting.room.socket.controller";

export  const socketController = async function(socket: socketio.Socket) {
    let user:UserModel | null;
    try {
    
        const token=socket.handshake.headers["x-token"] as string;
        user=await jwtSocketValidation(token);
        if(!user){
           socket.emit("invalid-token") 
           socket.disconnect();
        }
    } catch (error) {
        socket.emit("invalid-token") 
        socket.disconnect();
    }
   
   
    waitingRoomListeners(socket,user!);
    calendarListeners(socket,user!);
    patientsListeners(socket,user!);
}



