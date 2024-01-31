import * as socketio from "socket.io";
import { CalendarRequestSocket } from "../controllers/socket/calendar.socket.controller";
import { UserModel } from "../models/user.model";

export  const calendarListeners = async function(socket: socketio.Socket,user:UserModel | null) {

    socket.on('calendar-request',(payload)=>{
        CalendarRequestSocket(payload,socket,user);
    });

}