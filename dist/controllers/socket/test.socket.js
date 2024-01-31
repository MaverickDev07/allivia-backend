"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSocket = void 0;
const testSocket = (payload, socket, user) => {
    console.log(payload);
    //solo a socket conectado 
    socket.emit("waiting-room", {
        data: "respondiendo solicitud"
    });
    //emision a todos los conectados
    /*   socket.broadcast.emit("datademo",{
           data:"hola a todos"
       });*/
};
exports.testSocket = testSocket;
//# sourceMappingURL=test.socket.js.map