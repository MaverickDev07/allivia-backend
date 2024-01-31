import * as socketio from "socket.io";
import { CreateMedicalBackgroundRequestSocket } from "../controllers/socket/patient.socket.controller";
import { PatientsRequestSocket } from "../controllers/socket/patients.socket.controller";
import { UserModel } from "../models/user.model";

export  const patientsListeners = async function(socket: socketio.Socket,user:UserModel | null) {

    socket.on('patients-request',(payload)=>{
        PatientsRequestSocket(payload,socket,user);
    });

    socket.on('patient-medical-background-create-request',(payload)=>{
        CreateMedicalBackgroundRequestSocket(payload,socket,user);
    });

}