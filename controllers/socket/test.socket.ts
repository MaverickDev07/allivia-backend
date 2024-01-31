import * as socketio from "socket.io";
import { UserModel } from "../../models/user.model";


export const testSocket =(payload: any,socket: socketio.Socket,user:UserModel | null) => {

  console.log(payload);

   //solo a socket conectado 
  socket.emit("waiting-room",{
        data:"respondiendo solicitud"
    });

    //emision a todos los conectados
 /*   socket.broadcast.emit("datademo",{
        data:"hola a todos"
    });*/

}