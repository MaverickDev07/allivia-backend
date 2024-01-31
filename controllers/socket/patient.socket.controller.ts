import { UserModel } from "../../models/user.model";
import * as socketio from "socket.io";
import { MedicalBackground } from "../../models/medical_background.model";


export const CreateMedicalBackgroundRequestSocket = async (payload: any, socket: socketio.Socket, user: UserModel | null) => {

    try {
        const { id_paciente } = payload;
        const medicalBackground = await MedicalBackground.create({
            genero: '',
            fecha_nacimiento: '',
            id_paciente: id_paciente,
            fuma: -1,
            alcohol: -1,
            cafeina: -1,
            ejercicio: -1,
            drogas: -1,
            testifico: false,
        });

       
        socket.emit("medical-background-created", {
            medicalBackground
        });
    } catch (error) {
        console.log(error);
        socket.emit("medical-background-created", {
            data: []
        });
    }
}